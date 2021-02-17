const { src, dest, series, parallel } = require('gulp')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')

const { output } = require('./_config')

const assetInput = './assets/images/**/*'

function minifyImages () {
  const tmp = './_tmp/images'
  return src(assetInput + '.{png,jpg,jpeg,jpg,gif}')
    .pipe(changed(tmp, { hasChanged: changed.compareContents }))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 90, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ], { verbose: true }))
    .pipe(dest(tmp))
    // Copies back into asset folder so we don't have to optimize it anymore
    .pipe(dest('./assets/images'))
}

// Handles various images
function copyToDist () {
  // Copies SVG
  const SVGPromise = src(assetInput + '.svg')
    .pipe(dest(output + '/images'))

  // Copies Videos
  const videoPromise = src(assetInput + '.mp4')
    .pipe(dest(output + '/images'))

  // Copies Favicons
  const faviconPromise = src('./assets/favicons/**/*')
    .pipe(dest(output + '/favicons'))

  // Minified Images
  const imagePromise = src(assetInput + '/**/*')
    .pipe(dest(output + '/images'))

  return Promise.all([
    SVGPromise,
    videoPromise,
    faviconPromise,
    imagePromise
  ])
}

module.exports = series(minifyImages, copyToDist)
