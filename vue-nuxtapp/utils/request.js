import axios from 'axios'

const baseURL = 'https://cnodejs.org'
const version = '/api/v1'

// 创建axios实例
const instance = axios.create({
  baseURL: baseURL + version,  // 服务器地址
  timeout: 5000,     // 指定超时时间
  headers: {}        //  公共请求头的配置
})

// 给实例对象添加请求拦截器（请求被浏览器发送出去之前）
instance.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// 给实例对象添加响应拦截器（当浏览器收到响应数据之后）
instance.interceptors.response.use(response => {
  if (response && response.data.success) {
    return response.data.data
  }
  return response
}, error => {
  // 常识：如果代码运行到这里了，说明HTTP状态码一定是非200
  return Promise.reject(error)
})

// 抛出axios实例
export default instance
