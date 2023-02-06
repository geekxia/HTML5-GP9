# 环境搭建

命令行：Git Bash / Vscode终端 / Mac终端
NodeJS：16+（npm 8+）
包管理器：npm / yarn / cnpm
安装Yarn： npm install yarn -g
安装淘宝镜像：npm install cnpm -g --registry=https://registry.npmmirror.com
安装Vue脚手架：cnpm i @vue/cli -g
查看脚手架版本：vue -V

创建vue项目：
第一种方式 vue ui, 在可视化界面中进行创建；
第二种方式  vue create vue-webapp  在创建过程输入'2'选择创建Vue2项目。

启动项目：在项目根目录 yarn serve

# SPA应用

- 什么SPA？整个Web应用只有一个index.html页面，SPA单页面应用程序的本质就是组件的显示与隐藏。
- SPA应用，就是由一堆组件构建而成。做Vue SPA应用，实际上封装和使用组件，为了方便我们封装组件，Vue官方提供了.vue的单文件组件。
- 单文件组件（.vue）由 <template> <script> <style> 三个部分组织。
- 如何设计SPA单页面应用程序呢？使用 vue-router(3)。

# 路由系统

- vue(2) + vue-router(3) + vuex(3) + vant(2)
- vue(3) + vue-router(4) + vuex(4)/pinia(2) + vant(3)

- 路由版本：cnpm i vue-router@3.6.4 -S
- 在vue脚手架中如何集成路由系统？
  - 第一步：注册路由并创建路由实例（设计路由表{path,component}）
  - 第二步：在mian.js中new Vue({ router })时挂载路由
  - 第三步：在App.vue使用<router-view>指定路由匹配成功时组件显示的位置

- 两种路由模式：hash路由和history路由。
  - 前者有/#/，背后实现原理是监听onhashchange事件，如果部署上线不会出现404问题。
  - 后者没有/#，背后实现使用的是history API实现的，如果部署上线会出现404问题（使用Nginx添加重定向处理）。

- 两个全局组件：<router-view>和<router-link>
  - <router-link to tag active-class exact-active-class> 默认渲染成<a>标签，用于设计菜单。
  - <router-view name> 视图容器，用于显示路由匹配成功的页面组件，它有个默认名字叫default。

- 两个内置API：$route 和 $router。
  - $route 代表的是路由信息。如果要想监听路由(url)变化，用watch来监听$route。
  - $router 代表的是路由API，可以用于JS逻辑中的路由跳转 $router.push()/replace()/back()。
    - // this.$router.push('/login')  路由栈进栈操作
    - // this.$router.replace('/login')  替换路由栈顶的那个路由信息
    - // this.$router.back() 路由栈出栈操作

- 两个命名：视图命名、路由命名。
  - 视图命名：给<router-view name='alive'>取一个名字，路由规则使用 { components: { alive: Home }}。
  - 路由命名：给路由表中的路由规则取个名字，在路由跳转时使用 this.$router.push({name: ''})

- 两种路由跳转：声明式路由跳转、编程式路由跳转。
  - 声明式路由跳转：使用<router-link>实现跳转，一般用于菜单设计。
  - 编程式路由跳转：使用$router.push/replace/back()等进行API跳转，一般用于事件处理器中。

- 两种路由传参：动态路由传参，Query传参。
  - Query传参：像这样 'url?id=1&name=zs'，Query参数有占用“路由规则”，也就是Query参数不影响路由匹配。
  - 动态路由：在设计路由规则的path时，像这样 path:'/xx/yy/:id'，动态路由会占用“路由规则”，影响路由匹配。
  - 注意：在组件中使用 this.$route 接收各种参数。

- 两个小知识点：重定向、别名。
  - 重定向：像这样定义重定向 { path:'/*', redirect: '/已定义过的路由上' }，重定向也是一条路由规则，一般放在路由表的最后。
  - 别名：给路由规则中的 path属性取一个“小名”，这个“小名”可以当作URL来访问。

- 两个优化：路由懒加载、嵌套路由。
  - 路由懒加载：是一种基于路由的性能优化方案。它背后的原理是Vue异步组件和Webpack代码分割功能。
  - 嵌套路由(视图)：从视图的角度来讲，<router-view>所显示的组件中还有<router-view>；从路由规则的角度来讲，路由规则中有children属性，用于定义子路由；从信息架构架构的角度来讲，一级菜单所对应的页面中还有二级菜单。

- 两个难点：导航守卫、路由元信息。
  - 导航守卫：在router路由实例对象上有三个钩子（beforeEach/beforeResolve/afterEach），在SPA应用程序中每次发生URL变化时，都要按顺序执行这三个钩子。既然如此，我们可以“巧妙”在这些钩子设置判断条件，然后根据条件决定用户能不能访问目标路由。
  - 路由元信息：在定义路由规则时，使用 meta属性给当前路由规则添加额外的属性（自定义属性）。根据这些自定义属性可以“灵活”地设计路由系统。


# 使用Vant(2)

- 官网：https://vant-ui.github.io/vant/v2/
- 安装：npm i vant@latest-v2 -S
- 怎么使用Vant组件？按需导入（生产环境），一次性导入（开发环境）。
- 移动端怎么布局？（rem布局，编辑器中安装px2rem插件）
- 在项目中怎么使用sass？ cnpm i sass-loader sass -D


# axios

- 使用axios：创建实例、添加请求拦截器和响应拦截器、使用axios封装API。
- 跨域：协议、IP地址、端口号，有任何一个不相同，就是跨域。
  - https://qf.com  => http://qf.com  跨域
  - http://test.qf.com  =>  http://qf.com  跨域
  - http://localhost:8080  =>  http://127.0.0.1:8080  跨域
  - http://localhost:8080  =>  http://localhost:9999  跨域
  - 结论：客户端项目运行所在的服务器地址，和资源请求所在的服务器地址不同，就是跨域。

- 浏览器同源策略（CORS）：所有浏览器中都内置了CORS同源策略，这个安全策略的特点是阻塞AJAX跨域请求。
  - 只有浏览器中才有CORS，NodeJS环境中没有CORS。所以在NodeJS环境中使用AJAX跨哉请求，不会遇到阻塞问题。
  - CORS只对AJAX进行安全策略的管理。所以在浏览器如果一个请求不是AJAX类型的请求，CORS是不会进行任何阻塞的。
  - CORS只会阻塞AJAX跨域请求。所以在浏览器中，如果一个请求是AJAX类型的但不跨域，CORS也不会进行阻塞。

- 解决“浏览器中AJAX跨域请求被阻塞”问题的三种常用方案
  - JSONP 使用<script src='http://localhost:9999/api/v1/...?callback=handler'>
  - CORS  在后端服务端的响应请求体的Headers中添加安全协议
  - 代理  在生产环境中使用Nginx做代理，在开发环境中使用webpack做代理。

- 到底该怎么优雅地解决AJAX被CORS阻塞的问题呢？先搞清楚前端项目运行在哪个服务器地址上，把axios封装中的baseURL改成这个服务器地址，这样就保证了AJAX不发生跨域请求。再使用Webpack或者Nginx进行代理转发。

# 状态管理

- Vue(2) + Vuex(3)
- Vue(3) + Vuex(4) / Pinia(2)

- 什么状态？在应用程序中，状态就是“数据”。所以什么是状态管理呢？指的就是数据的管理。
- Vuex简介：它是Vue2官方推荐的状态管理容器，它的设计思想是参考自Flux数据架构（“单向数据流” State->View-Action-State）。在Vue2开发中，Vuex是可选的，也就是说你可以不使用Vuex。
- Vuex两个作用：实现跨组件通信；实现数据缓存。

- 安装：cnpm i vuex@3.6.2 -S
- 在Vue2脚手架环境中如何集成Vuex呢？
  - 第1步：引入并注册 Vue.use(Vuex)
  - 第2步：创建store实例 new Vuex.Store({state, gettters, mutations, actions, modules}) 并抛出。
  - 第3步：在main.js挂载状态容器。

- Vuex知识点：五个概念(state,getters,mutations,actions,modules)、四个map*方法、一个内置$store。

- Vuex三个使用原则：
  - 如果项目中使用到了Vuex，一定要使用modules拆分子store，并要求开启子store的命名空间。
  - 在组件中使用Vuex的数据和方法们，推荐使用map*系列方法进行映射，尽可能避免使用$store。
  - 在使用Vuex时，建议严格遵循Vuex官方流程（view->actions->mutations-state），配合devtools有记好的数据调试功能。

- 关于Vuex官方流程图：会画（理解）、会说（面试）、会写（代码）。
