import optimizeAssets, { assetWatcher } from './gulp/optimize-assets.js'

import gulp from 'gulp'

const { series, parallel } = gulp

export function watch() {
  assetWatcher()
}

export const dev = series(parallel(optimizeAssets), watch)
export const build = parallel(optimizeAssets)
