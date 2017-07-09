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

console.info(__dirname)
module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.styl', '.css'],
    modules: [path.resolve('./node_modules')],
    alias: {
      'src': path.resolve('../src'),
    }
  },
  
  entry: {
    //index: './src/index.html',
    bundle: './src/entry.js'
    //vendor: ['vue', 'vue-route'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/', //用于生产的
    //filename: 'bundle.js',
    filename: '[name].js',
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
        use: ['html-loader']
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by vya')
  ]
}