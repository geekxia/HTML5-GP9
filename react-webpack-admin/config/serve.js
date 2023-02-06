// 放置serve开发服务独有的配置
const ESLintPlugin = require('eslint-webpack-plugin')
const { readEnv } = require('./util')
readEnv('development') // 使用dotenv读取.env*环境变量

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map', // 保证在浏览器报错位置和源码位置一致，方便调试！
  optimization: {
    minimize: false,   // 在开发环境中，编译，但不压缩代码
  },
  // cache: { type: 'memory' },
  cache: { type: 'filesystem' }, // 缓存到当前项目的node_modules/.cache目录（缓存电脑硬盘上）
  // 本地服务配置（配合webpack-dev-server一起用）
  devServer: {
    port: 10086,  // 建议8000以上
    // contentBase: path.resolve(__dirname, 'public') ,  // v4中，指定本地服务的静态资源目录
    // v5中，无须再指定静态资源目录了，默认就是public
    open: false,   // 启动服务成功，自动打开浏览器页面
    hot: true,    // 开启HMR(hot module replacement模块热替换) 背后是websocket长连接，给编译结果的文件模块添加频道，当文件模块发生变化时，通知浏览器更新当前模块。
    client: {
      // 对浏览器中覆盖层自定义配置
      overlay: {
        errors: true,   // 当代码出现error显示在浏览器的覆盖层上
        warnings: false // 当代码出现警告时，不显示在浏览器的覆盖层上
      }
    },
    proxy: {
      '/api/v1/react': {
        target: 'http://localhost:9999',
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      // 当webpack工作中遇到sass文件模块时，先使用sass-loader加载sass文件（交给sass编译，编译得到css文件），接着由css-loader加载css文件（读取css文件，得到css代码），最后由style-loader把css代码通过DOM操作插入到index.html的<head>标签中。
      // 注意：当多个loader一起使用时，先工作的loader写在数组的后面。
      {
        test: /\.(scss|sass|css)$/i,
        use: [ "style-loader", "css-loader", "sass-loader" ],
        // exclude: /node_modules/,
      },
      // 在v4中，像这样集成ESlint检测
      // {
      //   test: /\.(js|jsx|ts|tsx)$/i,
      //   use: 'eslint-loader',
      //   enforce: 'pre',  // 比babel-loader更早工作
      // }
    ]
  },
  plugins: [
    // 在v5中，集成ESlint代码检测（只是检测代码是否规范）
    // 在v4中，使用 eslint-loader 来集成ESLint代码检测
    // 注意：在webpack中集成ESLint一定要给配置文件。
    new ESLintPlugin({
      eslintPath: 'eslint',  // 默认的检测工具
      extensions: ['js', 'jsx'],  // 对哪些模块进行检测
      exclude: 'node_modules',   // 不检测第三方包中的js代码
    })
  ]
}
