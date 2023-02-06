
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCnode } from '@/api'
import { ConfigItem } from '@babel/core';
import { stat } from 'fs';


export interface ArticleState {
  // list: API.CnodeList,
  list: Array<API.CnodeItem>,
  flag: 0 | 1 | 2
}

const initialState: ArticleState = {
  list: [],   // 文章列表
  flag: 0

};

// 调用cnode接口的action方法
export const getList = createAsyncThunk(
  'article/getList',
  // 这个方法的参数，就是调接口所需要的入参（payload）
  async (params: API.CnodoParams) => {
    const list: any[] = await fetchCnode(params)
    return list
  }
);

// 定义子store
export const slice = createSlice({

  name: 'article',
  // 初始化状态
  initialState,
  reducers: {
    toggleFlag (state, action) {
      console.log('----toggle action', action)
      state.flag = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.fulfilled, (state, { payload, type } :any) => {
        console.log('---action type', type)
        if (state.flag === 0) {
          state.list = payload
        }
        if (state.flag === 1) {
          state.list = payload
        }
        if (state.flag === 2) {
          state.list = [...state.list, ...payload]
        }
      })
  },
})

// 意思是把slice中同步的action方法抛出去
export const { toggleFlag } = slice.actions

// 抛出子reducer，用于在根store进行合并！
export default slice.reducer
