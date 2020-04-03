<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-table
        :data="user.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="用户ID" prop="id" />
        <el-table-column label="用户名" prop="name" />
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
  import {getUsers, deleteUser} from "../../api/user";

  export default {
  data() {
    return {
      user: [],
      search: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleDelete(index) {
      deleteUser({ id: this.user[index].id }).then(response => {
        this.fetchData()
      })
    },
    fetchData() {
      getUsers().then(response => {
        this.user = response.data
      })
    }
  }
}
</script>
