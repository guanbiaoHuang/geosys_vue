<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="layer" class="demo-form-inline">
        <el-form-item label="绘制类型">
          <el-select v-model="layer.type" placeholder="请选择绘制类型" default-first-option>
            <el-option v-for="item in layerType" :key="item" :value="item" :label="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="图层名称">
          <el-input v-model="layer.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item v-if="layer.type === 'Road'" label="道路级别">
          <el-input v-model="layer.level" placeholder="请输入道路级别" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLayer">添加图层</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleteLastLayer">删除上次添加图层</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-divider />
    <el-card>
      <div id="map" />
    </el-card>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet/dist/leaflet'
import { getMapLayers, addMapLayers, deleteLastAddedLayers } from '@/api/map'
export default {
  name: 'Map',
  data() {
    return {
      layer: {
        type: 'Road',
        name: '',
        level: '',
        geom: ''
      },
      line: {},
      layerType: ['Building', 'Land', 'Lake', 'Location', 'Road'],
      points: [],
      buildings: {
      },
      roads: {
      },
      lands: {
      },
      lakes: {
      }
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      getMapLayers().then(response => {
        this.map = L.map('map')
        this.map.setView([28.684290, 115.938494], 17)
        this.buildings = response.data.buildings
        this.roads = response.data.roads
        this.lands = response.data.lands
        this.lakes = response.data.lakes
        L.geoJSON(
          this.lakes,
          {
            style: { 'fillColor': '#377eb8', 'lineJoin': 'round', 'fillOpacity': 1, 'weight': 0 }}).addTo(this.map)
        L.geoJSON(
          this.lands,
          {
            style: { 'fillColor': '#4daf4a', 'lineJoin': 'round', 'fillOpacity': 1, 'weight': 0 }}).addTo(this.map)
        L.geoJSON(
          this.buildings,
          {
            style: { 'fillColor': '#f1f1f1', 'lineJoin': 'round', 'fillOpacity': 1, 'weight': 0 }}).addTo(this.map)
        L.geoJSON(
          this.roads,
          {
            style: { 'color': '#ffffff', 'lineJoin': 'round', 'Opacity': 1, 'weight': 2 }}).addTo(this.map)
        this.line = L.polyline([])
        this.map.on('click', e => {
          this.points.push([e.latlng.lat, e.latlng.lng])
        })
        this.map.on('mousemove', e => {
          if (this.points.length > 0) {
            const point = [this.points[this.points.length - 1], [e.latlng.lat, e.latlng.lng]]
            this.line.setLatLngs(point)
            this.map.addLayer(this.line)
          }
        })
        this.map.on('contextmenu', e => {
          this.map.off('mousemove')
          this.drawer()
        })
      })
    },
    drawer() {
      switch (this.layer.type) {
        case 'Road':
          var road = L.polyline(this.points, {
            style: { 'color': '#ffffff', 'lineJoin': 'round', 'Opacity': 1, 'weight': 2 }}).addTo(this.map)
          this.layer.geom = JSON.stringify(road.toGeoJSON().geometry)
          break
        case 'Building':
          var building = L.polygon(this.points, {
            style: { 'fillColor': '#f1f1f1', 'lineJoin': 'round', 'fillOpacity': 1, 'weight': 0 }}).addTo(this.map)
          this.layer.geom = JSON.stringify(building.toGeoJSON().geometry)
          break
        case 'Land':
          var land = L.polygon(this.points, {
            style: { 'fillColor': '#4daf4a', 'lineJoin': 'round', 'fillOpacity': 1, 'weight': 0 }}).addTo(this.map)
          this.layer.geom = JSON.stringify(land.toGeoJSON().geometry)
          break
        case 'Lake':
          var lake = L.polygon(this.points, {
            style: { 'fillColor': '#377eb8', 'lineJoin': 'round', 'fillOpacity': 1, 'weight': 0 }}).addTo(this.map)
          this.layer.geom = JSON.stringify(lake.toGeoJSON().geometry)
          break
        case 'Location':
          var location = L.Circle(this.points[0]).add(this.map)
          this.layer.geom = JSON.stringify(location.toGeoJSON().geometry)
          break
        default :
          break
      }
      this.points = []
    },
    submitLayer() {
      addMapLayers(this.layer).then(response => {
        location.reload()
      })
    },
    deleteLastLayer() {
      deleteLastAddedLayers().then(response => {
        location.reload()
      })
    }
  }
}

</script>

<style scoped>
  #map{height: 650px;}
  .ol-attribution,
  .ol-zoom { display: none;}
</style>
