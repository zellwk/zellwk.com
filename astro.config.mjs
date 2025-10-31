import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'
import redirects from './redirect.config.js'
import config from './site-config.js'

import tailwindcss from '@tailwindcss/vite'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  site: config.siteUrl,
  integrations: [svelte(), mdx(), sitemap()],
  redirects,

  vite: {
    plugins: [tailwindcss()],
  },
  adapter: node({ mode: 'server'}),
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

})