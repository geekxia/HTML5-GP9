【学习路径】

1、webpack环境、react基础（17/18）、react-router-dom、redux、ant-design。。。=>输出一个和vue-element-admin几乎一样的管理系统
2、create-react-app脚手架、typescript、@reduxjs/toolkit、antd-mobile(5)     => 输出一个移动端项目
3、阿里生态（dva、umi3、ant-design-pro。。。）
4、next.js服务端渲染。

【环境搭建】

- 注意：webpack(v4/v5)
- 文档：webpack中文网、webpack英文网，结合着学习。
- 简介：webpack是一个打包工具，用于把前端模板依赖打包成浏览器能够普遍兼容的静态资源；webpack是一个构建工具，是前端工程化的基础；webpack是基于loaders和plugins的，是前端架构的基础，定制符合企业开发需求的架构环境。

- webpack  全局安装、本地安装，这是webpack核心包，提供了一些重要API和内置插件。
- webpack-cli  全局安装、本地安装，提供了很多有用的命令行工具。
- webpack-dev-server  全局安装、本地安装，配合webpack提供本地node服务器、HMR热更新服务。

- webpack是怎么工作的？webpack是基于Node运行时环境的，webpack是基于配置文件的（学习webpack实际上就是在学习各种配置）。
- webpack官方指定的配置文件：webpack.config.js

- html-webpack-plugin 用于自动合并bundle和指定的html页面
- cross-env 用于向node运行时环境中添加环境变量
- webpack-merge 用于合并webpack配置选项的。
- clean-webpack-plugin 在v4中用于自动清理掉dist中的旧代码

- dotenv-webpack  在v4中，把.env*环境变量通过webpack环境注入到源码中（注意，只能在v4中用）
- dotenv / dotenv-expand 在v5中，使用两个包读取.env*中的环境变量，将它们放在process.env上
- webpack.DefinePlugin   使用这个内置插件把环境变量注入到源码中去。  

- babel-loader  用于加载.js/.jsx/.ts/.tsx文件模块，交给@babel/core进行编译，得到ES5代码
- @babel/core   是Babel(7)的核心编译器
- @babel/preset-env  用于编译ES6+语法
- @babel/preset-react  用于编译JSX语法
- @babel/plugin-proposal-decorators  这两个Babel插件是用于编译装饰器语法
- @babel/plugin-proposal-class-properties

- webpack.ProvidePlugin  这个内置插件用于向源码JS模块提供全局变量，避免重复导入。
- react(18)  用于封装React组件的
- react-dom(18)  用于渲染React组件的

- sass-loader  用于加载.scss模块文件，交给sass进行编译
- sass  用于编译sass代码，得到css代码
- css-loader  用于加载.css模块文件
- style-loader  使用DOM操作把css代码注入到html的style标签中去
- mini-css-extract-plugin  在生产打包时，用于抽离css代码，生成css文件

- eslint-loader
- eslint-webpack-plugin  
- eslint
- eslint-config-airbnb
- @babel/eslint-parser

- file-loader
- url-loader

- Webpack系列优化扩展
- devtool优化
- 抽离vendors
- 代码分割（wepback在打包时遇到()=>import()动态导入语法，就会分离出新的chunk）
- optimization优化：terser-webpack-plugin、css-minimizer-webpack-plugin
- tree-shaking：默认情况下，webpack支持摇树功能的，对那些确定的死代码会被摇掉，对那些不确定的模块及代码保留。在package.json中添加""sideEffects":false"，这样的话webpack打包时执行严格摇树，这样做经常会出现样式丢失问题，所以一般不建议这么配置。建议的配置方式，对js模块执行严格的摇树，对css全部保留，具体写法 ""sideEffects":["*.css", ...]"。
- target构建目标的优化，配合babel的tartets一起使用
- cache 在开发环境，把编译缓存到node_modules/.cache，提升开发环境的编译速度，并且释放内存占用！

- webpack模块联邦技术（*）

- webpack工作流程：编译对象、插件运行机制
- 如何自定义webpack插件？
- 如何自定义loader？进一步理解什么是loader。
- 扩展：webpack面试题、webpack优化技巧。

- 如果让你用webpack搭建MVVM开发环境，你会怎么做？


# React基础

- 笔记参考 src/views/study/*

# React路由

- 常识1（三个重要的包）
  - react-router是路由核心包.
  - react-router-dom是基于路由核心包而封装的一个Web路由包。
  - react-router-native是基于路由核心包的一个RN路由包。

- 常识2（版本变迁）
  - react-router-dom(v5) 在2021年9月之前    
    - <BrowserRouter>, <HashRouter> 指定路由模式
    - <Link>, <NavLink>  用于设计菜单，相当于a标签
    - <Route>, <Switch>, <Redirect> 用于设计路由规则
    - withRouter 这是一个高阶组件，用于组件中注入路由API
    - useHistory、useLocation、useParams、useRouteMatch 支持Hooks编程
    - @loadable/component  基于路由进行代码分割（它背后是基于React.lazy()、<Suspense>）
    - react-router-config  更方便地实现路由权限       

  - react-router-dom(v6) 在2021年10之后
    - <BrowserRouter>, <HashRouter>  两种路由模式
    - <Link>, <NavLink>  设计菜单
    - <Navigate to=‘’>  重定向
    - <Routes>, <Route>, <Outlet>  用组件的方式定义路由规则
    - useLocation, useNavigate, useParams, useSearchParams  路由信息与路由API
    - useRoutes()  动态生成路由规则（*权限设计*）
    - @loadable/component  推荐使用这个包实现路由懒加载（代码分割）它背后是使用React.lazy()和Suspense实现的！

  - react-router-dom(v6.4)  在2022年10月左右
    - 新特性：https://reactrouter.com/en/main/start/overview

# 状态管理

- Flux数据架构思想（State-View-Action单向数据流）
- 官网：https://facebook.github.io/flux/

- Redux传统写法
  - redux 定义数据仓库的
  - react-redux 用于连接redux数据仓库和React应用

- mobx(小程序 uniapp Taro)
- mobx-react

# 项目总结

- Webpack（如何搭建环境，Webpack速度优化和代码优化、代码分割、TreeShaking、loaders概念、plugins概念、Hash值）
- React17/18基础（12、14、16）最好结合React文档
- react-router-dom（v5、v6）打开v5文档和v6文档，把常用API的作用都记一下！权限设计（*）！
- redux、react-redux、redux-thunk、immer（三个三）
- antd组件库（常用组件、Form、Table、版本v4/v.20、你封装过组件）
- 项目经验30条（权限设计、性能优化10条以上、图表、富文本框、虚拟长列表、难点亮点……）
