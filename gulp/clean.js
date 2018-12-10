const config = require('./_config')
const del = require('del')

const clean = (cb) => {
  return del([
    config.output + '/**/*',
    config.input + '/_data/rev.json'
  ])
}

module.exports = clean
