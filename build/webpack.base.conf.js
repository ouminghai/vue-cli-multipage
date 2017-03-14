var path = require('path')
const merge = require('webpack-merge');
var autoprefixer = require('autoprefixer');
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
const entries = require('./entries')

const projectRoot = path.resolve(__dirname, '../');
const projectSrc = path.resolve(projectRoot,'./src');

var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    chunkFilename: '[id].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules:[path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'common': path.resolve(projectSrc, 'common'),
      'modules':  path.resolve(projectSrc, 'modules'),
      'components': path.resolve(projectSrc, 'components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins:[
    //提取公共模块插件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2,//设置有两个人使用公共库即可
      chunks:Object.keys(entries)
    }),
  ],
  //不属于node module 的部分

  externals:{
      'jquery' : 'jQuery'
  }

}
