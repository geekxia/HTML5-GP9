import request from '@/utils/request'

export function fetchCount(amount = 100) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}


export function fetchCnode (params: API.CnodoParams) : any {
  // request<T>是axios要求的泛型！！
  return request<{ data: { data: API.CnodeList, total?: number}}>({
    url: '/topics',
    method: 'GET',
    params
  })
}
