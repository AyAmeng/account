'use strict'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HappyPack = require('happypack')
const CommonConfig = require('./webpack.base.js')

module.exports = webpackMerge(CommonConfig ,{
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.styl', '.css'],
    modules: [path.resolve('./node_modules')],
    alias: {
      'src': path.resolve('../src'),
    }
  },
  
  entry: {
    main: './src/index.js'
    //vendor: ['vue', 'vue-route'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    //publicPath: '/dist/', //用于生产的
    //filename: 'bundle.js',
    filename: './static/[name].[chunkhash].js',
    //filename: 'bundle.js',
    //chunkFilename: '[name].chunk.js',
  },
  module: {
    // loaders
    rules: [
      {
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize'
        }) 
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
        exclude: /src\/index.html/
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by vya'),

    new ExtractTextPlugin({
      filename: './static/[name].[chunkhash].css',
      allChunks: true
    }),
    // 打包指定的html文件到指定文件夹  new HtmlWebpackPlugin({filename: pathString , template: pathString, hash: boolean, minify: {}})
    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: './src/index.html',
      hash: true,
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeAttributeQuotes: true
      // }
    }),
  ]
})