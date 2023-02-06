import request from '@/utils/request'

export function fetchLogin (data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export function fetchUserInfo () {
  return request({
    url: '/user/info',
    method: 'GET',
    params: {}
  })
}


export function fetchGoodCates () {
  return request({
    url: '/good/cates',
    method: 'GET',
    params: {}
  })
}

// 入参：{ name, cate, page, size }
export function fetchGoodList (params) {
  return request({
    url: '/good/list',
    method: 'GET',
    params
  })
}

export function fetchGoodForm (data) {
  return request({
    url: '/good/update',
    method: 'POST',
    data
  })
}

// 删除的入参，是商品_id的拼接（用;拼接）
export function fetchGoodDel (ids) {
  return request({
    url: '/good/delete',
    method: 'POST',
    data: { ids }
  })
}

export function fetchGoodInfo (id) {
  return request({
    url: '/good/info',
    method: 'GET',
    params: { id }
  })
}
