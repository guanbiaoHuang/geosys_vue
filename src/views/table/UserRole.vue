<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-table
        :data="userRole.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="ID" prop="id" />
        <el-table-column label="用户ID" prop="userId" />
        <el-table-column label="用户名" prop="userName" />
        <el-table-column label="角色ID" prop="roleId" />
        <el-table-column label="角色名" prop="roleName" />
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
import { getUserRoles, deleteUserRole } from '@/api/userRole'

export default {
  data() {
    return {
      userRole: [],
      search: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleDelete(index) {
      deleteUserRole({ id: this.userRole[index].id }).then(response => {
      })
    },
    fetchData() {
      getUserRoles().then(response => {
        this.userRole = response.data
      })
    }
  }
}
</script>
