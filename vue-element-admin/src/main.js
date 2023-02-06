import Vue from 'vue'

import Cookies from 'js-cookie'
// 用于重置HTML标签在浏览器中默认样式
import 'normalize.css/normalize.css'

// 引用并全局注册ElementUI组件库
import Element from 'element-ui'
import './styles/element-variables.scss'
// 全局样式
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// 国际化
import i18n from './lang' // internationalization
// 引入并注册全局的icon图标
import './icons' // icon

// 路由守卫（鉴权流程、权限设计）
import './permission' // 添加路由守卫钩子
// 前端日志
import './utils/error-log' // error log

// 引入并注册全局过滤器
import * as filters from './filters' // global filters

import perDir from '@/directive/permission'
Vue.use(perDir)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 在production环境中启动MockJS服务
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin({
  methods: {
    checkStatus (status) {
      let result = ''
      if (status === 0) result = '待审核'
      if (status === 1) result = '审核已通过'
      if (status === -1) result = '已驳回'
      return result
    },
    // 用于向socket服务器发消息
    sendMsg (channel, data) {
      window.socket.emit(channel, data)
    }
  }
})

// API接口地址
Vue.prototype.$api = 'http://10.36.138.42:9090'
// 图片访问地址
Vue.prototype.$img = 'http://10.36.138.42:9999'
// socket地址
Vue.prototype.$io = 'ws://10.36.138.42:8888'

Vue.config.productionTip = false

// 根组件实例化
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
