const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const entry = require('./webpack.entry.js')
const rootFolder = path.resolve(__dirname, '../../')
const { configureBabelLoader } = require('./utils')

// TODO: Look at SplitChunks plugin (https://webpack.js.org/plugins/split-chunks-plugin/#splitchunks-chunks) again to determine how to split common chunks.
const productionCommon = merge(common, {
  entry,
  optimization: { minimize: true },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  output: {
    path: path.resolve(rootFolder, 'dist/js')
  }
})

const legacyConfig = merge(productionCommon, {
  module: { rules: [configureBabelLoader('legacy')] },
  output: {
    filename: '[name]-legacy-min.js'
  }
})

// Webpack doesn't minify .mjs extension.
// Using .js extension even though modules should use .mjs. This is ok
// https://developers.google.com/web/fundamentals/primers/modules#mjs
const modernConfig = merge(productionCommon, {
  module: { rules: [configureBabelLoader('modern')] },
  output: {
    filename: '[name]-modern-min.js'
  }
})

module.exports = {
  legacyConfig,
  modernConfig
}
