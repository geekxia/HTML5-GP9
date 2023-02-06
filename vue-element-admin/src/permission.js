import router from './router' // 导入路由实例
import store from './store' // 导入store实例dispatch/commit/state/getters
import { Message } from 'element-ui' // 从ElementUI引入交互提示框

// 页面加载时显示“加载进度条”
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false })

// 从utils目录中导入两个工具方法
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

// 白名单（无须登录就可以访问的页面们）
const whiteList = ['/login', '/auth-redirect']

// 给路由实例添加全局钩子（当url找到path时）
// async 表示这个路由钩子的逻辑是同步代码
// 全局守卫钩子的特点：每次访问路由时，都要执行路由钩子
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启加载进度条

  // 动态设计文档标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否登录了？（判断有没有Token字符串）
  // 问题：token值有几种情况？undefined、有效的Token、假Token
  const hasToken = getToken()

  // 有Token字符串时（有效的Token，也有可能是假Token）
  if (hasToken) {
    if (to.path === '/login') {
      // 有Token（是真是假无所谓）并且你将要访问/login登录页，重定向到系统内部首页
      // 人话：如果有Token字符串，就不能访问登录页！！！
      next({ path: '/' }) // next({path: '/dashboard'})
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 有Token（是真是假无所谓）并且访问的不是登录页
      // 判断Vuex状态管理中有没有用户信息（roles角色信息）
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        // 如果在Vuex中有用户信息（roles数组），直接过吧，直接加载对应的页面组件
        next()
      } else {
        // 如果在Vuex中没有用户信息（没有roles数组），说明一个问题：当前代码不知道Token对应的是什么？
        // 用户是谁？用户是什么角色呢？如果连当前用户的角色都不知道，权限就是未知的，所以不能轻易让你过！
        // 该怎么办？用Token调接口，向后端发起请求，获取当前Token对应的用户信息。
        try {
          // 温馨提示: 后端返回的用户角色数据必须是这样的: ['admin'] or ['developer','editor']
          // 用Token调接口获取用户信息（走Vuex流程）
          // 问题：如果是假Token或者是过期Token，那么调用用户信息接口，会不会报错呢？
          const { roles } = await store.dispatch('user/getInfo')

          // 根据后端返回的roles角色数组和asyncRoutes动态路由们，生成当前用户有权访问的权限路由！
          // 温馨提示：这个背后有一个非常重要的权限算法，值得咱们借鉴和学习！！
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 使用算法，已经完成了权限路由的生成。目前这些路由规则还尚未添加到路由系统中去。

          // 手动向路由系统中添加额外的路由规则（权限路由）
          router.addRoutes(accessRoutes)
          // 如果代码走到这里，说明当前用户有权访问的权限路由也进入到路由系统中去了。

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          // 权限路由已生成，去访问你想访问的页面吧
          next({ ...to, replace: true })
        } catch (error) {
          // 当客户端的Token是假的或过期了，走下面这个流程！！！
          // 走Vuex流程，清除本地存储中的假Token或过期Token
          await store.dispatch('user/resetToken')
          // 弹出ElementUI提示框
          Message.error(error || 'Has Error')
          // 重定向到登录页，并记录你想访问的目标路径
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 当没有Token字符串（说明 token = undefined）

    if (whiteList.indexOf(to.path) !== -1) {
      // 没有Token，但你访问的是白名单中的页面，直接访问吧！！
      next()
    } else {
      // 没有Token，但你访问的不是白名单页面，重定向到登录页并记录你想访问的非白名单路径
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 当component已经在<router-view>中显示成功时
router.afterEach(() => {
  NProgress.done() // 关于页面加载的进度条
})
