import request from './request'

export function fetchCnode (params={}) {
  return request({
    url: '/api/v1/topics',
    method: 'GET',
    params
  })
}
