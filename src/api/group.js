import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/api/group',
    method: 'post',
    data
  })
}

export function list() {
  return request({
    url: '/api/group',
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: '/api/group/' + id,
    method: 'delete'
  })
}

export function find(id) {
  return request({
    url: '/api/group/' + id,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/api/group',
    method: 'put',
    data
  })
}
