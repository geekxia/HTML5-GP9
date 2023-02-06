
import axios from 'axios'
// import { Toast } from 'vant'
// import store from '@/store'
// import router from '@/router'

// 这个8080服务器就是本地开发环境中的NodeJS服务器
const baseURL = 'http://localhost:5173'
const version = '/api/v1/vant'

// 创建axios实例
const instance = axios.create({
  // baseURL: baseURL + version,  // 服务器地址
  baseURL: 'http://localhost:5173',
  timeout: 5000,     // 指定超时时间
  headers: {}        //  公共请求头的配置
})

// 给实例对象添加请求拦截器（请求被浏览器发送出去之前）
instance.interceptors.request.use(config => {
  console.log('---请求拦截', config)
  // 在请求被发送出去之前做一些事（添加鉴权信息Token）
  config.headers.Authorization = localStorage.getItem('token')
  // 添加一些额外的Headers请求头
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// 给实例对象添加响应拦截器（当浏览器收到响应数据之后）
instance.interceptors.response.use(response => {
  // console.log('---响应拦截', response)
  // 常识：如果代码运行到这里了，说明HTTP状态码一定等于200
  // 一般在这里根据后端“业务状态码”进行判断，识别业务是否正确，并进行捕获！
  // 在这里，还会对response进行处理过滤，把有用的数据返回给前端应用。
  if (response.data && response.data.err===0) {
    return response.data.data // 数据过滤
  } else if (response.data.err === -1) {
    // 当业务状态码为 -1，说明Token是假的，或者说明Token过期
    // store.commit('user/resetUser')
    if (!response.config.url === '/user/info') {
      // router.push('/login?path='+(location.path.slice(1)))
    }
  }

  // 匹配cnode
  if (response.data.success) {
    return response.data.data
  }


  return response
}, error => {
  // 常识：如果代码运行到这里了，说明HTTP状态码一定是非200
  return Promise.reject(error)
})

// 抛出axios实例
export default instance
