import { fetchCates } from '@/api/good'

const state = {
  cates: []
}

const mutations = {
  SET_CATES: (state, list) => {
    state.cates = list
  }
}

const actions = {
  getCates: ({ commit, state }) => {
    fetchCates().then(res=>{
      // console.log('----品类列表', res)
      commit('SET_CATES', res.data.list)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
