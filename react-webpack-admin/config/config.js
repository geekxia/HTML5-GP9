// 这里语法是CommonJS语法，可以使用任何 Node API的。

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const webpack = require('webpack')  // 提供了一些内置API和内置插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")

const { resolve } = require('./util.js')
const serve = require('./serve.js')
const build = require('./build.js')

const QfHelloPlugin = require('./plugins/QfHelloPlugin.js')
const QfCleanPlugin = require('./plugins/QfCleanPlugin.js')


const smp = new SpeedMeasurePlugin()

console.log('-----读取成功', process.env.DB_HOST)
console.log('-----读取成功', process.env.BASE_URL)

// 两个环境都需要的相同配置
const config = {
  // 告诉webpack咱们构建的目标是web项目
  // 配合babel的targets属性可以精确地指定构建兼容哪些浏览器的web项目。
  target: 'web',

  // 入口配置，当webpack开始工作时，就从入口文件开始编译
  // entry: './src/main.js',
  // entry: path.resolve(__dirname, 'src/main.js'),
  entry: {
    // 给入口文件取一个别名，在webpack中 [name]代表这个别名
    // app: path.resolve(__dirname, 'src/main.js'),
    // app: resolve('src/main.js'),

    // 抽离vendors，意思是把第三方重要的包从业务代码抽离出来
    vendors: ['react', 'react-router-dom', 'react-dom/client'],
    // vendors: ['react', 'react-router-dom', 'react-dom'],
    app: {
      dependOn: 'vendors',
      import: resolve('src/main.js')
    }
  },

  // 出口配置
  output: {
    // 当webpack打包后，把浏览器普遍兼容的静态资源文件放在dist目录中
    // path属性必须是绝对路径，不能是相对路径
    // path: path.resolve(__dirname, 'dist'),
    path: resolve('dist'),

    // 指定打包结果的命名规则。
    // filename: 'bundle.js' // bundle一束、一捆（默认情况下，src源码中的模块依赖会被打包成一个js文件）

    // 为什么要给打包结果添加hash字符串呢？一个常识，浏览器默认是有缓存机制的，当浏览器向服务端请求静态资源时，会把它们缓存在浏览器端。以后浏览器每次访问服务端时，都要对比文件名的变化，如果文件名字没有变化，将使用本地缓存资源。
    // 给打包结果添加hash值的原因：web项目需求变动时，重新打包，hash发生变化，部署到服务端后，浏览器再次请求，可以获取最新的静态资源文件。换句话说，hash值可以解决“浏览器缓存机制导致web项目不更新”的问题。
    // contenthash的特点：每次打包，有且仅有，当前模块的源码发生变化时，hash才会生成新值。
    filename: 'js/[name].[contenthash:8].js',
    // 什么chunk？由代码分割功能分离出来的js文件
    // 配置chunk文件的命名规则。
    chunkFilename: 'js/chunk.[id].[chunkhash:8].js',
    // 每次运行webpack时，先清空dist目录中的旧文件
    // 在v4中，要使用clean-webpack-plugin这个插件来解决！
    // clean: true,  // 准备使用自定义的QfCleanPlugin来删除dist中旧代码
  },

  // plugins数组
  // 什么是plugin？所有的webpack plugins都是class类
  plugins: [
    // 基础作用：用于把bundle和指定的html文件组装起来
    new HtmlWebpackPlugin({
      // 指定用哪个html文件进行组装
      // template: path.resolve(__dirname, 'public/index.html'),
      template: resolve('public/index.html'),

      // 指定打包或编译后的那个html模板文件的名字
      filename: 'index.html',
      title: '好程序员',  // 在index.html中使用EJS模板语法进行注入
      inject: 'body',    // 在组装js时，把bundle插入到body结束标签的前面
      // favicon: path.resolve(__dirname, 'public/favicon.ico'), // 添加网站图标
      favicon: resolve('public/favicon.ico'),
      // 根据文档，把其它的选项也试一试！
    }),
    // 显示编译进度
    new webpack.ProgressPlugin((percentage, message, ...args)=>{
      // console.info('percentage', percentage)
      // console.info('message', message)
      // console.log('args', args)
      if (percentage !== 1) {
        console.info(`${Math.floor(percentage*100)}%  ${message}`)
      } else {
        console.info(`100%  搬砖快乐~`)
      }
    }),
    // 向源码中注入环境变量
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(process.env.BASE_URL),
      CDN_URL: JSON.stringify(process.env.CDN_URL),
    }),
    // 向js源码模块中提供一些全局变量，无须每次导入
    new webpack.ProvidePlugin({
      React: resolve('node_modules/react/index.js')
    }),
    new QfHelloPlugin(),
    new QfCleanPlugin()
  ],
  // 用于配置loaders的地方（在webpack眼中一切皆模块）
  module: {
    // 规则：webpack工作时，遇到什么后缀的文件模块，使用什么样的loaders和编译器进行编译
    rules: [
      // 当webpack工作中遇到各种js模块，就使用babel-loader加载，交给@babel/core进行编译。
      // exclude， 指定哪些来源的js文件不参与编译。
      { test: /\.(js|jsx|ts|tsx)$/i, use: 'babel-loader', exclude: /node_modules/ },
      // 在v4中，通常使用file-loader或url-loader来处理图片模块资源。
      // { test: /\.(png|jpg|jpeg|gif|webp)$/i, use: 'file-loader' },
      // { test: /\.(png|jpg|jpeg|gif|webp)$/i, use: 'url-loader' },
      // 在v5中，是这样配置的。它背后使用file-loader来处理的。
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/data.[contenthash:8][ext]'
        }
      },

      // 使用自定义loader
      {
        test: /\.md$/i,
        use: resolve('config/loaders/markdown-loader.js')
      }
    ]
  },
  // 解析配置
  resolve: {
    // 支持模块化语法导入时省略后缀
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 路径别名配置
    alias: {
      '@': resolve('src')  // @ 代表的是src根路径
    }
  }
}

// 怎么区分两种环境？在v4中，一般使用cross-env来实现；在v5中，使用--env选项来实现。
// cross-env设置的环境变量，在process.env上取值
// --env设置的环境变量，在module.exports = function(env)上取值

module.exports = function ({ production }) {
  // if production=true 合并config+build
  // else 合并config+serve
  // do something
  // if (env.production) {
  //   return merge(config, build)
  // } else {
  //   return smp.wrap(config, serve)
  // }
  return merge(config, production ? build: serve)
}
