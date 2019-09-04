const { src, dest, series, parallel } = require('gulp')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const newer = require('gulp-newer')
const resizer = require('@zellwk/resize-images')

const { input, output, imageSizes } = require('./_config')

const imageInput = `${input}/images/**/*`
const tmpOutput = `./_tmp/minified`
const tmpOutput2 = `./_tmp/resized`
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
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(dest(tmpOutput))
}

// const resizeImages = _ => {
//   return resizer({
//     inputDir: tmpOutput,
//     outputDir: tmpOutput2,
//     outputSizes: imageSizes
//   })
// }

const copyImagesToDist = _ => {
  return src(tmpOutput2 + `/**/*`)
    .pipe(dest(imageOutput))
}

const copySvgToDist = _ => {
  return src(imageInput + `.svg`)
    .pipe(dest(imageOutput))
}

const copyFaviconsToDist = _ => {
  return src(input + `/favicons/**/*`)
    .pipe(dest(imageOutput + '/favicons'))
}

const images = series(
  parallel(jpegToWebp, pngToWebp, minifyImages),
  // parallel(resizeImages),
  parallel(copyImagesToDist, copySvgToDist, copyFaviconsToDist)
)

exports.default = images
exports.src = imageInput
