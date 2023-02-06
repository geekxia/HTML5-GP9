// 放置build生成打包独有的配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { readEnv } = require('./util')
readEnv('production') // 使用dotenv读取.env*环境变量

module.exports = {
  mode: 'production',
  devtool: 'source-map',  // 打包时可以得到高质量的静态资源代码
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),  // 指定用terser进行JS代码压缩
      new CssMinimizerPlugin()  // 使用cssnano压缩css代码
      // 自己找一个图片压缩工具
    ],
  },
  cache: false,  // 打包时，不使用缓存！
  plugins: [
    new MiniCssExtractPlugin({
      // 用于指定生成css文件的命名规则
      filename: 'css/[name].[contenthash:8].css',
    })
  ],
  module: {
    rules: [
      // 当webpack工作中遇到sass文件模块时，先使用sass-loader加载sass文件（交给sass编译，编译得到css文件），接着由css-loader加载css文件（读取css文件，得到css代码），最后由MiniCssExtractPlugin.loader把css代码写入到一个css文件中。
      // 注意：当多个loader一起使用时，先工作的loader写在数组的后面。
      {
        test: /\.(scss|sass|css)$/i,
        use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ],
        // exclude: /node_modules/,
      },
    ]
  }
}
