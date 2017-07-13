'use strict'

var webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HappyPack = require('happypack')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const commonConfig = require('./webpack.base.js')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(commonConfig, {
  //devtool: 'cheap-module-source-map',
  
  devServer: {
    stats: 'errors-only',
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost',
      'Access-Control-Allow-Credentials': 'true'
    },
    port: 9527,
    // hot: true // 需要的时候请手动开启， 包括下面的 Plugin
  },
  
  entry: {
    //index: './src/index.html',
    bundle: './src/entry.js'
    //vendor: ['vue', 'vue-route'],
  },
  output: {
    // path: path.resolve(__dirname, '../dist'),
    path: path.join(process.cwd(), 'dist'),
    //filename: 'bundle.js',
    filename: '[name].[chunkhash].js',
    //filename: 'bundle.js',
    //chunkFilename: '[name].chunk.js',
  },
  module: {
    // loaders
    rules: [
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
    ]
  },

  watchOptions: {
    aggregateTimeout: 300
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by vya'),// top content
    new webpack.NoEmitOnErrorsPlugin(), //no error

    // // home page
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
})