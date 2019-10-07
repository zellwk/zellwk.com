const browserSync = require('browser-sync')
const server = browserSync.create()

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack/webpack.dev')
const compiler = webpack(webpackConfig)
const devMiddlewareOptions = {
  logLevel: 'warn',
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}

const reload = done => {
  server.reload()
  done()
}

const serve = done => {
  server.init({
    open: false,
    // For builds without a server, use { server: ./dist }
    proxy: {
      target: 'localhost:5555',
      middleware: [
        // Hot module reloading notes:
        // 1. No HMR because setup is complicated without hot-loader for a frameworks
        // https://webpack.js.org/guides/hot-module-replacement/#gotchas
        //
        // 2. To make HMR work with Gulp and browsersync:
        //   1. Add webpackHotMiddleware as second middleware
        //      Example: https://css-tricks.com/combine-webpack-gulp-4/#article-header-id-9
        //   2. Add 'webpack/hot/dev-server' and 'webpack-hot-middleware/client' as entries to webpack.dev config
        webpackDevMiddleware(compiler, devMiddlewareOptions)
      ]
    }
  })
  done()
}

exports.reload = reload
exports.serve = serve
