<template>
  <div class="app-container">
    <el-card shadow="hover">
      <el-form ref="resource" :model="resource" label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="资源名称">
              <el-input v-model="resource.name" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="资源路径">
              <el-input v-model="resource.path" />
            </el-form-item>
          </el-col>
          <el-col :span="4" align="right">
            <el-button type="primary" @click="onSubmit">添加资源</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-divider />
    <el-card shadow="hover">
      <el-table
        :data="resources.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="资源ID" prop="id" />
        <el-table-column label="资源名" prop="name" />
        <el-table-column label="资源路径" prop="path" />
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getResources, addResource, deleteResource } from '@/api/resource'

export default {
  data() {
    return {
      resources: [
      ],
      search: '',
      resource: {
        name: '',
        path: ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleDelete(index) {
      deleteResource({ id: this.resources[index].id }).then(
        this.fetchData
      )
    },
    onSubmit() {
      addResource(this.resource).then(response => {
        this.fetchData()
      })
    },
    fetchData() {
      getResources().then(response => {
        this.resources = response.data
      })
    }
  }
}
</script>
