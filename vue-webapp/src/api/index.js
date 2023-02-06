import request from '@/utils/request'

// page=1  size=10  cate=''
export function fetchGoodList (params={}) {
  return request({
    url: '/good/list',
    method: 'GET',
    params
  })
}

// 获取所有一级品类
export function fetchCates () {
  return request({
    url: '/good/cates',
    method: 'GET',
    params: {}
  })
}

// 根据id获取商品详情数据  params = { id }
export function fetchGoodInfo (id) {
  return request({
    url: '/good/info',
    method: 'GET',  // axios中GET请求，用params属性入参
    params: { id }
  })
}

// 登录接口  username, password
export function fetchLogin (data) {
  return request({
    url: '/user/login',
    method: 'POST',  // axios中POST请求，用data属性入参
    data
  })
}

// 注册接口  username, password
export function fetchRegist (data) {
  return request({
    url: '/user/regist',
    method: 'POST',
    data
  })
}

// 获取用户信息接口
export function fetchUserInfo () {
  return request({
    url: '/user/info',
    method: 'GET',
    params: {}
  })
}

// 获取购物车列表接口（鉴权）
export function fetchCartList () {
  return request({
    url: '/cart/list',
    method: 'GET',
    params: {}
  })
}

// 添加购物车  { good_id, num }
export function fetchCartAdd (data) {
  return request({
    url: '/cart/add',
    method: 'POST',
    data
  })
}

// 购物车页面删除一条记录  { cart_id }
export function fetchCartDel (cart_id) {
  return request({
    url: '/cart/delete',
    method: 'GET',
    params: { cart_id }
  })
}

// 修改购物车记录的数量 { cart_id, new_num }
export function fetchCartUpd (params) {
  return request({
    url: '/cart/update',
    method: 'GET',
    params
  })
}

// 提交购物车 { ids }  多个购物车id由;拼接而成的字符串
export function fetchCartSub (ids) {
  return request({
    url: '/cart/submit',
    method: 'POST',
    data: { ids }
  })
}

// 一次性抛出
export default {
  fetchGoodList,
  fetchCates,
  fetchGoodInfo,
  fetchLogin,
  fetchRegist,
  fetchCartList,
  fetchUserInfo,
  fetchCartAdd,
  fetchCartDel,
  fetchCartUpd,
  fetchCartSub
}
