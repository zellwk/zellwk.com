import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
// import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { URL, fileURLToPath } from 'node:url'
import twilightCosmos from 'twilight-cosmos-theme'
import redirects from './redirect.config.js'
import config from './site-config.js'

// https://astro.build/config
export default defineConfig({
  site: config.siteUrl,
  integrations: [svelte(), mdx(), sitemap()],
  redirects,
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  adapter: node({ mode: 'server' }),
  markdown: {
    shikiConfig: {
      theme: twilightCosmos,
      langs: [
        'shell',
        'php',
        'svelte',
        'astro',
        'jsx',
        'vue',
        'js',
        'css',
        'scss',
        'json',
        'jsonc',
        'md',
        'mdx',
      ],
      // transformers: [transformerColorizedBrackets()],
    },
  },
})
