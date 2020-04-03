<template>
  <div class="app-container">
    <el-card shadow="hover">
      <el-row>
        <el-col :span="18">
          <el-input v-model="roleName" placeholder="请输入角色名" />
        </el-col>
        <el-col :span="6" align="right">
          <el-button type="primary" @click="onSubmit">添加角色</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-divider />
    <el-row>
      <el-card shadow="hover">
        <el-table
          :data="role.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column label="角色ID" prop="id" />
          <el-table-column label="角色名" prop="name" />
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
    </el-row>
  </div>
</template>

<script>
import { getRoles, addRole, deleteRole } from '@/api/role'
export default {
  data() {
    return {
      role: [],
      search: '',
      roleName: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleDelete(index) {
      deleteRole({ id: this.role[index].id }).then(response => {
        this.fetchData()
      })
    },
    onSubmit() {
      addRole({ name: this.roleName }).then(response => {
        this.fetchData()
      })
    },
    fetchData() {
      getRoles().then(response => {
        this.role = response.data
      })
    }
  }
}
</script>
