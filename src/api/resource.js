import request from '@/utils/request'

export function getResources() {
  return request({
    url: '/resource/getResources',
    method: 'get'
  })
}

export function deleteResource(data) {
  return request({
    url: '/resource/deleteResource',
    method: 'delete',
    data
  })
}

export function addResource(data) {
  return request({
    url: '/resource/addResource',
    method: 'post',
    data
  })
}

export function updateResource(data) {
  return request({
    url: '/resource/updateResource',
    method: 'put',
    data
  })
}
