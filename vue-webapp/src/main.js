import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'  // 样式文件

// 注册一下我们自己的插件
import Plugin from '@/plugins'
Vue.use(Plugin)

Vue.use(Vant)  // 一次性全局注册

Vue.config.productionTip = false

Vue.prototype.$img = 'http://localhost:9999'
// Vue.prototype.$api = 'http://localhost:8080'

new Vue({
  render: h => h(App),  // 把App组件挂载渲染到#app上
  router, // 挂载路由系统
  store,  // 挂载状态容器
}).$mount('#app')
