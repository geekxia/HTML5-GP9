// import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

// 这个项目把Token保存在cookie中
// 从cookie中取出''Admin-Token'字段
export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('token')
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem('token', token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return localStorage.removeItem('token')
}
