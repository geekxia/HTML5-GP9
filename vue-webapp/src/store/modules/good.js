import { fetchGoodList } from '@/api'
// 子stroe
export default {
  namespaced: true,  // 开启子store的命名空间
  // state
  // 作用：它可以被Vue组件使用，并且定义在这里的数据是响应式的。
  // 特点：当state中的数据发生更新时，那些使用到state数据的组件会自动更新。
  state: {
    num: 100,
    cache: {},  // 缓存右边的二级商品列表数据
  },
  // gettters
  // 作用：用于对state进行计算，也具有缓存的特点，有且仅有被关联的state变量发生变化时，getters方法才会重新计算。
  // 理解：相当于没有set功能的computed计算属性。
  getters: {
    total (state) {
      return state.num * 100
    }
  },
  // mutations
  // 作用：用于封装直接修改state变量的方法们。
  // 特点：可以配合devtools对Vuex进行流程化的调试。
  mutations: {
    // 这个payload是 $store.commit('', )提交时传递过来的数据
    addNum (state, payload) {
      console.log('---payload', payload)
      state.num += payload
    },
    updateCache (state, { activeKey, list }) {
      state.cache[activeKey] = list
      // 解决Vuex响应式缺陷问题
      state.cache = JSON.parse(JSON.stringify(state.cache))
    },
    cleanCache (state) {
      state.cache = {}
    }
  },
  // actions
  // 作用：用于封装调接口的逻辑方法们。
  // 特点：用于和后端API交互，是Vuex中编写异步逻辑的地方。
  actions: {
    getList ({ commit }, { activeKey, cate }) {
      // console.log('---store', store)
      // console.log('---activeKey', activeKey)
      // 根据当前高亮品类获取对应的商品列表
      fetchGoodList({cate}).then(res=>{
        // console.log('---当前品类对应的商品列表', res)
        commit('updateCache', { activeKey, list: res.list })
      })
    }
  },
}
