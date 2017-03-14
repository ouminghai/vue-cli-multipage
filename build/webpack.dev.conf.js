const path = require('path');
var utils = require('./utils')

const glob = require('glob')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


const projectSrc = path.resolve(__dirname,'../src');
const projectJs = path.resolve(__dirname,'../src/modules');
const globalPath = projectJs+'/**/*.js';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

let devConfig  = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    /*new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),*/
    new FriendlyErrorsPlugin()
  ]
});



let pages = ((globalPath)=>{
  let htmlFiles = {},
    pageName;

  glob.sync(globalPath).forEach((pagePath)=>{
    var tmp='';
    var basename = path.basename(pagePath, path.extname(pagePath));
    tmp = pagePath.split('/').splice(-3);

    pageName =  tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    htmlFiles[pageName] = {};
    htmlFiles[pageName]['chunk'] = basename;
    htmlFiles[pageName]['path'] = pagePath;
  });
  return htmlFiles;
})(projectJs+'/**/*.html');

for (let pagePath in pages) {
  let conf = {
    // 生成出来的html文件名
    filename: pagePath + '.html',
    // 每个html的模版，这里多个页面使用同一个模版
    template: pages[pagePath]['path'],
    // 自动将引用插入html
    inject: true,
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    chunks: ['vendor','manifest',pagePath]
  };
  // https://github.com/ampedandwired/html-webpack-plugin
  /*入口文件对应html文件（配置多个，一个页面对应一个入口，通过chunks对应）*/
  devConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = devConfig;

