import { glob } from 'glob'
import gulp from 'gulp'
import fsp from 'node:fs/promises'
import path from 'node:path'

const { watch } = gulp

const paths = {
  input: 'src/assets',
  output: 'public/assets',
}

export async function copyAssets() {
  await Promise.all([copyVideos(), copySVGs()])
}

export function assetWatcher() {
  watch(paths.input + '/**/*', copyAssets)
}

// Copy videos to the public folder so Astro build can copy it to dist.
async function copyVideos() {
  const files = await glob(paths.input + '/**/*.{avi,webm,mp4,wmv,mov}')
  await Promise.all(files.map(f => copyFile(f)))
}

async function copySVGs() {
  const files = await glob(paths.input + '/**/*.svg')
  await Promise.all(files.map(f => copyFile(f)))
}

async function copyFile(from) {
  const to = from.replace(paths.input, paths.output)
  const dir = path.dirname(to)
  await fsp.mkdir(dir, { recursive: true })
  await fsp.copyFile(from, to)
}
