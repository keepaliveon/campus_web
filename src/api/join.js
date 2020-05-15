import request from '@/utils/request'

export function list(cid) {
  return request({
    url: '/api/join/' + cid,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/api/join',
    method: 'put',
    data
  })
}

