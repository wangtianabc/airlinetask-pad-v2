<template>
  <div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('task.flightno')" v-model="listQuery.flightNo">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('task.acreg')" v-model="listQuery.acReg">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <div class="table-list">
      <el-table :data="tableData" border fit stripe highlight-current-row current-row-key="id" v-loading="loading" :element-loading-text="$t('task.loading')" style="width: 100%">
              <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="task-table-expand">
                        <el-form-item :label="$t('task.actype')">
                          <span>{{ props.row.acType }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('task.releaser')">
                          <span>{{ props.row.release }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('task.mechinaist')">
                          <span>{{ props.row.mechinaist }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('task.service')">
                          <span>{{ props.row.service }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('task.statedesc')">
                          <span>{{ props.row.stateRemark }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('task.state')">
                          <span>{{ props.row.taskState }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
              </el-table-column>
              <el-table-column :label="$t('task.flightno')" width="120" header-align="center" align="left">
                  <template slot-scope="scope">
                      <svg-icon icon-class="plane" class-name="icon-font"/>
                      <span v-if="!scope.row.thirdParty" style="margin-left: 5px; color: #36a3f7">{{ scope.row.flightNo }}</span>
                      <span v-else style="margin-left: 5px">{{ scope.row.flightNo }}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="acReg" :label="$t('task.acreg')" width="120" header-align="center">
              </el-table-column>
              <el-table-column prop="taskType" :label="$t('task.tasktype')" width="120" header-align="center">
              </el-table-column>
              <el-table-column prop="arriveTime" :label="$t('task.arrivetime')" width="120" header-align="center">
              </el-table-column>
              <el-table-column prop="leaveTime" :label="$t('task.leavetime')" width="120" header-align="center">
              </el-table-column>
              <el-table-column prop="remark" :label="$t('task.remark')" header-align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column :label="$t('task.operate')" width="80" header-align="center">
                  <template slot-scope="scope">
                      <el-button size="mini" type="primary"
                              @click="handleAction(scope.$index, scope.row, 'Claim')">领取</el-button>
                  </template>
              </el-table-column>
          </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 任务领取 -->
    <el-dialog :title="$t('task.claim')" :visible.sync="dialogItemVisible" width="70%">
      <el-table ref="multipleTable" :data="itemList" v-loading="itemsLoading" border fit stripe highlight-current-row current-row-key="id" class="table-list" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column header-align="center" property="jcNumber" :label="$t('task.jcnumber')" width="120"></el-table-column>
        <el-table-column header-align="center" property="jcType" :label="$t('task.jctype')" width="120"></el-table-column>
        <el-table-column header-align="center" property="jcStatus" :label="$t('task.jcstatus')" width="120"></el-table-column>
        <el-table-column header-align="center" property="jcDesc" :label="$t('task.jcdesc')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :label="$t('task.operate')" width="80" header-align="center">
                  <template slot-scope="scope">
                      <el-button size="mini" type="primary"
                              @click="handleAction(scope.$index, scope.row, 'Claim')">领取</el-button>
                  </template>
              </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection(itemList)">{{$t('task.selectall')}}</el-button>
        <el-button @click="toggleSelection()">{{$t('task.unselectall')}}</el-button>
        <el-button type="primary" @click="claim()">{{$t('task.claim')}}</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogItemVisible = false">{{$t('task.close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchMyTaskList, fetchTaskItems } from '@/api/task'
import waves from '@/directive/waves' // 水波纹指令
export default {
  directives: {
    waves
  },
  data() {
    return {
      loading: false,
      itemsLoading: false,
      tableData: [],
      itemList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        flightNo: '',
        acReg: '',
        sort: '+id'
      },
      dialogItemVisible: false,
      multipleSelection: []
    }
  },
  methods: {
    getList() {
      this.loading = true
      fetchMyTaskList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleAction(index, row, state) {
      if (row.thirdParty) {
        this.$message('任务已领取')
      } else {
        this.dialogItemVisible = true
        this.itemsLoading = true
        fetchTaskItems({ taskid: row.id }).then(response => {
          this.itemList = response.data.items
          this.itemsLoading = false
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    claim() {
      this.$message('任务领取成功')
    }
  }
}
</script>

<style scoped>
.task-table-expand {
    font-size: 0;
}
.task-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.task-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
