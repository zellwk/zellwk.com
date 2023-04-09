import gulp from 'gulp'
import zipSourceCode, { zipSourceCodeWatcher } from './gulp/zip-source-code.js'
import optimizeAssets, { assetWatcher } from './gulp/optimize-assets.js'

const { series, parallel } = gulp

export function watch () {
  zipSourceCodeWatcher()
  assetWatcher()
}

export const zip = zipSourceCode
export const dev = series(parallel(optimizeAssets, zipSourceCode), watch)
export const build = parallel(optimizeAssets, zipSourceCode)
