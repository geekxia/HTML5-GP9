// Babel是目前主流的JS编译器，把比较新的JS语法编译成浏览器兼容的ES5语法
// 怎么使用？在webpack中配置babel-loader（自动加载@babel/core），在项目根目录添加babel.config.js对预设和插件进行手动配置。
// Babel由两大部分组成：预设、插件。

// 常用的预设：@babel/preset-env、@babel/preset-react、@babel/preset-typescript
// 常用的插件：参考 https://www.babeljs.cn/docs/plugins-list

// JSX语法：是Facebook开源的语法糖（JavaScript XML），背后编译要借助React.createElement()完成编译工作。

module.exports = {
  // babel预设，用于编译大版本的JS语法
  // 在这里不要添加 @babel/core，为什么？在这个环境中，@babel/core给babel-loader用的。
  presets: [
    [ '@babel/preset-env', {} ],
    [ '@babel/preset-react', {} ],  // 这个预设的背后用到了React
  ],
  // babel插件，用于小修小补，编译一些小的JS语法的
  plugins: [
    [ "@babel/plugin-proposal-decorators", { "legacy": true }],
    [ "@babel/plugin-proposal-class-properties", {} ]
  ],
  targets: {
    "chrome": "58"
  }
}
