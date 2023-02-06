import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)  // 注册插件

import good from './modules/good'
import user from './modules/user'

// 创建状态容器实例
const store = new Vuex.Store({

  // modules
  // 作用：是一个架构层面的概念，用于把根store拆分成多个子store。便于代码的可维护性，有助于协同开发。
  // 合并子store们
  modules: {
    good, user
  }
})

console.log('--store', store)

export default store
