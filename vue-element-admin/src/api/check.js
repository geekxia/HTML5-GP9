import request from '@/utils/request'


// 查询商品审核列表 { page, size, check } check = 0/1/-1
export function fetchGoodCheckList (params) {
  return request({
    url: '/check/good/list',
    method: 'GET',
    params
  })
}

// 商品审核 { good_id, check, content }
export function fetchCheckGood (data) {
  return request({
    url: '/check/good',
    method: 'POST',
    data,
  })
}
