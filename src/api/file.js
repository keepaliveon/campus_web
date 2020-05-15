import request from '@/utils/request'

export function delImg(name) {
  return request({
    url: '/api/oss/',
    method: 'get',
    params: { file: name }
  })
}

export function delCommunityImg(id, file) {
  return request({
    url: '/api/community/delimg/' + id + '/' + file,
    method: 'get'
  })
}
