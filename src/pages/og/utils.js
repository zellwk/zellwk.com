import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

// Cache browser and font for reuse across multiple image generations
let browserInstance = null
const fontCache = new Map()

const DEFAULT_CACHE_DIR = './node_modules/.cache/og-images'
const FONTS_CACHE_DIR = join(DEFAULT_CACHE_DIR, 'fonts')
const __dirname = dirname(fileURLToPath(import.meta.url))

export async function createOGImage(options) {
  const {
    slug,
    cacheDir = DEFAULT_CACHE_DIR,
    body,
    styles = '',
    fonts,
  } = options

  if (!slug) throw new Error('slug is required')
  if (!body) throw new Error('body is required')
  if (!fonts || !Array.isArray(fonts) || fonts.length === 0) {
    throw new Error('fonts must be a non-empty array')
  }

  // Validate each fonts entry
  for (const font of fonts) {
    if (!font.name || !font.path) {
      throw new Error('Each fonts entry must have name and path')
    }
  }

  // Load fonts and styles
  const [loadedFonts, stylesContent] = await Promise.all([
    Promise.all(fonts.map(font => loadFont(font))),
    loadStyles(styles),
  ])

  // Generate content hash for cache invalidation
  const fontPaths = fonts
    .map(f => (Array.isArray(f.path) ? f.path.join('|') : f.path))
    .join('|')
  const contentHash = getContentHash(`${body}|${stylesContent}|${fontPaths}`)

  // Check cache first
  const cached = await getCachedImage(slug, contentHash, cacheDir)
  if (cached) return cached

  // Generate image
  const html = generateOGImageHTML(body, loadedFonts, stylesContent)
  const screenshot = await generateImageFromHTML(html)

  // Cache it
  await cacheImage(slug, screenshot, contentHash, cacheDir)

  return screenshot
}

function getContentHash(content) {
  return createHash('sha256').update(content).digest('hex')
}

async function getCachedImage(slug, contentHash, cacheDir) {
  const cachePath = join(cacheDir, `${slug}.png`)
  const metaPath = join(cacheDir, `${slug}.meta`)

  if (existsSync(cachePath) && existsSync(metaPath)) {
    const storedHash = await readFile(metaPath, 'utf-8')
    if (storedHash === contentHash) {
      return await readFile(cachePath)
    }
  }
  return null
}

async function cacheImage(slug, buffer, contentHash, cacheDir) {
  await mkdir(cacheDir, { recursive: true })
  const cachePath = join(cacheDir, `${slug}.png`)
  const metaPath = join(cacheDir, `${slug}.meta`)
  await writeFile(cachePath, buffer)
  await writeFile(metaPath, contentHash, 'utf-8')
}

async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await chromium.launch({
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
      ],
    })
  }
  return browserInstance
}

function resolveFontPath(path) {
  // Absolute path (starts with /) - resolve from project root
  if (path.startsWith('/')) {
    // Strip leading / to make it relative to project root
    return resolve(process.cwd(), path.slice(1))
  }
  // Relative path (starts with .) - resolve from current file directory
  if (path.startsWith('.')) {
    return resolve(__dirname, path)
  }
  // Otherwise use as-is (assumed to be absolute or already resolved)
  return path
}

function getFontFormat(path, variable) {
  if (variable === true) return 'woff2-variations'
  if (path.toLowerCase().includes('variable')) return 'woff2-variations'
  if (path.endsWith('.woff2')) return 'woff2'
  if (path.endsWith('.woff')) return 'woff'
  return 'woff2' // default
}

async function loadFont(font) {
  const { name, path, variable } = font
  const paths = Array.isArray(path) ? path : [path]

  // Load local font files
  const availableFonts = []
  const attemptedPaths = []
  for (const fontPath of paths) {
    const resolvedPath = resolveFontPath(fontPath)
    attemptedPaths.push(resolvedPath)
    if (existsSync(resolvedPath)) {
      const format = getFontFormat(fontPath, variable)
      const cacheKey = `${resolvedPath}|${format}`

      if (!fontCache.has(cacheKey)) {
        const fontBuffer = await readFile(resolvedPath)
        fontCache.set(cacheKey, fontBuffer.toString('base64'))
      }

      availableFonts.push({
        format,
        base64: fontCache.get(cacheKey),
      })
    }
  }

  if (availableFonts.length === 0) {
    throw new Error(
      `No font files found for ${name}. Attempted paths: ${attemptedPaths.join(', ')}`,
    )
  }

  return { name, fonts: availableFonts }
}

function resolveStylePath(path) {
  // Absolute path (starts with /) - resolve from project root
  if (path.startsWith('/')) {
    // Strip leading / to make it relative to project root
    return resolve(process.cwd(), path.slice(1))
  }
  // Relative path (starts with .) - resolve from current file directory
  if (path.startsWith('.')) {
    return resolve(__dirname, path)
  }
  // Otherwise use as-is (assumed to be absolute or already resolved)
  return path
}

async function processImports(css) {
  // Find all @import statements
  const importRegex = /@import\s+(?:url\()?['"]?([^'")]+)['"]?\)?[^;]*;/g
  const imports = []
  let match

  while ((match = importRegex.exec(css)) !== null) {
    const url = match[1].trim()
    if (url.startsWith('http')) {
      imports.push({ url, fullMatch: match[0] })
    }
  }

  // Process each @import
  for (const { url, fullMatch } of imports) {
    // Create cache key from URL
    const urlHash = getContentHash(url)
    const cacheFile = join(FONTS_CACHE_DIR, `${urlHash}.css`)

    // Check if already cached and processed
    let importedCss
    let needsProcessing = true
    if (existsSync(cacheFile)) {
      importedCss = await readFile(cacheFile, 'utf-8')
      // Check if cached CSS already has data URIs (already processed)
      if (importedCss.includes('data:font/')) {
        needsProcessing = false
      }
    }

    if (needsProcessing) {
      // Fetch from URL if we don't have CSS yet
      if (!importedCss) {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(
            `Failed to fetch CSS from ${url}: ${response.statusText}`,
          )
        }
        importedCss = await response.text()
      }

      // Parse CSS to find font URLs and download them
      const fontUrlRegex = /url\(['"]?([^'")]+)['"]?\)/g
      const fontUrls = []
      let fontMatch
      while ((fontMatch = fontUrlRegex.exec(importedCss)) !== null) {
        const fontUrl = fontMatch[1].trim()
        // Only process http/https URLs (skip data URIs)
        if (fontUrl.startsWith('http')) {
          fontUrls.push(fontUrl)
        }
      }

      // Download and cache font files
      await mkdir(FONTS_CACHE_DIR, { recursive: true })
      for (const fontUrl of fontUrls) {
        const fontUrlHash = getContentHash(fontUrl)
        const fontCacheFile = join(FONTS_CACHE_DIR, fontUrlHash)
        const fontExt = fontUrl.match(/\.(woff2|woff|ttf|otf)/)?.[1] || 'woff2'
        const fontCachePath = `${fontCacheFile}.${fontExt}`

        if (!existsSync(fontCachePath)) {
          const fontResponse = await fetch(fontUrl)
          if (fontResponse.ok) {
            const fontBuffer = await fontResponse.arrayBuffer()
            await writeFile(fontCachePath, Buffer.from(fontBuffer))
          }
        }

        // Replace URL with data URI for embedding
        if (existsSync(fontCachePath)) {
          const fontBuffer = await readFile(fontCachePath)
          const fontBase64 = fontBuffer.toString('base64')
          const mimeType =
            fontExt === 'woff2'
              ? 'font/woff2'
              : fontExt === 'woff'
                ? 'font/woff'
                : fontExt === 'ttf'
                  ? 'font/truetype'
                  : 'font/opentype'
          const dataUri = `data:${mimeType};base64,${fontBase64}`
          // Replace all occurrences of this URL (may appear quoted or unquoted)
          const escapedUrl = fontUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          importedCss = importedCss.replace(
            new RegExp(`url\\(['"]?${escapedUrl}['"]?\\)`, 'g'),
            `url(${dataUri})`,
          )
        }
      }

      // Cache the processed CSS
      await writeFile(cacheFile, importedCss, 'utf-8')
    }

    // Replace @import with the processed CSS
    css = css.replace(fullMatch, importedCss)
  }

  return css
}

async function loadStyles(styles) {
  if (!styles) return ''
  let css = ''

  if (Array.isArray(styles)) {
    const stylePromises = styles.map(path => {
      const resolvedPath = resolveStylePath(path)
      return readFile(resolvedPath, 'utf-8')
    })
    const styleContents = await Promise.all(stylePromises)
    css = styleContents.join('\n')
  } else if (typeof styles === 'string') {
    // Check if it's a file path (ends with .css and file exists)
    if (styles.endsWith('.css')) {
      const resolvedPath = resolveStylePath(styles)
      if (existsSync(resolvedPath)) {
        css = await readFile(resolvedPath, 'utf-8')
      } else {
        css = styles // Treat as CSS content if file doesn't exist
      }
    } else {
      // Otherwise treat as CSS content
      css = styles
    }
  }

  // Process @import statements
  css = await processImports(css)

  return css
}

function generateOGImageHTML(body, loadedFonts, styles) {
  const fontFaces = loadedFonts
    .map(({ name, fonts }) => {
      const src = fonts
        .map(({ format, base64 }) => {
          const mimeType = format.includes('woff2') ? 'font/woff2' : 'font/woff'
          // Check if format indicates variable font
          const isVariableFormat =
            format.includes('variations') || format.includes('woff2-variations')
          const formatString = isVariableFormat ? 'woff2-variations' : format
          return `url(data:${mimeType};base64,${base64}) format('${formatString}')`
        })
        .join(', ')

      // Check if any font is variable (has variations format)
      const isVariable = fonts.some(
        f =>
          f.format.includes('variations') ||
          f.format.includes('woff2-variations'),
      )
      // For variable fonts, add font-weight range
      // Also check if URL indicates variable font (for Google Fonts)
      const fontWeight = isVariable ? 'font-weight: 100 900;' : ''

      return `@font-face {
            font-family: ${name};
            src: ${src};
            ${fontWeight}
          }`
    })
    .join('\n          ')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${fontFaces}
          ${styles}
        </style>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `
}

async function generateImageFromHTML(html) {
  const browser = await getBrowser()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(html, { waitUntil: 'domcontentloaded' })

  // Wait for fonts to load (handles both local and external fonts)
  await page.evaluate(() => document.fonts.ready)

  // Additional wait for network requests to complete (for external fonts)
  await page.waitForLoadState('networkidle')

  const screenshot = await page.screenshot({ type: 'png' })
  await page.close()

  return screenshot
}
