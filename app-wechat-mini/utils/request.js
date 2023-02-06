// 部署上线时，改成生产环境的接口地址，并在小程序后台添加开发设置
const baseURL = 'https://cnodejs.org'
const version = '/api/v1'

function fetch (url, method, data) {
  return new Promise((resolve, reject)=>{
    wx.request({
      url: baseURL + version + url,
      method,
      data,
      headers: {
        'X-Token': wx.getStorageSync('token')
      },
      success: res => {
        // 数据过滤
        if (res.data.success) {
          resolve(res.data.data)
        }        
      },
      fail: err => {
        wx.showToast({
          title: '网络异常',
        })
        reject(err)
      }
    })
  })
}

module.exports = fetch