# Umi学习

- 最新版本：umi(v4) 自行研究！在国内想学习前沿React技术！
- 市场版本：umi(v3) 写在简历上！市场占比30%。

- 学习路径：umi(v3) --> and-design-pro(开源项目)

- umi两种配置文件：.umirc.ts（优先级更高）、config/config.ts（另一种配置方式）二选一。
- umi没有入口文件（src根目录没有main.js/index.js）。
- src/.umi （缓存文件）注意：每次发umi代码给别人，或者改目录路径等，不要带src/.umi；这个缓存目录只对本地服务有用，对生产打包无效。

- umi路由：支持两种路由模式（约定式路由、配置式路由），建议使用配置式路由（背后是react-router-dom），会配置路由、二级路由、Menu菜单、权限设置、动态路由、路由API。

- umi布局：src/app.tsx中的 layout()方法可以使用ProLayout组件来定制布局。当定制布局时，它的优先级会调用.umi.ts中的layout属性配置。

- umi数据流：背后用是的是dva数据流（redux、redux-saga）。
- 什么dva？是阿里的一个前端工程师开源的一个react脚手架（react-router-dom路由 + redux状态管理 + redux-saga数据流）

- ProComponent组件：基于antd封装的。在umi项目中，ProComponent组件和antd组件可以同时使用。
- 一次性安装所有Pro组件：cnpm i @ant-design/pro-components@1.1.25 -S
- 常用组件：PageContainer、ProTable系列、ProForm、等！！！！

- 版本说明
- umi版本：v3  v4
- 开源项目ant-design-pro：v5(*)（背后是umi?）
- antd版本：v3、小于v4.20、大于4.20（今年5月）
- Pro组件库：v1(写法是小于antd4.20的写法)  v2(写法是大于antd4.20+写法)

- 版本建议：umi(v3)-> Pro组件(v1) -> antd(小于v4.20)
- 版本建议：umi(v4) -> Pro组件(v2) -> antd(大于v4.20)

- umi配置：（官网配置、插件配置）

# Umi复习

- 常用插件及其配置：access插件、layout插件、dva插件（saga数据流）、model插件（hooks数据流）、locale插件、initial-state插件、request插件。
- 常用配置：.umirc.ts / config，把常用配置自己梳理一遍。
- Pro组件库：常用组件，盘点一下。

# 开源项目（*）

- ant-design-pro开源项目：分析时，萃取一些项目经验。
- 常用插件、常用配置，都看一下。
- ******
