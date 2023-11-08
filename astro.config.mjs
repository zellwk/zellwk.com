import config from './site-config.js'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  site: config.siteUrl,
  integrations: [svelte(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
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
    },
  },
  output: 'server',
  adapter: node({ mode: 'standalone' }),
})

console.log()
