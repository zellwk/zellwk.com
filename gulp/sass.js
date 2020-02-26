const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const gulpIf = require('gulp-if')
const gulpSass = require('gulp-sass')
const size = require('gulp-size')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')

const { isProd, input, output } = require('./_config')
const plumber = require('./_plumber')

const src = input + '/scss/**/*.{scss,sass}'
const dest = output + '/css'

const sass = cb => {
  return gulp.src(src)
    .pipe(plumber('Error Running Sass'))
    .pipe(sourcemaps.init())
    .pipe(gulpSass({ includePaths: ['./node_modules'] }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(size({ title: 'styles' }))
    .pipe(gulpIf(isProd, cssnano()))
    .pipe(gulpIf(isProd, rename(fpath => { fpath.basename += '-min' })))
    .pipe(gulp.dest(dest))
}

module.exports = sass
