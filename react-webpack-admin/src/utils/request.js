import axios from 'axios'
import { message } from 'antd'
import Cookies from 'js-cookie'
import store from '@/store'
import { resetUser } from '@/store/actions'

const version = '/api/v1/react'

const instance = axios.create({
  baseURL: BASE_URL + version,
  timeout: 5000,
  headers: {}
})


// Add a request interceptor
instance.interceptors.request.use(config => {
    // 添加鉴权信息
    config.headers.Authorization = Cookies.get('token')
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(response => {
  // 对业务状态码进行判断
  if (response && response.data && response.data.err === 0) {
    return response.data.data
  }
  if (response.data && response.data.err === -1) {
    // 没有Token或Token过期
    store.dispatch(resetUser())
    return message.error(response.data.msg)
  } else {
    return message.error(response.data.msg)
  }
}, error => {
  return Promise.reject(error);
})

export default instance
