import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

// Module-level cache for browser instance, fonts, and processed CSS
let browserInstance = null
const fontCache = new Map()
const processedStylesCache = new Map() // Cache for final processed styles by content hash

const DEFAULT_CACHE_DIR = './node_modules/.cache/og-images'
const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Creates an OG image from the provided options.
 *
 * @param {Object} options - Configuration options
 * @param {string} options.slug - Unique identifier for the image (used for caching)
 * @param {string} [options.cacheDir] - Directory to cache images (default: './node_modules/.cache/og-images')
 * @param {string} options.body - HTML body content for the image
 * @param {string|string[]} [options.styles] - CSS styles (file path, array of paths, or CSS string)
 * @param {Array<{name: string, path: string|string[], variable?: boolean, fontStyle?: string}>} options.fonts - Array of font configurations
 * @returns {Promise<Buffer>} PNG image buffer
 * @throws {Error} If required options are missing or invalid
 */
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

  // Load fonts and styles in parallel
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
  if (cached) {
    return cached
  }
  // Generate image
  const html = generateOGImageHTML(body, loadedFonts, stylesContent)
  const screenshot = await generateImageFromHTML(html)

  // Cache it
  await cacheImage(slug, screenshot, contentHash, cacheDir)

  return screenshot
}

/**
 * Generates a SHA-256 hash of the provided content.
 *
 * @param {string} content - Content to hash
 * @returns {string} Hexadecimal hash string
 */
function getContentHash(content) {
  return createHash('sha256').update(content).digest('hex')
}

/**
 * Retrieves a cached image if it exists and matches the content hash.
 *
 * @param {string} slug - Image slug identifier
 * @param {string} contentHash - Expected content hash
 * @param {string} cacheDir - Cache directory path
 * @returns {Promise<Buffer|null>} Cached image buffer or null if not found/invalid
 */
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

/**
 * Caches an image with its content hash for future lookups.
 *
 * @param {string} slug - Image slug identifier
 * @param {Buffer} buffer - Image buffer to cache
 * @param {string} contentHash - Content hash for validation
 * @param {string} cacheDir - Cache directory path
 * @returns {Promise<void>}
 */
async function cacheImage(slug, buffer, contentHash, cacheDir) {
  await mkdir(cacheDir, { recursive: true })
  const cachePath = join(cacheDir, `${slug}.png`)
  const metaPath = join(cacheDir, `${slug}.meta`)
  await writeFile(cachePath, buffer)
  await writeFile(metaPath, contentHash, 'utf-8')
}

/**
 * Gets or creates a browser instance (singleton pattern).
 *
 * @returns {Promise<import('playwright-core').Browser>} Browser instance
 */
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

/**
 * Resolves a font file path to an absolute path.
 * - Paths starting with `/` are resolved from project root
 * - Paths starting with `.` are resolved from current file directory
 * - Other paths are used as-is
 *
 * @param {string} path - Font file path
 * @returns {string} Absolute path to font file
 */
function resolveFontPath(path) {
  if (path.startsWith('/')) {
    return resolve(process.cwd(), path.slice(1))
  }
  if (path.startsWith('.')) {
    return resolve(__dirname, path)
  }
  return path
}

/**
 * Determines the font format based on path and variable flag.
 *
 * @param {string} path - Font file path
 * @param {boolean} [variable] - Whether the font is a variable font
 * @returns {string} Font format ('woff2-variations', 'woff2', or 'woff')
 */
function getFontFormat(path, variable) {
  if (variable === true) return 'woff2-variations'
  if (path.toLowerCase().includes('variable')) return 'woff2-variations'
  if (path.endsWith('.woff2')) return 'woff2'
  if (path.endsWith('.woff')) return 'woff'
  return 'woff2'
}

/**
 * Loads a font file and converts it to base64 for embedding.
 *
 * @param {Object} font - Font configuration
 * @param {string} font.name - Font family name
 * @param {string|string[]} font.path - Font file path(s)
 * @param {boolean} [font.variable] - Whether the font is a variable font
 * @param {string} [font.fontStyle] - Font style ('normal' or 'italic'). Auto-detected from filename if not provided.
 * @returns {Promise<{name: string, fontStyle: string, fonts: Array<{format: string, base64: string}>}>} Loaded font data
 * @throws {Error} If no font files are found
 */
async function loadFont(font) {
  const { name, path, variable, fontStyle } = font
  const paths = Array.isArray(path) ? path : [path]

  const availableFonts = []
  const attemptedPaths = []

  // Auto-detect italic from filename if fontStyle not explicitly provided
  const detectItalic = fontPath => {
    if (fontStyle) {
      return fontStyle === 'italic'
    }
    // Check if filename contains 'italic' or 'it' (case-insensitive)
    const lowerPath = fontPath.toLowerCase()
    return lowerPath.includes('italic') || lowerPath.includes('-it.')
  }

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
        fontStyle: detectItalic(fontPath) ? 'italic' : 'normal',
      })
    }
  }

  if (availableFonts.length === 0) {
    throw new Error(
      `No font files found for ${name}. Attempted paths: ${attemptedPaths.join(', ')}`,
    )
  }

  // Determine overall font style (use italic if any font is italic)
  const overallFontStyle = availableFonts.some(f => f.fontStyle === 'italic')
    ? 'italic'
    : 'normal'

  return { name, fontStyle: overallFontStyle, fonts: availableFonts }
}

/**
 * Resolves a style file path to an absolute path.
 * - Paths starting with `/` are resolved from project root
 * - Paths starting with `.` are resolved from current file directory
 * - Other paths are used as-is
 *
 * @param {string} path - Style file path
 * @returns {string} Absolute path to style file
 */
function resolveStylePath(path) {
  if (path.startsWith('/')) {
    return resolve(process.cwd(), path.slice(1))
  }
  if (path.startsWith('.')) {
    return resolve(__dirname, path)
  }
  return path
}

/**
 * Removes @import statements from CSS (not supported - use local fonts instead).
 *
 * @param {string} css - CSS content with potential @import statements
 * @returns {string} CSS with @import statements removed
 */
function processImports(css) {
  // Remove @import statements - they're not supported, use local fonts instead
  if (!css.includes('@import')) {
    return css
  }

  const importRegex = /@import\s+(?:url\()?['"]?([^'")]+)['"]?\)?[^;]*;/g
  return css.replace(importRegex, '')
}

/**
 * Loads and processes CSS styles from various sources.
 * Supports file paths (single or array), CSS strings, and removes @import statements.
 * Uses in-memory cache to avoid reprocessing the same styles across multiple image generations.
 *
 * @param {string|string[]} [styles] - CSS file path(s) or CSS string
 * @returns {Promise<string>} Processed CSS content
 */
async function loadStyles(styles) {
  if (!styles) return ''

  // Check in-memory cache first (hash the input to create cache key)
  // For string inputs, use the string directly; for arrays, stringify
  const stylesKey = typeof styles === 'string' ? styles : JSON.stringify(styles)
  const stylesHash = getContentHash(stylesKey)

  // Fast path: return cached result immediately
  if (processedStylesCache.has(stylesHash)) {
    return processedStylesCache.get(stylesHash)
  }

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
        // Treat as CSS content if file doesn't exist
        css = styles
      }
    } else {
      // Treat as CSS content (this is the case for ?raw imports)
      css = styles
    }
  }

  // Remove @import statements (not supported - use local fonts instead)
  css = processImports(css)

  // Cache the final processed result for next time
  processedStylesCache.set(stylesHash, css)

  return css
}

/**
 * Generates @font-face CSS declarations from loaded fonts.
 *
 * @param {Array<{name: string, fontStyle: string, fonts: Array<{format: string, base64: string, fontStyle?: string}>}>} loadedFonts - Array of loaded font data
 * @returns {string} CSS @font-face declarations
 */
function generateFontFaces(loadedFonts) {
  return loadedFonts
    .map(({ name, fontStyle, fonts }) => {
      const src = fonts
        .map(({ format, base64 }) => {
          const mimeType = format.includes('woff2') ? 'font/woff2' : 'font/woff'
          const isVariableFormat =
            format.includes('variations') || format.includes('woff2-variations')
          const formatString = isVariableFormat ? 'woff2-variations' : format
          return `url(data:${mimeType};base64,${base64}) format('${formatString}')`
        })
        .join(', ')

      const isVariable = fonts.some(
        f =>
          f.format.includes('variations') ||
          f.format.includes('woff2-variations'),
      )
      const fontWeight = isVariable ? 'font-weight: 100 900;' : ''
      const fontStyleRule = fontStyle === 'italic' ? 'font-style: italic;' : ''

      return `@font-face {
            font-family: ${name};
            src: ${src};
            ${fontWeight}
            ${fontStyleRule}
          }`
    })
    .join('\n          ')
}

/**
 * Generates the complete HTML document for OG image generation.
 *
 * @param {string} body - HTML body content
 * @param {Array<{name: string, fonts: Array<{format: string, base64: string}>}>} loadedFonts - Array of loaded font data
 * @param {string} styles - CSS styles content
 * @returns {string} Complete HTML document
 */
function generateOGImageHTML(body, loadedFonts, styles) {
  const fontFaces = generateFontFaces(loadedFonts)

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

/**
 * Generates a PNG screenshot from HTML content using Playwright.
 *
 * @param {string} html - HTML content to render
 * @returns {Promise<Buffer>} PNG image buffer
 */
async function generateImageFromHTML(html) {
  const browser = await getBrowser()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(html, { waitUntil: 'domcontentloaded' })

  // Wait for fonts to load (fonts are embedded as data URIs, so this should be fast)
  await page.evaluate(() => document.fonts.ready)

  const screenshot = await page.screenshot({ type: 'png' })
  await page.close()

  return screenshot
}
