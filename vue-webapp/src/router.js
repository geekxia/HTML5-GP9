import Vue from 'vue'
import VueRouter from 'vue-router' // 路由插件
import store from '@/store'  // 使用store

import NormalPanel from './pages/user/components/NormalPanel.vue'
import VipPanel from './pages/user/components/VipPanel.vue'

Vue.use(VueRouter) // 注册

// 像这种使用 ()=>import() 导入语法声明的组件，叫做Vue异步组件；
// 当webpack打包时，只要遇到 ()=>import() 动态导入语法，就会把导入的模块独立成一个新的JS文件。
const HomeList = () => import('./pages/home/HomeList.vue')
const CateList = () => import('./pages/cate/CateList.vue')
const CartList = () => import('./pages/cart/CartList.vue')
const UserProfile = () => import('./pages/user/UserProfile.vue')
const GoodInfo = () => import('./pages/home/GoodInfo.vue')
const UserForm = () => import('./pages/user/UserForm.vue')

export const tabRoutes = [
  {
    path: '/', alias: '/h',
    components: { alive: HomeList },
    meta: { id: 1, text: '首页', icon: 'home', }
  },
  {
    path: '/cate', name:'cc',
    component: CateList,
    meta: { id: 2, text:'品类', icon:'cate' }
  },
  {
    path: '/cart',
    component: CartList,
    meta: { id: 3, text: '购物车', icon: 'cart', auth: true }
  },
  {
    path: '/user',
    component: UserProfile,
    // 嵌套路由
    children: [
      { path: '', component: NormalPanel, meta: { auth: true } },
      { path: 'vip', component: VipPanel, meta: {  } }
    ],
    meta: { id: 4, text: '我的', icon: 'user', auth: true }
  }
]

// 创建路由实例
const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  // 路由表（自已定义的）
  routes: [
    ...tabRoutes,
    // 在path中这种带有:的字符串就被称之为“动态路由”
    // 在动态路由中，如果开启了props:true，在组件中还可以使用props选项来接收参数。
    { path: '/good/info/:id', name: 'info', component: GoodInfo, props: true },
    { path: '/login', component: UserForm },
    { path: '/regist', component: UserForm },
    { path: '/*', redirect: '/' }
  ]
})

// 当URL找路由表中的path时执行
// 鉴权拦截（判断你是否登录过）权限设计（addRoutes）

const whiteList = ['/login', '/regist']

router.beforeEach(async (to,from,next)=>{
  console.log('---to', to)


  // 当用户访问有权限的页面时
  if (to.meta.auth) {
    if (store.getters['user/isLogin']) {
      // 如果状态管理中有用户信息时，说明登录过了，直接访问吧
      next()
    } else {
      // 如果状态管理中没有用户信息，要先获取用户信息才能访问
      console.log('---你正在刷新有权限的页面')
      try {
        // ??
        console.log('----1')
        await store.dispatch('user/getInfo')
        console.log('----2')
        next()
        console.log('----3')
      } catch (err) {
        // 跳转到登录页面，并把当前页面的路径当作参数传递到登录页中去
        router.push('/login?path='+(location.hash).slice(1))
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      try {
        await store.dispatch('user/getInfo')
      } catch (err) {
        next()
      }

      next()
    }
  }
})
// 当path解析component时执行
// 这个钩子，一般很少用！！
router.beforeResolve((to, from, next)=>{
  next()
})
// 当component组件已经被显示出来时执行
// 一般用于关闭页面加载特效
router.afterEach(()=>{})

console.log('---router', router)

export default router
