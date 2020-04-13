require('dotenv').config({ path: 'secrets/variables.env' })
const { series, parallel } = require('gulp')
const clean = require('./gulp/clean')
const eleventy = require('./gulp/eleventy')
const sass = require('./gulp/sass')
const { jsDevelopment, jsProduction } = require('./gulp/rollup')
const images = require('./gulp/images')
const pdfs = require('./gulp/pdfs')
const watch = require('./gulp/watch')
const { browserSync } = require('./gulp/browser-sync')
const { syncSecrets, syncFiles } = require('./gulp/sync')
const rev = require('./gulp/rev')

exports.clean = clean
exports.eleventy = eleventy
exports.sass = sass
exports.jsdev = jsDevelopment
exports.jsprod = jsProduction
exports.images = images
exports.pdfs = pdfs
exports.serve = browserSync
exports.rev = rev

exports.default = series(
  clean,
  parallel(sass, eleventy, images),
  parallel(jsDevelopment, browserSync, watch)
)

exports.build = series(
  clean,
  parallel(sass, images, jsProduction, pdfs),
  rev,
  eleventy,
  pdfs
)

exports.deploy = parallel(syncSecrets, syncFiles)
exports.deployCI = series(syncFiles)
exports.deploySecrets = series(syncSecrets)
