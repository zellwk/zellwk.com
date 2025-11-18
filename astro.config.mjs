import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
// import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import tailwindcss from '@tailwindcss/vite'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import { URL, fileURLToPath } from 'node:url'
import twilightCosmos from 'twilight-cosmos-theme'
import redirects from './redirect.config.js'
import config from './site-config.js'

// prettier-ignore
const shikiConfig = {
  theme: twilightCosmos,
  // transformers: [transformerColorizedBrackets()],
  langs: [ 'shell', 'php', 'svelte', 'astro', 'jsx', 'vue', 'js', 'css', 'scss', 'json', 'jsonc', 'md', 'mdx'], 
}

export default defineConfig({
  site: config.site.url,
  trailingSlash: 'always',
  integrations: [expressiveCode(shikiConfig), svelte(), mdx(), sitemap()],
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
  markdown: {},
})
