// 这就是根store上的状态变量
export const state = () => {
  return {
    num: 100
  }
}

export const getters = {
  total (state) {
    return state.num * 100
  }
}

export const mutations = {
  add (state, payload) {
    state.num += payload
  }
}
