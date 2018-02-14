const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const base = require('./webpack.base.conf')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.bundle.env

base.entry = {
  'VueNutritionLabel': './src/vue-nutrition-label.js'
}

const webpackConfig = merge(base, {
  output: {
    path: config.bundle.assetsRoot,
    publicPath: config.bundle.assetsPublicPath,
    filename: 'vue-nutrition-label.min.js',
    library: 'VueNutritionLabel',
    libraryTarget: 'umd'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.bundle.productionSourceMap,
      extract: true
    })
  },
  devtool: config.bundle.productionSourceMap ? '#source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: 'vue-nutrition-label.min.css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    })
  ]
})

module.exports = webpackConfig
