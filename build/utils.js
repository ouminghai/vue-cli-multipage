var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {

    let sourceLoader = loaders.map(function (loader) {
      let extraParamChar;
      //如果匹配有问号
      if(/\?/.test(loader)){
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      }else{
        loader = loader + '-loader';
        extraParamChar = '?';

        // 解决npm run dev 和 npm run build 编译后前缀不一样的问题
        if (loader === 'css-loader') {
          extraParamChar = '?-autoprefixer&'
        }

      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
    }).join('!');


    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      sourceLoader = sourceLoader.split('!');
      sourceLoader.shift();
      sourceLoader.unshift({
        loader:'css-loader',
        options: {
          minimize: true
        }
      });
      return ExtractTextPlugin.extract({
        use: sourceLoader,
        fallback: 'vue-style-loader'
      });
    } else {
      //开发模式下
      return ['vue-style-loader', sourceLoader].join('!');
    }

  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)

  for (let extension in loaders) {
    let loader;

    if(!options.extract) {
      loader = loaders[extension].split('!');
    }else{
      loader = loaders[extension];
    }
    let postCssLoader = {
      loader:'postcss-loader',
      options:{
        plugins:function(){
          return [
            require('autoprefixer')({
              browsers: ['last 2 versions']
            })
          ];
        }
      }
    };
    if(loader.length>1){
      loader.splice(loader.length,0,postCssLoader);
    }else{
      loader.push(postCssLoader);
    }

    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }

  return output

}
