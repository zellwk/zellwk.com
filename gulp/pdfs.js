const { src, dest } = require('gulp')
const config = require('./_config')

const copyPDFs = _ => {
  return src(config.input + '/pdf/**/*')
    .pipe(dest(config.output + '/pdf/'))
}

module.exports = copyPDFs
