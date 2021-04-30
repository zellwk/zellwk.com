const config = require('./_config')
const del = require('del')

module.exports = function clean (cb) {
  return del([
    config.output + '/**/*',
    config.input + '/_data/rev.json'
  ])
}
