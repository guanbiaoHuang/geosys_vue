<template>
  <div class="app-container">
    <el-card>
      <el-form ref="busInfo" :model="busInfo" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="始发地">
              <el-input v-model="busInfo.source" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目的地">
              <el-input v-model="busInfo.destination" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="停车点">
              <el-select v-model="busInfo.parkLocation" placeholder="请选择地点">
                <el-option
                  v-for="item in busParkLocations"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最大载人数">
              <el-input-number v-model="busInfo.maxPassengers" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发车时间">
              <el-time-select v-model="busInfo.startTime" :picker-options="{ start: '06:30',step: '00:15',end: '22:30' }" placeholder="选择时间" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="班次信息">
          <el-input v-model="busInfo.description" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import { addBusInfo, getBusParkLocation } from '@/api/bus'

export default {
  data() {
    return {
      busInfo: {
        id: 0,
        maxPassengers: 0,
        reserveNumbers: 0,
        source: '',
        destination: '',
        description: '',
        startTime: '',
        parkLocation: ''
      },
      busParkLocations: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      addBusInfo(this.busInfo).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchData() {
      getBusParkLocation().then(response => {
        this.busParkLocations = response.data
      })
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

