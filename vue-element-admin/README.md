# 环境运行

- 暂时去掉 "tui-editor": "1.3.3" 这个包。
- yarn 安装所有依赖
- npm run dev 启动项目（core-js / tui-editor两个错误）
- 在src源码中，搜索tui-editor代码，注释掉
- npm run dev ，还报错（core-js）
- yarn add core-js  安装时报错
- cnpm i core-js -D  安装成功
- npm run dev  项目启动成功！！！！

# 如何分析一个新项目？

- 原则：理论上当我们拿到一个开源项目或企业项目时，不要急着启动项目，应该先把项目架构分析一遍。
- 1、详细翻阅并逐字阅读 README.md，不要错过任何一字！
- 2、阅读 package.json文件（项目怎么启动、技术栈、用到了哪些依赖包、还有其它信息等）
- 3、把项目根目录中的若干配置文件都翻一遍（webpack、babel、eslint、环境变量等）
- 4、简单翻阅根目录中的其它目录（node_modules、mock、config、public等）
- 5、分析 src/main.js 入口文件（读开源代码时，边读边写注释，清除语法障碍）
- 6、分析 src/App.vue 根组件（路由视图、Layout布局设计、项目全局功能等）
- 7、分析 src/layout目录，研究系统布局设计（菜单设计、视图容器设计、TagView、Header、Settings设计）
- 8、路由系统设计（鉴权流程、权限设计） src/router目录、src/permission.js文件。
- 9、数据流组织方式（Vuex流程、axios封装、前端代理、api封装）。
- 10、研究整个项目的公共组件或方法，就是一些可以复用的代码和逻辑（组件、指令、混入、表单验证方法等）。
- 11、研究页面的编写范式（代码规范、命名规范、UI组件库等）。
- 12、配路由、写页面、调接口、改Bug、。。。（日常工作）

- 经验：分析完项目，输出10个左右的问题，和领导约时间让领导帮你梳理一遍架构。
