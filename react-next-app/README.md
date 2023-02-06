# 版本

- Next.js(V12) --Webpack
- Next.js(V13) --Turbopack(以这个为例讲解)

- 三个命令：
- npm run dev    启动开发环境
- npm start      部署到云服务后，执行这个命令，启动next服务
- npm run build  把SSG打包成静态资源

- 路由（约定式路由）pages目录、Link组件、useRouter
- 常用的内置组件：Head、Script、Image。。。

- Next.js同构渲染（CSR、SSR、SSG）
- CSR 客户端渲染（当客户端访问CSR页面时，服务端不调接口、不编译React代码，客户端接收资源代码，再执行各种副作用，在客户端完成渲染工作，这就像前后端分离的写法）
- SSR 服务端渲染（当客户端访问SSR页面时，服务端先使用getServerSideProps调接口，再和React组件进行组装生成静态HTML，然后返回给客户端，客户端直接渲染，这就像传统的前端不分离的写法）
- SSG 静态渲染（当执行npm run build构建打包，服务端使用getStaticPaths路由数据，再使用getStaticProps调接口，根据路由数组和React组件生成若干静态HTML页面。以npm start部署后，这个静态资源文件可以被访问！）

- Node.js开发（*）
- 业务？？权限？？
