import commonjsExternals from 'vite-plugin-commonjs-externals'
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
  vite: {
    plugins: commonjsExternals.default({
      externals: [
        'node:fs',
        'node:util',
        'node:buffer',
        'node:stream',
        'node:net',
        'node:url',
        'node:path',
      ],
    }),
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
})
