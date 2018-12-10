const { src, dest, series, parallel } = require('gulp')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const newer = require('gulp-newer')
const reiz = require('./_reiz')

const { input, output, imageSizes } = require('./_config')
const imageInput = `${input}/images/**/*`
const tmpOutput = `./_tmp/images`
const imageOutput = `${output}/images`

const jpegToWebp = _ => {
  return src(imageInput + `.{jpg,jpeg}`)
    .pipe(newer({ dest: tmpOutput, ext: '.webp' }))
    // Lower quality because webp size can grow larger than its source
    // Reasons: https://developers.google.com/speed/webp/faq
    .pipe(webp({ quality: 80 }))
    .pipe(dest(tmpOutput))
}

const pngToWebp = _ => {
  return src(imageInput + `.png`)
    .pipe(newer({ dest: tmpOutput, ext: '.webp' }))
    .pipe(webp({ lossless: true }))
    .pipe(dest(tmpOutput))
}

const minifyImages = _ => {
  return src(imageInput + `.{png,jpg,jpeg,gif}`)
    .pipe(newer(tmpOutput))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(dest(tmpOutput))
}

const copySvg = _ => {
  return src(imageInput + `.svg`)
    .pipe(dest(imageOutput))
}

const copyFavicons = _ => {
  return src(input + `/favicons/**/*`)
    .pipe(dest(imageOutput + '/favicons'))
}

const resizeImages = _ => {
  return reiz({
    inputDir: tmpOutput,
    outputDir: imageOutput,
    sizes: imageSizes
  })
}

const copyMinifiedImages = _ => {
  return src(tmpOutput + `/**/*`)
    .pipe(dest(imageOutput))
}

const images = series(
  parallel(jpegToWebp, pngToWebp, minifyImages),
  parallel(resizeImages, copyMinifiedImages, copySvg, copyFavicons)
)

exports.default = images
exports.src = imageInput
