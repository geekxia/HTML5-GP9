import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 集成vant(3)组件库
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'

// Vite官方配置文件（Vue3配置文件，默认语法是ES6语法）
// 特点：不仅可以使用ES6语法，还可以使用NodeJS内置API
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // 
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  // 解构配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    // 省略后缀
    extentions: ['.js', '.ts', '.vue']
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://cnodejs.org',
        changeOrigin: true
      }
    }
  }
})
