const { input } = require('./_config')
const { watch, series } = require('gulp')
const { reload } = require('./browser-sync')

const sass = require('./sass')
const images = require('./images')
// const { src: jsSrc } = require('./scripts')
const eleventy = require('./eleventy')

const watcher = cb => {
  watch(`${input}/scss/**/*`, series(sass, reload), cb)
  watch(`${input}/images/**/*`, series(images, reload), cb)

  // Eleventy files
  watch([
    'eleventy.js',
    'eleventy/**/*',
    'src/**/*',
    '!src/scss/**/*',
    '!src/js/**/*'
  ], series(eleventy, reload), cb)
}

module.exports = watcher
