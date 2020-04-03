<template>
  <div class="app-container">
    <el-card>
      <el-row>
        <el-col :span="12">
          <el-select v-model="type.type" placeholder="请选择">
            <el-option v-for="item in layerType" :key="item" :value="item" :label="item" />
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-upload ref="upload" class="upload-demo" action="http://localhost:8011/map/impLayersByGeoStr" :file-list="fileList" :auto-upload="false" :data="type" multiple>
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <el-button style="margin-left: 10px;" size="small" type="danger" @click="deleteLastLayer">删除上次添加图层</el-button>
          </el-upload>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { deleteLastAddedLayers } from '@/api/map'
export default {
  name: 'MapFileUpload',
  data() {
    return {
      type: { type: '' },
      layerType: ['Buildings', 'Lands', 'Lakes', 'Locations', 'Roads'],
      fileList: []
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    deleteLastLayer() {
      deleteLastAddedLayers().then(response => {
      })
    }
  }
}
</script>

<style scoped>

</style>
