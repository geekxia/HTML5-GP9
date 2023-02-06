// Redux怎么学？（记住三个三）
// 第1个三（3个API）：createStore()、combineReducers()、applyMiddleware()
// 第2个三（3个特点）：单一数据源（单一根store），store只读的（响应式缺陷的）、store只能使用reducer纯函数来修改。
// 第3个三（3个概念）：store(数据仓库)、reducer(用于修改store)、action(信号，React组件和store通信的纽带)

// 构建Redux应用：redux、react-redux、redux-thunk、redux-logger、immer、immutable、@reduxjs/toolkit

// 三个简单优化：
// - 1、拆分reducer（拆分多个子store），便于协同开发。
// - 2、使用immer实现state的拷贝，提升Redux工作效率。
// - 3、封装action生成器，把写死的action从业务页面中抽离出来。（注意type的冲突问题）

// 使用redux-logger日志工具（方便redux数据流的调试）



import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import study from './modules/study'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import good from './modules/good'

// 合并子reducer们
const reducer = combineReducers({
  study, app, user, permission,
  good
})

const store = createStore(
  reducer,
  // 对中间件进行合成，注意使用中间件是有顺序要求的！
  compose(
    // redux-thunk这个中间件，在dispatch流程中起作用
    // 捕获dispatch派发过来的“信号”，如果发现这个“信号”是function，就调用它并给它一个实参dispatch
    applyMiddleware(thunk),
    applyMiddleware(logger)
  )
)
// console.log('---store', store)
store.subscribe(()=>{
  console.log('---store变了')
})
export default store
