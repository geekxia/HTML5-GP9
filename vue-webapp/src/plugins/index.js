
import { TabBar, NaviBar, NotData } from '@/components'
import { Lazyload } from 'vant'
import api from '@/api'
import store from '@/store'
import router from '@/router'

export default {
  install (Vue) {
    Vue.component('TabBar', TabBar)
    Vue.component('NaviBar', NaviBar)
    Vue.component('NotData', NotData)
    Vue.use(Lazyload)
    // 把一些全局的或者重要的方法放在原型上
    Vue.prototype.$api = api
    // 自定义鉴权指令
    Vue.directive('login', el => {
      // 当用户未登录时
      if (!store.getters['user/isLogin']) {
        el.style.position = 'relative'
        let layer = document.createElement('div')
        layer.style.position = 'absolute'
        layer.style.top = 0
        layer.style.bottom = 0
        layer.style.left = 0
        layer.style.right = 0
        layer.style.zIndex = 9999
        layer.addEventListener('click', ()=>{
          router.push('/login?path='+(location.path.slice(1)))
        })
        el.appendChild(layer)
      }
      // console.log('---el', el)
    })
  }
}
