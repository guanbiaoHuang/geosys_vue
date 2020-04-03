import request from '@/utils/request'

export function getMapLayers(params) {
  return request({
    url: '/map/getLayers',
    method: 'get',
    params
  })
}

export function deleteLastAddedLayers() {
  return request({
    url: '/map/deleteLastAddedLayers',
    method: 'delete'
  })
}

export function getLocationName() {
  return request({
    url: '/map/getLocationName',
    method: 'get'
  })
}

export function addMapLayers(data) {
  return request({
    url: '/map/addLayer',
    method: 'post',
    data
  })
}

export function getMapDirections(data) {
  return request({
    url: '/map/direction',
    method: 'post',
    data
  })
}
