<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-table
        :data="relation.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="ID" prop="id" />
        <el-table-column label="地点" prop="name" />
        <el-table-column label="关联地点" prop="targetName" />
        <el-table-column label="详细描述" prop="detailedLocation" />
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
      <el-form ref="newInfo" :model="newRelation" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="地点名称">
              <el-input v-model="newRelation.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联地点名称">
              <el-select v-model="newRelation.targetName" placeholder="请选择地点">
                <el-option
                  v-for="item in targets"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地点详细描述">
          <el-input v-model="newRelation.detailedLocation" type="textarea" />
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
import { getRelations, deleteRelation, updateRelation } from '@/api/relation'
import { getLocationName } from '@/api/map'
export default {
  data() {
    return {
      newRelation: {},
      relation: [],
      search: '',
      centerDialogVisible: false,
      targets: []
    }
  },
  mounted() {
    this.fetchRelations()
  },
  methods: {
    handleDelete(index) {
      deleteRelation({ id: this.relation[index].id }).then(response => {
        this.fetchRelations()
      })
    },
    handleEdit(index) {
      this.centerDialogVisible = true
      getLocationName().then(response => {
        this.targets = response.data
      })
      this.newRelation = this.relation[index]
    },
    fetchRelations() {
      getRelations().then(response => {
        this.relation = response.data
      })
    },
    submitNewInfo() {
      updateRelation(this.newRelation).then(response => {
        location.reload()
      })
    }
  }
}
</script>
