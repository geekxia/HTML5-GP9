// 定义redux子store
import { fetchCnode } from '@/services/article'

export default {
  // 子store的命名空间
  namespace: 'article',
  // 状态数据
  state: {
    num: 1,
    list: []
  },
  // 相当于Vuex的mutations
  reducers: {
    // type='article/add'
    add (state, { type, payload }) {
      // 当immer开启了时
      state.num += payload

      // 当immer未开启时
      // let newState = JSON.parse(JSON.stringify(state))
      // newState.num += payload
      // return newState
    },
    // type='article/sub'
    sub (state, { payload }) {
      state.num -= payload
    },
    // type='article/updateList'
    updateList (state, { payload} ) {
      console.log('---updateList', payload)
      state.list = payload
    }
  },
  // 相当于Vuex的actions
  effects: {
    // type='article/getList'
    *getList ({payload}, { put, call}) {
      // 这里要同步调接口，使用call('调接口方法','调接口的入参')
      const res = yield call(fetchCnode, payload)
      console.log('---文章列表', res)
      // 这里一定要同步执行
      yield put({type: 'updateList', payload: res.data })
    }
  }
}
