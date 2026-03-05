import { assetWatcher, copyAssets } from './gulp/optimize-assets.js'

export async function dev() {
  await copyAssets()
  assetWatcher()
}

export async function build() {
  await copyAssets()
}
