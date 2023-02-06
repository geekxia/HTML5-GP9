const { defineConfig } = require('@vue/cli-service')
// 这个配置是基于Webpack的，每次修改后都要重启项目才能生效！
module.exports = defineConfig({
  transpileDependencies: true,
  // 本地服务（NodeJS服务器）
  devServer: {
    proxy: {
      // 进行API路由匹配，如果在请求地址中有'/api'字符串，就执行下面这个代理
      '/api': {
        target: 'http://localhost:9999', // 远程服务器
        changeOrigin: true   // 允许改变“源”
      }
    }
  }
})
