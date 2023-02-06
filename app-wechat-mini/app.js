// 入口文件
App({
  onLaunch () {
    // 登录（这是真正的小程序登录）
    wx.login({
      success: res => {
        console.log('---code', res.code)
        // wx.request()
        // 收到Token，存储到Storage中
      }
    })
    console.log('---项目启动')
    // 在小程序中，不能使用localStorage
    // 用这种方式做本地存储
    wx.setStorageSync('qf', '千锋教育')

    // 弹出“位置授权框”（唯一的一个可以自动弹出的授权框）
    // 获取当前用户对当前小程序的授权情况
    wx.getSetting({
      withSubscriptions: true,
      success: res => {
        console.log('---授权列表', res)
        if (!res.authSetting['scope.userLocation']) {
          // 如果用户没有授权过位置信息，就弹出位置授权请求
          // 弹出后，无论用户拒绝，还是同意，这个授权框只会弹出一次！
          wx.authorize({
            scope: 'scope.userLocation',
          })
        }

      }
    })
  },
  // 全局数据（没有响应式，相当于Web中的window）
  globalData: {
    userinfo: {
      name: '张三'
    }
  }
})
