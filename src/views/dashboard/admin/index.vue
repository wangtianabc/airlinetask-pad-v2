<template>
  <div class="dashboard-editor-container">
    <el-tabs v-model="activeTab" @tab-click="handleClick" type="border-card">
      <el-tab-pane :label="$t('task.mytask')" name="mytask">
        <panel-group :un-accept="unAccept" :accept="accept" :on-spot="onSpot" :on-work="onWork" :finished="finished" @handleSelectState="handleSelectState"></panel-group>
        <el-row>
          <my-task-list ref="mytasklist" :list="tableData"></my-task-list>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="$t('task.alltask')" name="alltask">
        <el-row>
          <all-task-list ref="alltasklist"></all-task-list>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import MyTaskList from './components/MyTaskList'
import AllTaskList from './components/AllTaskList'
import { fetchMyTask } from '@/api/task'

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    MyTaskList,
    AllTaskList
  },
  data() {
    return {
      unAccept: 0,
      accept: 0,
      onSpot: 0,
      onWork: 0,
      finished: 0,
      tableData: [],
      activeTab: 'mytask'
    }
  },
  created() {
    this.getMyTask()
  },
  methods: {
    handleSelectState(type) {
      this.$refs.mytasklist.getListByState(type)
    },
    getMyTask() {
      fetchMyTask().then(response => {
        this.unAccept = response.data.unAccept
        this.accept = response.data.accept
        this.onSpot = response.data.onSpot
        this.onWork = response.data.onWork
        this.finished = response.data.finished
      })
    },
    handleClick(val) {
      if (val.name === 'alltask') {
        if (this.$refs.alltasklist.tableData.length === 0) {
          this.$refs.alltasklist.getList()
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: #fff;
}
</style>
