import { fetchUserInfo } from '@/api'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'), // 保留登录状态
    userinfo: {},  // 只保存在Vuex，表示用户信息
    routes: []
  },
  getters: {
    isLogin (state) {
      // do something
      // 如何判断用户真的登录了？建议使用userinfo来判断。
      // 说明：在这里我们用token简单判断！！
      // 思考：仅使用Token来判断是否登录了，为什么不靠谱？（Token过期、假Token）
      // return Boolean(state.token)
      // 优化：这里咱们使用用户信息来判断是否登录了
      return Boolean(state.userinfo.username)
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    resetUser (state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    setInfo (state, userinfo) {
      state.userinfo = userinfo
    }
  },

  actions: {
    getInfo ({ commit }) {
      return new Promise((resolve, reject)=>{
        fetchUserInfo().then(res=>{
          if (res.info && res.info.username) {
            commit('setInfo', res.info)
            resolve()
          } else {
            reject()
          }
        })
      })
    }
  }

}
