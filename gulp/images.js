const { src, dest, series, parallel } = require('gulp')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')

const { input, output } = require('./_config')

const imageInput = `${input}/images/**/*`
const tmpOutput = './_tmp/minified'
const imageOutput = `${output}/images`

const minifyImages = _ => {
  return src(imageInput + '.{png,jpg,jpeg,jpg,gif}')
    .pipe(newer(tmpOutput))
    .pipe(imagemin([
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(dest(tmpOutput))
}

const copyImagesToDist = _ => {
  return src(tmpOutput + '/**/*')
    .pipe(dest(imageOutput))
}

const copySvgToDist = _ => {
  return src(imageInput + '.svg')
    .pipe(dest(imageOutput))
}

const copyVideosToDist = _ => {
  return src(imageInput + '.mp4')
    .pipe(dest(imageOutput))
}

const copyFaviconsToDist = _ => {
  return src(input + '/favicons/**/*')
    .pipe(dest(output + '/favicons'))
}

const images = series(
  minifyImages,
  parallel(copySvgToDist, copyFaviconsToDist, copyImagesToDist, copyVideosToDist)
)

module.exports = images
