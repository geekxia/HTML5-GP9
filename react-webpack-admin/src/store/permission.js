import { asyncRoutes } from '@/views'

/* 权限算法的核心代码 S ----------------------------------------- */
// 用于生成权限路由的action
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

function filterAsyncRoutes(routes, roles) {
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

// action生成器
export function generateRoutes (roles) {
  return dispatch => {
    // 根据路由表和后端roles，生成当前用户可访问的动态路由
    const accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
    dispatch({ type: 'PERMISSION_ROUTES', payload: accessRoutes })
  }

}
/* 权限算法的核心代码 E ----------------------------------------- */
