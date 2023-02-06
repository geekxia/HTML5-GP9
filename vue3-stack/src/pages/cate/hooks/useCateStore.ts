import { defineStore } from 'pinia'
import useUserStore from '@/store/useUserStore'

const useCateStore = defineStore('cate', {
  // 可共享的状态管理变量都定义这里
  // 特点：具有响应式
  // 注意：state只能写成工厂函数
  state: () => ({
    num: 1,
    cache: {},
    activeKey: 0
  }),

  // 计算属性，可以对state进行计算，还可以对另一个getters进行计算
  // 特点：具有缓存功能，有且仅有当关联计算的state发生变化时才会重新计算

  getters: {
    total1 () {
      // console.log('---this', this)
      return this.num * 100
    },
    // 对另一个getters进行计算
    total2 () {
      return this.total1 * 100
    },
    // 计算属性还可以接收参数
    total3 () {
      return (arg=1) => {
        return this.num * arg
      }
    },
    t: (state) => arg1 => arg2 => state.num+arg1+arg2,
    // getters (state) {} 不仅有this，第一个形参是state
    test1 (state) {
      // console.log('t1---this',  this)
      // console.log('t1---state', state)
      return 1000
    },
    // getters: (state) => {}  没有this的，第一个形参是state
    test2: (state) => {
      // console.log('t2---this',  this)
      // console.log('t2---state', state)
      return 2000
    },
    // shared getters
    isLogin () {
      // 在这里访问另一个store的state或getters
      const user = useUserStore()
      return user.token
    }
  },

  // 在pinia中已经没有mutations概念了
  // 在actions不仅可以写同步逻辑，也可以写异步逻辑。
  actions: {
    addNum (step=1) {
      console.log('---this', this)
      this.num += step
    },
    // 在vuex中不支持传递多个payload，在pinia是可以的。
    subNum (step=2) {
      this.num -= step
    },
    testCount () {
      const user = useUserStore()
      // do something
      user.addCount()
    }
  }
})

export default useCateStore
