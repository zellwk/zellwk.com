const { isProd, input, output } = require('./_config')
const { src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')

const cssnano = require('gulp-cssnano')
const gulpIf = require('gulp-if')
const rename = require('gulp-rename')

module.exports = function css (cb) {
  return src(input + '/scss/**/*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ['./node_modules']
      }).on('error', sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulpIf(isProd, cssnano()))
    .pipe(
      gulpIf(
        isProd,
        rename(fpath => {
          fpath.basename += '-min'
        })
      )
    )
    .pipe(dest(output + '/css'))
}
