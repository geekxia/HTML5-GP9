import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 配置式路由（只要打开配置式路由，约定式路由就失效了）
  // 背后的路由是react-router-dom(v5)
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      // 添加name属性后，才能出现在menu上！
      name: '首页大屏',
      icon: 'smile'
    },
    {
      name: '文章管理',
      icon: 'apple',
      path: '/article',
      // 背后是这个@umijs/plugin-access起作用！
      // 这些权限字符串来自src/access.ts文件
      access: 'isAdmin',
      // 二级菜单
      routes: [
        {
          path: 'list',
          name: '文章列表',
          component: '@/pages/article/index'
        },
        {
          path: 'detail/:id',
          name: '文章详情',
          component: '@/pages/article/detail',
          // 在menu菜单上隐藏
          hideInMenu: true,
        }
      ]
    }

  ],
  // 指定hash路由模式
  history: { type: 'hash' },
  // 打包时给静态文件添加hash值
  hash: true,
  fastRefresh: {},
  // 这个属性背后的umi插件（@umijs/plugin-layout）
  // 这个属性背后组件是 ProLayout组件（@ant-design/pro-layout）
  layout: {
    siderWidth: 175,
    logo: '/logo.png',
    title: '千锋商城',
    // primaryColor: '#ff0000',
  },
  // 开启MFSU加速
  mfsu: {},
  webpack5: {},
  // ？？？
  theme: {
    '@primary-color': '#ff0000'
  },
  // 配置dva数据流
  // 只有开启了immer，在models才能直接修改state
  dva: {
    immer: true,
    hmr: true
  },
  // 向业务代码中注入环境变量
  define: {
    BASE_URL: 'http://localhost:8000'
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'https://cnodejs.org',
        changeOrigin: true
      }
    }
  }
});
