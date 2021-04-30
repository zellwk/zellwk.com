const { src, dest } = require('gulp')

function copyFonts () {
  return src('src/fonts/**/*').pipe(dest('dist/fonts'))
}

module.exports = copyFonts
