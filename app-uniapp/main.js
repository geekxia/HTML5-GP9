import App from './App'
import store from '@/store'
import uView from './uni_modules/vk-uview-ui'

// 确定使用Vue3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(uView)  // 把所有组件都变成全局组件
  return {
    app
  }
}