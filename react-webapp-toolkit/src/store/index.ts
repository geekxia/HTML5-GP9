import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import counter from './slices/counter';
import article from './slices/article';

// 创建store实例
const store = configureStore({
  // 合并子reducer（合并子store）相当于combineReducers()
  reducer: {
    counter, article
  },
  // 使用中间件，相当于applyMiddleware()/compose()
  // 在@reduxjs/toolkit已有中间件的基础上，添加额外的其它中间件
  // 常识：@reduxjs/toolkit背后已经安装thunk这个中间件了！！！
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

// 抛出几个自定义类型！！
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
