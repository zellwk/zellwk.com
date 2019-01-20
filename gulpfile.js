require('dotenv').config({ path: 'secrets/variables.env' })
const { series, parallel } = require('gulp')
const clean = require('./gulp/clean')
const eleventy = require('./gulp/eleventy')
const watch = require('./gulp/watch')
const rev = require('./gulp/rev')
const { serve } = require('./gulp/browser-sync')
const { default: sass } = require('./gulp/sass')
const { default: scripts } = require('./gulp/scripts')
const { default: images } = require('./gulp/images')
const { syncSecrets, syncFiles } = require('./gulp/sync')

exports.sass = sass
exports.eleventy = eleventy
exports.clean = clean
exports.rev = rev
exports.serve = serve
exports.scripts = scripts
exports.images = images

exports.default = series(
  clean,
  parallel(sass, eleventy, images),
  parallel(serve, watch)
)

exports.build = series(
  clean,
  parallel(sass, images, scripts),
  rev,
  eleventy
)

exports.deploy = parallel(syncSecrets, syncFiles)
exports.deployCI = series(syncFiles)
exports.deploySecrets = series(syncSecrets)
