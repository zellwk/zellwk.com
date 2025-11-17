import { processFiles } from '@splendidlabz/astro/content'
import { getCollection } from 'astro:content'
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright-core'

// Cache browser and font for reuse across multiple image generations
let browserInstance = null
let fontBase64Cache = null

const CACHE_DIR = './node_modules/.cache/og-images'

function getContentHash(content) {
  return createHash('sha256').update(content).digest('hex')
}

async function getCachedImage(slug, contentHash) {
  const cachePath = join(CACHE_DIR, `${slug}.png`)
  const metaPath = join(CACHE_DIR, `${slug}.meta`)

  if (existsSync(cachePath) && existsSync(metaPath)) {
    const storedHash = await readFile(metaPath, 'utf-8')
    if (storedHash === contentHash) {
      return await readFile(cachePath)
    }
  }
  return null
}

async function cacheImage(slug, buffer, contentHash) {
  await mkdir(CACHE_DIR, { recursive: true })
  const cachePath = join(CACHE_DIR, `${slug}.png`)
  const metaPath = join(CACHE_DIR, `${slug}.meta`)
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

async function getFontBase64() {
  if (!fontBase64Cache) {
    const fontBuffer = await readFile('./public/fonts/june-expt-variable.woff2')
    fontBase64Cache = fontBuffer.toString('base64')
  }
  return fontBase64Cache
}

export async function getStaticPaths() {
  const files = await getCollection('blog')
  const posts = await processFiles(files)

  return posts.map(post => ({
    params: { slug: post.data.slug },
    props: {
      title: post.data.title,
      description: post.data.description || '',
    },
  }))
}

export async function GET({ props, params }) {
  const { slug } = params
  const { title, description } = props

  // Generate content hash for cache invalidation
  const contentHash = getContentHash(`${title}|${description}`)

  // Check cache first
  const cached = await getCachedImage(slug, contentHash)
  if (cached) {
    return new Response(cached, {
      headers: { 'Content-Type': 'image/png' },
    })
  }

  // Generate image
  const fontBase64 = await getFontBase64()

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @font-face {
            font-family: 'June Expt';
            src: url(data:font/woff2;base64,${fontBase64}) format('woff2-variations');
            font-weight: 100 900;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            width: 1200px;
            height: 630px;
            background: #0d0c11;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 100px;
          }
          h1 {
            font-family: 'June Expt', sans-serif;
            font-variation-settings: 'STYL' 60;
            font-size: 80px;
            color: #ffbf00;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
      </body>
    </html>
  `

  const browser = await getBrowser()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(html, { waitUntil: 'domcontentloaded' })

  const screenshot = await page.screenshot({ type: 'png' })
  await page.close()

  // Cache it
  await cacheImage(slug, screenshot, contentHash)

  return new Response(screenshot, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
