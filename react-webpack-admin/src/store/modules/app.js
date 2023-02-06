import produce from 'immer'
import Cookies from 'js-cookie'

// 配合cookie或localStorage做持久化存储
const initState = {
  lang: Cookies.get('lang') || navigator.language.split('-').join('_'),  // 取用户宿主环境的默认语言
  size: Cookies.get('size') || 'middle',
  primaryColor: Cookies.get('color') || '#5300eb',
  collapsed: false,
  tagViews: [],
}

export default (state=initState, {type, payload}) => (
  produce(state, state => {
    switch (type) {
      case 'APP_NUM_ADD':
        console.log('---num add')
        break
      case 'APP_SIZE':
        state.size = payload
        Cookies.set('size', payload)
        break
      case 'APP_LANG':
        state.lang = payload
        Cookies.set('lang', payload)
        break
      case 'APP_COLOR':
        state.primaryColor = payload
        Cookies.set('color', payload)
        break
      case 'APP_COLLAPSED':
        state.collapsed = payload
        break
      default:
    }
  })
)
