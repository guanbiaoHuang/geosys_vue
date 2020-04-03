import request from '@/utils/request'

export function getRelations() {
  return request({
    url: '/relation/getRelations',
    method: 'get'
  })
}

export function deleteRelation(data) {
  return request({
    url: '/relation/deleteRelation',
    method: 'delete',
    data
  })
}

export function addRelation(data) {
  console.log(data)
  return request({
    url: '/relation/addRelation',
    method: 'post',
    data
  })
}

export function updateRelation(data) {
  return request({
    url: '/relation/updateRelation',
    method: 'put',
    data
  })
}
