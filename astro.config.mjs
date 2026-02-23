import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
// import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import tailwindcss from '@tailwindcss/vite'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import fs from 'node:fs'
import path from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import twilightCosmos from 'twilight-cosmos-theme'
import redirects from './redirect.config.js'
import config from './site-config.js'

// Build blog slug → lastmod date map for sitemap
// (Slug can be simplified such that they're moved off each blog post and placed as the name of the file instead).
function getBlogDateMap() {
  const blogDir = './src/content/blog'
  const files = fs
    .readdirSync(blogDir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  const dateMap = new Map()

  for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8')
    const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)?.[1]
    if (!frontmatter) continue

    const slugMatch = frontmatter.match(/^slug:\s*(.+)$/m)
    const slug = slugMatch
      ? slugMatch[1].trim().replace(/^['"]|['"]$/g, '')
      : file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '')

    const updateDateMatch = frontmatter.match(/^updateDate:\s*(.+)$/m)
    const pubDateMatch = frontmatter.match(/^pubDate:\s*(.+)$/m)
    const fileDate = file.match(/^(\d{4}-\d{2}-\d{2})/)?.[1]

    const dateStr =
      updateDateMatch?.[1]?.trim() || pubDateMatch?.[1]?.trim() || fileDate
    if (dateStr) {
      dateMap.set(slug, new Date(dateStr))
    }
  }

  return dateMap
}

const blogDateMap = getBlogDateMap()

// prettier-ignore
const shikiConfig = {
  theme: twilightCosmos,
  // transformers: [transformerColorizedBrackets()],
  langs: [ 'shell', 'php', 'svelte', 'astro', 'jsx', 'vue', 'js', 'css', 'scss', 'json', 'jsonc', 'md', 'mdx', 'vue'], 
}

export default defineConfig({
  site: config.site.url,
  trailingSlash: 'always',
  integrations: [
    expressiveCode(shikiConfig),
    svelte(),
    mdx(),
    sitemap({
      serialize(item) {
        const blogMatch = item.url.match(/\/blog\/([^/]+)\/$/)
        if (blogMatch) {
          const date = blogDateMap.get(blogMatch[1])
          if (date) item.lastmod = date
        }
        return item
      },
    }),
  ],
  redirects,
  vite: {
    // css: { devSourcemap: true },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      allowedHosts: ['skylark-kind-dragon.ngrok-free.app', 'zellwk.com'],
    },
  },
  adapter: node({ mode: 'middleware' }),
})
