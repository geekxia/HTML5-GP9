import axios from 'axios'


const version = '/api/v1'

// console.log('----env', process.env)

const instance = axios.create({
  baseURL: process.env.BASE_URL + version,
  timeout: 5000,
  headers: {}
})


// Add a request interceptor
instance.interceptors.request.use(config => {
    // 添加鉴权信息
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(response => {
  
  return response.data.data
}, error => {
  return Promise.reject(error);
})

export default instance
