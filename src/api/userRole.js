import request from '@/utils/request'

export function getUserRoles() {
  return request({
    url: '/userRole/getUserRoles',
    method: 'get'
  })
}

export function deleteUserRole(data) {
  return request({
    url: '/userRole/deleteUserRole',
    method: 'delete',
    data
  })
}

export function addUserRole(data) {
  return request({
    url: '/userRole/addUserRole',
    method: 'post',
    data
  })
}

export function updateUserRole(data) {
  return request({
    url: '/userRole/updateUserRole',
    method: 'put',
    data
  })
}
