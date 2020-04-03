<template>
  <div class="app-container">
    <el-card>
      <div id="map" />
    </el-card>
    <el-divider />
    <el-card>
      <el-form :inline="true" :model="directionInfo" class="demo-form-inline">
        <el-form-item label="出发地">
          <el-input v-model="directionInfo.source" placeholder="请输入出发地" />
        </el-form-item>
        <el-form-item label="终点">
          <el-input v-model="directionInfo.target" placeholder="请输入终点" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="direct">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet/dist/leaflet'
import { getMapLayers, getMapDirections } from '@/api/map'
export default {
  name: 'Map',
  data() {
    return {
      directionInfo: {
        source: '',
        target: ''
      },
      guidingPath: {
      },
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
      })
    },
    direct() {
      getMapDirections(this.directionInfo).then(response => {
        if (this.guidingPath != null) {
          this.map.removeLayer(this.guidingPath)
        }
        this.guidingPath = L.geoJSON(
          response.data,
          {
            style: { 'fillColor': '#00CD00', 'lineJoin': 'round', 'opacity': 1 }}).addTo(this.map)
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
