const { parallel } = require('gulp')
const webpack = require('webpack')
const { input, jsDir } = require('./_config')
const { legacyConfig, modernConfig } = require('./webpack/webpack.prod.js')

const webpackPromise = (webpackConfig) => {
  return new Promise(resolve => webpack(webpackConfig, (err, stats) => {
    if (err) console.log('Webpack', err)
    console.log(stats.toString({
      colors: true,
      chunks: false
    }))
    resolve()
  }))
}

// Webpack compilation for production.
// For development, look at browser-sync.js
const compileLegacy = _ => webpackPromise(legacyConfig)
const compileModern = _ => webpackPromise(modernConfig)

const scripts = parallel(compileModern, compileLegacy)

module.exports = {
  src: input + jsDir + '/**/*.js',
  default: scripts
}
