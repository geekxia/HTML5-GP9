import produce from 'immer'
// import { constantRoutes } from '@/views'

const initState = {
  routes: [],  // 当前用户可访问的动态路由+静态路由
  accessRoutes: []   // 根据roles筛选后的动态路由
}

export default function (state=initState, {type, payload}) {
  return produce(state, state=> {
    switch (type) {
      case 'PERMISSION_ROUTES':
        state.accessRoutes = payload
        // state.routes = constantRoutes.concat()
        break;
      default:

    }
  })
}
