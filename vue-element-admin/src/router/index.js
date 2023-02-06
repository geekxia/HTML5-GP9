import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router) // 注册路由

/* Layout组件，显示在 App.vue的<router-view> */
import Layout from '@/layout'

/* 路由模块。什么时候需要把路由拆解成模块？当二级路由规则太多时！ */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
// import backupRoutes from './backupRoutes'

// 开源作者自已添加的自定义路由字段
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * 静态路由：这些路由没有权限要求，任意角色的用户都有权访问！
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 当用户访问 / 时，在App.vue中找到一个名字叫default的<router-view>来显示Layout组件
  // 当用户访问 / 时，立即重定向到 /dashboard，跳转到二级路由规则
  // 当跳转到 /dashboard时，路由系统加载 Dashboard组件，显示在Layout组件内部的二级<router-view>中
  {
    path: '/',
    component: Layout, // 一级视图
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'), // 二级视图
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true, // 不显示在siderbar菜单上
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * 动态路由：这些路由是有权限要求的，要根据用户角色来动态添加的。
 */
export const asyncRoutes = [
  // 商品管理模块
  {
    path: '/good',
    component: Layout,
    redirect: '/good/list',
    name: 'GoodManage',
    alwaysShow: true,
    meta: {
      icon: 'el-icon-s-goods',
      title: 'goodmanage',
      roles: ['editor']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/good/good-list'),
        name: 'GoodList',
        meta: { title: 'goodlist',  }
      },
      {
        path: 'add',
        component: () => import('@/views/good/good-form'),
        name: 'GoodAdd',
        meta: { title: 'goodadd',  }
      },
      {
        path: 'edit/:id', // 动态路由
        component: () => import('@/views/good/good-form'),
        name: 'GoodEdit',
        props: true,
        hidden: true,
        meta: { title: 'goodedit', }
      }
    ]
  },

  // 审核模块
  {
    path: '/check',
    component: Layout,
    redirect: '/check/good',
    name: 'CheckManage',
    alwaysShow: true,
    meta: {
      icon: 'el-icon-s-goods',
      title: 'checkmanage',
      roles: ['admin']
    },
    children: [
      {
        path: 'good',
        component: () => import('@/views/check/good-check'),
        name: 'GoodCheck',
        meta: { title: 'goodcheck',  }
      }
    ]
  },


  // 404页面必须放在其它所有路由规则的最后
  { path: '*', redirect: '/404', hidden: true }
]

// 封装一个工厂方法，用于创建路由实例
// const router = createRouter()
const createRouter = () => new Router({
  // mode: 'history', // 默认是hash路由
  scrollBehavior: () => ({ y: 0 }), // 滚动行为
  // 路由规则们，目前只考虑了“静态路由们”，还没有考虑到“动态路由们”？
  routes: constantRoutes // 在beforeEach中动态添加的
})
// 初始化创建路由实例对象
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 封装方法，用于重置路由。当用户切换用户身份时，需要重置路由！
// 什么是切换用户身份？比如当你是admin用户，通过交互操作把身份变成editor。
export function resetRouter() {
  const newRouter = createRouter()
  console.log('---重置路由规则')
  router.matcher = newRouter.matcher // reset router
}

export default router // 抛出的目的是在main.js中挂载
