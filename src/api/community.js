import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/api/community',
    method: 'post',
    data
  })
}

export function current() {
  return request({
    url: '/api/community/current',
    method: 'get'
  })
}

export function list() {
  return request({
    url: '/api/community',
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: '/api/community/' + id,
    method: 'delete'
  })
}

export function find(id) {
  return request({
    url: '/api/community/' + id,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/api/community',
    method: 'put',
    data
  })
}

export function imgList(id) {
  return request({
    url: '/api/community/img/' + id,
    method: 'get'
  })
}
