import request from '@/utils/request'

export function getRoleResources() {
  return request({
    url: '/roleResource/getRoleResources',
    method: 'get'
  })
}

export function deleteRoleResource(data) {
  return request({
    url: '/roleResource/deleteRoleResource',
    method: 'delete',
    data
  })
}

export function addRoleResource(data) {
  return request({
    url: '/roleResource/addRoleResource',
    method: 'post',
    data
  })
}

export function updateRoleResource(data) {
  return request({
    url: '/roleResource/updateRoleResource',
    method: 'put',
    data
  })
}
