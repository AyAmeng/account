'use strict'

const webpack = require('webpack')
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
  module: {
    // loaders
    rules: [
      {
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({ fallback:  'style-loader', use: 'css-loader'})
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
        // 去除样板文件
        exclude: /src\/index.html/
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
          {
            loader: 'css-loader',
            query: 'sourceMap=true'
          },
          {
            loader: 'postcss-loader',
            query: 'sourceMap=true'
          },
          {
            loader: 'stylus-loader',
            query: 'sourceMap=true'
          }
          ]})
      },
    ]
  },

  watchOptions: {
    aggregateTimeout: 300
  },

  plugins: [
    //new webpack.BannerPlugin('This file is created by vya'),// top content
    new webpack.NoEmitOnErrorsPlugin(), //no error
    // home page
    new HtmlWebpackPlugin({
      template: './src/index.html'
      //title: 'Account'
    }),

    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),
  ]
})