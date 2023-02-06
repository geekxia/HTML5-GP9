import request from '@/utils/request'

// 调接口只用关注三件事儿：url是多少、请求方法、入参有哪些。

// { username, password }
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取用户信息（用Token换取用户信息）Token怎么传给后端？
export function getInfo() {
  return request({
    url: '/userinfo',
    method: 'get',
    params: {}
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
