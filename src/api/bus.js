import request from '@/utils/request'

export function getBusInfo() {
  return request({
    url: '/bus/getBusInfo',
    method: 'get'
  })
}

export function getBusParkLocation() {
  return request({
    url: '/bus/getBusParkLocation',
    method: 'get'
  })
}

export function deleteBusInfo(data) {
  return request({
    url: '/bus/deleteBusInfo',
    method: 'delete',
    data
  })
}

export function addBusInfo(data) {
  return request({
    url: '/bus/addBusInfo',
    method: 'post',
    data
  })
}

export function updateBusInfo(data) {
  return request({
    url: '/bus/updateBusInfo',
    method: 'put',
    data
  })
}
