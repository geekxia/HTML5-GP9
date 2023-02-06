import { fetchLogin, fetchUserInfo, fetchGoodCates } from '@/api'

// 同步的action生成器（有点像vuex中的mutations概念）
export function numAdd (payload) {
  return { type: "STUDY_NUM_ADD", payload }
}

export function numSub (payload) {
  return { type: 'STUDY_NUM_SUB', payload }
}

// 切换size
export function toggleSize (size) {
  return { type: 'APP_SIZE', payload: size }
}

// 切换语言
export function toggleLang (lang) {
  return { type: 'APP_LANG', payload: lang }
}

// 切换主题色
export function toggleColor (color) {
  return { type: 'APP_COLOR', payload: color }
}

export function toggleCollapsed (status) {
  return { type: 'APP_COLLAPSED', payload: status }
}


// 异步的action生成器（有点像vuex中的actions概念）
export function login (data) {
  // 返回一个function，最终会被页面dispatch到redux-thunk那里去了
  return function (dispatch) {
    // 像vuex的actions一样地和后端API交互
    fetchLogin(data).then(res=>{
      console.log('---登录成功', res)
      // 调接口（和后端API交互成功后），派发数据到store中去
      if (res.token) {
        dispatch({type: 'USER_LOGIN', payload: res.token})
      }
    })
  }
}

export function getInfo () {
  // 必须得返回一个function，给redux-thunk
  return dispatch => {
    fetchUserInfo().then(res=>{
      // console.log('---用户信息', res)
      const { roles } = res
      if (Array.isArray(roles) && roles.length > 0) {
        dispatch({ type: 'USER_INFO', payload: res })
      }
    })
  }
}

export function resetUser (payload) {
  return { type: 'USER_RESET', payload }
}

export function getAllCates () {
  return dispatch => {
    fetchGoodCates().then(res=>{
      // console.log('---品类', res)
      if (res.list) {
        dispatch({ type: 'GOOD_CATES', payload: res.list })
      }
    })
  }
}
