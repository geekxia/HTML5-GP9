import { fetchList } from '~/utils/api'

// 这是子store。注意state必须使用工厂函数！！！
export const state = () => {
  return {
    list: []
  }
}

export const mutations = {
  set_list (state, list) {
    state.list = list
  }
}

export const actions = {
  getList (store, params) {
    return new Promise(resolve=>{
      fetchList(params).then(list=>{

        store.commit('set_list', list)
        console.log('---走流程', list)
        resolve()
      })
    })



  }
}
