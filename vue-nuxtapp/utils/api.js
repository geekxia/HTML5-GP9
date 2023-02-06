import request from './request'

export function fetchList (params) {
  return request({
    url: '/topics',
    method: 'GET',
    params
  })
}
