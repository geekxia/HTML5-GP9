# 环境搭建

- create-react-app(v5)：https://create-react-app.dev/
- 版本说明：这个脚手架的v4/v5用法完全不一样了。
- 用v4创建项目：`create-react-app 项目名称 --template ...`
- 用v5创建项目：参考文档
```
cnpm i create-react-app -g
create-react-app -h
create-react-app -V

脚手架官网默认推荐（如果用这个环境，需要手动集成toolkit）：
yarn create react-app 项目名称 --template cra-template-typescript

@redux/toolkit官网推荐（*）：
yarn create react-app 项目名称 --template redux-typescript
```
- 注意：这个脚手架搭建TS环境和非TS环境，区别是很大的。

- 问题：create-react-app创建项目，默认情况下对webpack等各种配置是隐藏了。
- 方案：执行 npm run eject 可以把webpack暴露出来（这个操作是一次性的）
```
git init
git add --all
git commit -m '第一次提交'
npm run eject // 代码目录发生变化、package.json发生变化
如果卡住了，ctrl+c结束进程，删除node_modules包，使用cnpm/yarn重新安装依赖
npm start  // 启动项目
```

- Webpack阅读（config目录、scripts目录）
- 开发环境配置：改端口、关闭自动打开浏览、添加less-loader、添加@别名、devServer代理、添加.env*环境变量！

- 目录改造，改造成咱们习惯的@redux/toolkit的开发环境！
- @reduxjs/toolkit使用：

# TypeScript

- 简介：来自微软这家公司，是JavaScript超集，主要增加类型声明、面向对象编程。它的竞争对手是Flow（来自于脸书）。
- 常识：Vue2是Flow编写的，Vue3是TS编写的。大约在2020年九月，TS渐渐火起来的，在React技术栈应用与实践。
- 官网：https://www.typescriptlang.org/
- TS类型（Everyday Types）：https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- TS类型（Object Types）：https://www.typescriptlang.org/docs/handbook/2/objects.html
- TS泛型（Generics）：https://www.typescriptlang.org/docs/handbook/2/generics.html
- TS配置（tsconfig.json）：https://www.typescriptlang.org/tsconfig


- 如何学习？在VScode中学习（内置TS检测），安装Chinese汉化插件。
- 常识：TS语法报错会影响代码启动，如果只是类型报错不影响项目运行。

- 基础类型：
  - TS中常用的类型有哪些？string、number、boolean、Array类型、any、字面量类型、函数类型、元组类型、interface自定义类型、bigint、symbol类型。
  - type和interface有什么区别？（怎么继承、能不能重复定义、能不能定义类型交叉或类型联合）
  - 什么是类型交叉？什么是类型联合？（用type关键定义，| 是联合，&是交叉，本质上就是一种type别名）
  - 什么元组？本质上是固定长度的数组，每个位置的元素类型都是固定的。
  - 什么枚举？用 enum 关键定义的，数量有限，且每个元素各不相同。
  - 对象类型：用interface或type关键字进行定义（必有属性、可选属性、扩展属性、函数属性、只读属性）
- 泛型：什么是泛型？在什么场景下会用到泛型？React.FC<T> / React.useState<T>()
- TS面向对象：自学，百度搜索各种“TS小游戏”进行学习，Web开发中基本用不到TS面向对象编程的知识。

- TS声明文件：
  - 什么是声明文件？ 那种 *.d.ts 文件，用于定义各种类型、模块声明、命名空间声明。
  - 声明文件从哪里来？自己编写的，放在项目目录中的那种.d.ts文件；来自于第三方包（@types/*）。注意，自己编写声明文件，其中的类型可以直接使用，无须导出导入；但是第三方包提供的类型，必须先导入再使用。

- TS配置文件：tsconfig.json / jsconfig.json，都是有效的TS配置文件（compilerOptions/include/exclude）。告诉TS编译器该如何工作。因为VScode有内置的TS检测规则，建议不要随便修改VScode内置的TS配置，建议优先使用tsconfig.json进行配置。

# 技术栈

- 今年四月之后：react(18)、react-router-dom(6)、@reduxjs/toolkit、antd-mobile(5) + typescrpt(4)
- 今年四月之前：react(17)、react-router-dom(5)、mobx、antd-mobile(2)

# 项目总结

- Webpack升华：config目录、scripts目录、eject操作、环境配置（端口、接口代理、.env*、支持less、babel支持、eslint、TS配置）
- react-router-dom(v6.4) 有兴趣自学！！
- @reduxjs/toolkit + react-redux(v8) ：三个重要API（configureStore、createSlice、createAsyncThunk），背后默认就集成了immer、redux-thunk，它给的dispatch方法是基于Promise封装的，它对TS支持很友好。
- antd-mobile(v5) 这个组件库非常好！！！特别推荐！！
- TS实践应用：tsconfig.json / 声明式文件(.d.ts)，数据流数据校验（状态管理、调接口、useState），组件化（对props校验），你自己领会什么anyscript。
