# 关于SSR

- SSR（Server Side Render）对SEO友好，基于Node的服务端开发、增加服务端压力。。。
- CSR（Client Side Render）对SEO不友好，前后端分离、减轻服务端压力。。。

- SSR（运行Node环境中）

- Nuxt2 vs. Nuxt3 区别？

- 在哪些开发场景下会用到服务端渲染？（C端产品、项目较小、对SEO要求高、希望用户访问时更快地渲染、营销性质）


# 项目创建

```
cnpm i create-nuxt-app -g
create-nuxt-app vue-nuxtapp

本地开发
npm run dev

部署启动
npm run build
npm start
```

- Nuxt2背后的构建工具是Webpack4。大家在安装sass-loader时，不要安装最新版本，建议安装 sass-loader@10.1.1 版本。
- @vue/cli(5)中使用sass时，要安装最新的 sass-loader。
- @vue/cli(4)中使用sass时，不能安装最新的sass-loader，要使用低版本的，比如 sass-loader@10.1.1。
- @vue/cli(5)的背后是Webpack5；@vue/cli(4)的背后是Webpack4。

# 若干语法范式

- pages是约定式页面组件，components是专门用于放置可复用组件。页面组件和components组件是不一样的，比如前者可以使用asyncData钩子，后者不行。
- 在nuxt.js中，路由是约定式，背后编译会自动生成路由规则。$route路由信息、$router路由API、<nuxt-link>、<nuxt>、<nuxt-child>。
- 使用layouts目录，设计约定式布局，会用到 <nuxt>组件。
- 在nuxt.js中，Vuex是内置的，可以直接使用。写法参考Nuxt文档。内置的$store和四个map*方法都能正常使用。
- asyncData钩子、fetch钩子，实现SSR！！！
- 在nuxt.js中如何使用第三方vue插件？
- 在nuxt.js中如何实现鉴权设计？（@nuxtjs/auth这个模块！！！）
