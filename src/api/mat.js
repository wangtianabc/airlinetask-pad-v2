import request from '@/utils/request'

export function fetchListByPN(query) {
  return request({
    url: '/mat/getMatListByPN',
    method: 'get',
    params: query
  })
}
