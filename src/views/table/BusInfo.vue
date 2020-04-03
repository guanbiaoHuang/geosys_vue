<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-table
        :data="busInfo.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="ID" prop="id" />
        <el-table-column label="最大载客" prop="maxPassengers" />
        <el-table-column label="出发地" prop="source" />
        <el-table-column label="目的地" prop="destination" />
        <el-table-column label="停车点" prop="parkLocation" />
        <el-table-column label="开车时间" prop="startTime" />
        <el-table-column label="描述" prop="description" />
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="更新" :visible.sync="centerDialogVisible" width="45%" center>
      <el-form ref="newInfo" :model="newInfo" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="始发地">
              <el-input v-model="newInfo.source" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目的地">
              <el-input v-model="newInfo.destination" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="停车点">
          <el-select v-model="newInfo.parkLocation" placeholder="请选择地点">
            <el-option
              v-for="item in busParkLocations"
              :key="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="最大载人数">
          <el-input-number v-model="newInfo.maxPassengers" />
        </el-form-item>
        <el-form-item label="发车时间">
          <el-time-select v-model="newInfo.startTime" :picker-options="{ start: '06:30',step: '00:15',end: '22:30' }" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="班次信息">
          <el-input v-model="newInfo.description" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewInfo">更 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBusInfo, deleteBusInfo, getBusParkLocation, updateBusInfo } from '@/api/bus'

export default {
  data() {
    return {
      busInfo: [],
      search: '',
      centerDialogVisible: false,
      newInfo: {},
      busParkLocations: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleDelete(index) {
      deleteBusInfo({ id: this.busInfo[index].id }).then(response => {
      })
    },
    handleEdit(index) {
      getBusParkLocation().then(response => {
        this.busParkLocations = response.data
      })
      this.centerDialogVisible = true
      this.newInfo = this.busInfo[index]
    },
    fetchData() {
      getBusInfo().then(response => {
        this.busInfo = response.data
      })
    },
    submitNewInfo() {
      this.centerDialogVisible = false
      updateBusInfo(this.newInfo).then(response => {
        location.reload()
      })
    }
  }
}
</script>
