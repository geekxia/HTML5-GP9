import produce from 'immer'
import Cookies from 'js-cookie'

// 配合cookie或localStorage做持久化存储
const initState = {
  token: Cookies.get('token'),
  roles: [],   // 后端给的用户角色信息
  name: '',
  avatar: '',
  introduction: ''
}

export default (state=initState, {type, payload}) => (
  produce(state, state => {
    switch (type) {
      case 'USER_LOGIN':
        // console.log('我是user子store，我收到了token', payload)
        state.token = payload
        Cookies.set('token', payload)  // 存储到cookie中
        break
      case 'USER_INFO':
        const { roles, name, avatar, introduction } = payload
        state.roles = roles
        state.name = name
        state.avatar = avatar
        state.introduction = introduction
        break
      case 'USER_RESET':
        Cookies.remove('token')
        state.token = null
        state.roles = []
      default:
    }
  })
)
