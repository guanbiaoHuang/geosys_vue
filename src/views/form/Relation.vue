<template>
  <div class="app-container">
    <el-card>
      <el-form ref="relation" :model="relation" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="地点名称">
              <el-input v-model="relation.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联地点名称">
              <el-select v-model="relation.targetName" placeholder="请选择地点">
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
          <el-input v-model="relation.detailedLocation" type="textarea" />
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
import { addRelation } from '@/api/relation'
import { getLocationName } from '@/api/map'
export default {
  data() {
    return {
      relation: {
        name: '',
        targetName: '',
        detailedLocation: ''
      },
      targets: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      addRelation(this.relation).then(response => {
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchData() {
      getLocationName().then(response => {
        this.targets = response.data
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

