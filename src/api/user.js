import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    params: data
  })
}

export function info() {
  return request({
    url: '/api/auth/info',
    method: 'get'
  })
}
