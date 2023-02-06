import { request } from 'umi'

// request('URL路径', {method: 'GET', params: {}, headers:{}})

export function fetchCnode (params) {
  return request(
    `${BASE_URL}/api/v1/topics`,
    {
      method: 'GET',
      params
    }
  )
}
