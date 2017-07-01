var webpack = require('webpack')
const os = require('os')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HappyPack = require('happypack')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')

const paths = require('./paths')

const NODE_ENV = process.env.NODE_ENV
const DEBUG = NODE_ENV === 'development'
const DISTRIBUTION = process.env.DISTRIBUTION
const PLATFORM = process.env.PLATFORM
const CONFIGURATION = process.env.CONFIG

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
module.exports = {
  entry: './src/entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by vya')
  ]
}