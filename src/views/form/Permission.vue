<template>
  <div class="app-container">
    <el-card shadow="hover">
      <el-form ref="userRole" :model="userRole" label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="用户ID">
              <el-input v-model="userRole.userId" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="角色ID">
              <el-select v-model="userRole.roleId" placeholder="请选择">
                <el-option v-for="item in roles" :key="item.id" :value="item.id">
                  <span style="float: left">{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="submitUserRole">添加</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-divider />
    <el-card shadow="hover">
      <el-form ref="roleResource" :model="roleResource" label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="角色ID">
              <el-select v-model="roleResource.roleId" placeholder="请选择">
                <el-option v-for="item in roles" :key="item.id" :value="item.id">
                  <span style="float: left">{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="资源ID">
              <el-select v-model="roleResource.resourceId" placeholder="请选择">
                <el-option v-for="item in resources" :key="item.id" :value="item.id">
                  <span style="float: left">{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="submitRoleResource">添加</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getResources } from '@/api/resource'
import { getRoles } from '@/api/role'
import { addUserRole } from '@/api/userRole'
import { addRoleResource } from '@/api/roleResource'

export default {
  data() {
    return {
      roles: [],
      resources: [],
      userRole: {
        userId: '',
        roleId: 0
      },
      roleResource: {
        roleId: 0,
        resourceId: 0
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    onCancel() {
    },
    submitUserRole() {
      addUserRole(this.userRole).then(response => {
      })
    },
    submitRoleResource() {
      addRoleResource(this.roleResource).then(response => {
      })
    },
    fetchData() {
      getResources().then(response => {
        this.resources = response.data
      })
      getRoles().then(response => {
        this.roles = response.data
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

