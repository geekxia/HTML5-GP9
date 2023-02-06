import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles  后端的那个roles数组
 * @param route  一条具体的路由规则（对象, meta.roles）
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // array.some(checkCallback)
    // 后端用户信息 roles = ['a', 'b', 'c']
    // 路由表 meta.roles = ['a']
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 当我们在编写路由规则时，如果没有meta或者meta中没有roles，说明都可以访问！！
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes 路由表中的动态路由
 * @param roles  后端返回的那个非空roles数组
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        // 递归
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res // 返回当前roles有权访问的权限路由
}

const state = {
  routes: [], // 当前用户可访问的所有路由（包括静态路由和权限路由）
  addRoutes: [] // 当前用户可访问的权限路由
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 使用后端返回的用户roles，和前端asyncRoutes路由表，生成当前用户有权访问的权限路由
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 核心代码
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   // 对非admin用户，进行权限路由的过滤
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // 把权限路由放在vuex中
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
