import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router.ts';

const app = createApp(App)
const pinia = createPinia()

function SecretPiniaPlugin(context) {
  console.log('----Pinai插件', context)
  return { secret: 'the cake is a lie' }
}
pinia.use(SecretPiniaPlugin)  // 使用Pinia插件

app.use(router)  // 注册路由系统
app.use(pinia)  // 注册状态管理


// app.config.globalProperties.url = 'http://localhost:9999'
// app.provide('api', 'http://localhost:9090')

app.mount('#app')
