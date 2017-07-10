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
    main: './src/entry.js'
    //vendor: ['vue', 'vue-route'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    //publicPath: '/dist/', //用于生产的
    //filename: 'bundle.js',
    filename: '../dist/static/[name].[chunkhash].js',
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
        test: /\.html$/,
        use: ['html-loader']
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by vya'),
    // new ExtractTextPlugin('[name].css', {allChunks: true}), 

    // 单独打包CSS 参数为 new ExtractTextPlugin({filename: string | pathString, allChunks: boolean, }）
    new ExtractTextPlugin({
      filename: '../dist/static/[name].[chunkhash].css',
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
}