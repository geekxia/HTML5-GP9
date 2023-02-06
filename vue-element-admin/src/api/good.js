import request from '@/utils/request'

// 入参：{ name, cate, page, size, min_price, max_price }
export function fetchGoodList (params) {
  return request({
    url: '/good/list',
    method: 'GET',
    params
  })
}


// 获取所有品类
export function fetchCates () {
  return request({
    url: '/cate/all',
    method: 'GET',
    params: {}
  })
}

// 商品新增或编辑 { name, desc, img, price, cate, hot, id }
export function fetchGoodSubmit (data) {
  return request({
    url: '/good/update',
    method: 'POST',
    data
  })
}

// 获取商品详情 { id }
export function fetchGoodInfo (id) {
  return request({
    url: '/good/info',
    method: 'GET',
    params: { id }
  })
}

// 删除商品  { ids }  如果批量删除，多个id用;拼接。
export function fetchGoodDel (ids) {
  return request({
    url: '/good/del',
    method: 'POST',
    data: { ids }
  })
}
