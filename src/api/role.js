import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/role/getRoles',
    method: 'get'
  })
}

export function deleteRole(data) {
  return request({
    url: '/role/deleteRole',
    method: 'delete',
    data
  })
}

export function addRole(data) {
  console.log(data)
  return request({
    url: '/role/addRole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role/updateRole',
    method: 'put',
    data
  })
}
