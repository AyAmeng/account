'use strict'

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

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.styl', '.css'],
    modules: [path.resolve('./node_modules')],
    alias: {
      'src': path.resolve('../src'),
      'vue': 'vue/dist/vue.js'
    },
  },
  
  entry: {
    main: './src/index.js'
    //vendor: ['vue', 'vue-route'],
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    //publicPath: '/dist/', //用于生产的
    //filename: 'bundle.js',
    filename: '[name].[chunkhash].js',
    //filename: 'bundle.js',
    //chunkFilename: '[name].chunk.js',
  },
  module: {
    // loaders
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
    ]
  },
  plugins: [
    //css
    // new ExtractTextPlugin({
    //   filename: '[name].[chunkhash].css',
    //   allChunks: true
    // }),
    //new webpack.BannerPlugin('This file is created by vya'),
    // new ExtractTextPlugin('[name].css', {allChunks: true}), 

    // 单独打包CSS 参数为 new ExtractTextPlugin({filename: string | pathString, allChunks: boolean, }）
    // new ExtractTextPlugin({
    //   filename: '[name].[chunkhash].css',
    //   allChunks: true
    // }),

    // 打包指定的html文件到指定文件夹  new HtmlWebpackPlugin({filename: pathString , template: pathString, hash: boolean, minify: {}})
    // new HtmlWebpackPlugin({
    //   filename: './dist/index.html',
    //   template: './src/index.html',
    //   //hash: true,
    //   // minify: {
    //   //   removeComments: true,
    //   //   collapseWhitespace: true,
    //   //   removeAttributeQuotes: true
    //   // }
    // }),
  ]
}
  /**
   * ### resolve:
   * webpack的alias的作用，通过key，value的形式，将模块名和路径对应起来.
   * 不管是相对路径还是绝对路径.因此，在模块引用的时候，
   * 利用require引用的模块可以不用通过相对路径或者绝对路径的方式，而是直接通过require('模块名')的方式进行引用。
   */

  /**
   * ### entry:
   * 入口文件，通过key，value的方式，确定入口文件的文件名及其对应的文件路径。
   * eg: entry: {
        indexA: ['./path/to/index.js']
    }
    什么是入口文件呢？在webpack中，所有的js文件都可以通过一个js文件进行引用，如下面的例子那样：
    /**
   *  index.js => require('moduleA'); require('../../path.js')
   webpack => {
      entry: {
          indexA: ['./path/to/index.js']
      }
    }
    webpack打包的时候，webpack会根据 webpack.config.js 中的entry字段，
    对index.js文件中所有通过require引入的js文件打包成indexA.js和common.js文件，
    至于common.js文件是怎样生成的，需要做些什么配置，后文会有所介绍。
   */

  /**
   * ### output: => {path: './build/public'}
   * webpack打包后，生成的js文件，css文件，字符文件，图片文件会打包放在path字段所指定的文件目录中。
   * publicPath => publicPath: '/buildPath/'
   * css文件中，我们通常都会引入图片或者字符文件，而webpack打包过程中，其引用的文件可通过file-loader(loader部分会介绍)进行打包，并对其文件名进行处理。
   * 而在node引用中，我们可以搭建静态文件服务器，对某一文件夹（如express默认的public）中的静态资源进行管理，浏览器可以通过 /images/image-name.jpg直接访问。
   * 而webpack打包的时候，遇到通过相对路径或者绝对路径进行引用的文件，其路径可通过publicPath中指定的路径重新合成。
   * 如在css文件中有以下文件路径
   * div{ background-image: url(../images/picA.jpg);}
   * 而在webpack.config.js中，有以下配置
   * output: {
   *     path: './build/public',
   *    publicPath: '/buildPath/'
   * },
   * 而webpack生成的css文件如下: 
   * div{ background-image: url(/buildPath/picA.jpg);}
   * 
   * filename => 
   * 
   * filename output: {
   *  path: './build/public',
   *  publicPath: '/',
   *  filename: '/javascripts/[name].js'
   * }
   * 确定webpack生成的js文件的准确路径和文件名，
   * 其文件路径根据之前的path和filename进行合成，
   * 文件为entry中的指定的index.js文件的模块名，
   * 如上面配置项所示，index.js文件生成的路径为 build/public/javascripts/indexA.js
}
   */
  
  /**
   * 在webpack中，loader是webpack中最为重要的组成，loader可以对不同的文件使用不同的loader进行处理，且模块可以链式使用。
   * loader的作用是什么呢？我们在前端开发中，我们可能以不在直接使用css进行开发而使用Sass、Less这种预编译器进行处理，
   * js我们可能使用coffee进行编写，甚至使用ES6进行开发，因此，我们需要对我们所编写的less文件，
   * coffee文件或者使用了ES6语法的js文件进行编译或者转义，而loader的作用就是如此。
   * 什么文件我们需要进行转义了，在loader字段中，我们可以在test字段中通过正则表达式选择我们需要转义的文件。
   * loader可以链式调用，对于less文件，我们可以通过less-loader对less文件转义成css文件，
   * 然后再使用css-loader对其生成的css文件在进行进一步的处理。
   */
  
  /**
   * plugins: 
   * plugins是webpack中和loader同等地位的组成部分，
   * 他可以对我们生成的文件或者我们需要怎样生成文件进行跟细致化的处理。
   * new webpack.optimize.CommonsChunkPlugin("commons", "javascripts/commons.js") 
   * => 该插件可以对entry中入口文件中的共同部分进行分离，
   *  达到在不同页面中可以共用同一套commons.js，利用缓存减少文件从服务器中获取。
   * 
   * new ExtractTextPlugin( "/stylesheets/[name].css" ,  {allChunks: true}) 
   * => 在output字段中，我们可以通过filename字段所定义的文件路径和文件名来确定我们所生成的js文件路径和文件名。
   * 而对于css部分，我们可以通过上述插件对css部分进行类似于上面js部分的处理。
   * 
   * 
   * new webpack.ProvidePlugin({
        "jQuery": path.resolve(
            __dirname,
            "assets/bower_components/jquery/dist/jquery"
        ),
        "$": path.resolve(
            __dirname,
            "assets/bower_components/jquery/dist/jquery"
        )
    }) ==> 
   * 在webpack中，对于模块的引入，我们可以使用require的方式进行引入，
   * 也可以通过该插件全局引入好像jQuery和$这样的模块名，而不用在文件内部使用require进行引入。
   */