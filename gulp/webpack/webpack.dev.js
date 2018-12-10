const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const entry = require('./webpack.entry.js')
const { configureBabelLoader } = require('./utils')

const config = merge(common, {
  entry,
  mode: 'development',
  module: { rules: [configureBabelLoader('modern')] },
  // Can't use cheap-eval-source-map until webpack bug is solved:
  // https://github.com/webpack/webpack-dev-server/issues/1090
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
})

module.exports = config
