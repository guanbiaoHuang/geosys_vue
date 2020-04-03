<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-table
        :data="roleResource.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="ID" prop="id" />
        <el-table-column label="角色ID" prop="roleId" />
        <el-table-column label="角色名" prop="roleName" />
        <el-table-column label="资源ID" prop="resourceId" />
        <el-table-column label="资源名" prop="resourceName" />
        <el-table-column label="资源位置" prop="resourcePath" />
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
import { getRoleResources, deleteRoleResource } from '@/api/roleResource'

export default {
  data() {
    return {
      roleResource: [],
      search: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleDelete(index) {
      deleteRoleResource({ id: this.roleResource[index].id }).then(response => {
        this.fetchData()
      })
    },
    fetchData() {
      getRoleResources().then(response => {
        this.roleResource = response.data
      })
    }
  }
}
</script>
