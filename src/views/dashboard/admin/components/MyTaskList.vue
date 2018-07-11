<template>
  <div>
    <div class="table-list">
      <el-table :data="tableData" border fit stripe highlight-current-row current-row-key="id" v-loading="loading" :element-loading-text="$t('task.loading')" style="width: 100%" @expand-change="expandRow" @row-click="rowClick">
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
              <el-table-column :label="$t('task.flightno')" width="120" header-align="center" align="left" >
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
              <el-table-column :label="$t('task.operate')" width="150" header-align="center">
                  <template slot-scope="scope">
                      <el-button size="mini" v-if="((scope.row.status === 'UnAccept' || scope.row.status === 'On-Work') && scope.row.thirdParty) || scope.row.thirdParty === false" :disabled="scope.row.status !== 'UnAccept'"
                              @click="handleAction(scope.$index, scope.row, 'Accept')">接收</el-button>
                      <el-button size="mini" v-if="scope.row.thirdParty && scope.row.status === 'Accept'"
                              @click="handleAction(scope.$index, scope.row, 'On-Spot')">到位</el-button>
                      <el-button size="mini" v-if="scope.row.thirdParty && scope.row.status === 'On-Spot'"
                              @click="handleAction(scope.$index, scope.row, 'On-Work')">开工</el-button>
                      <el-button size="mini" type="primary"
                              @click="handleAction(scope.$index, scope.row, 'Finished')">完成</el-button>
                  </template>
              </el-table-column>
          </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!--选择任务类型-->
    <el-dialog :title="$t('task.typeselect')" :visible.sync="dialogVisible" width="20%">
      <el-select v-model="selectdValue" :placeholder="$t('task.select')" style="width: 100%">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('task.cancel')}}</el-button>
        <el-button type="primary" @click="afterSelect">{{$t('task.ok')}}</el-button>
      </span>
    </el-dialog>
    <!--任务操作/反馈-->
    <el-dialog :title="$t('task.feedback')" :visible.sync="dialogItemVisible" width="70%">
      <el-table :data="itemList" v-loading="itemsLoading" border fit stripe highlight-current-row current-row-key="id" class="table-list">
        <el-table-column header-align="center" property="jcNumber" :label="$t('task.jcnumber')" width="120"></el-table-column>
        <el-table-column header-align="center" property="jcType" :label="$t('task.jctype')" width="120"></el-table-column>
        <el-table-column header-align="center" property="jcStatus" :label="$t('task.jcstatus')" width="120"></el-table-column>
        <el-table-column header-align="center" property="jcDesc" :label="$t('task.jcdesc')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :label="$t('task.operate')" width="150" header-align="center">
                  <template slot-scope="scope">
                      <el-button size="mini" v-if="scope.row.jcStatus === 'UnAccept'"
                              @click="handleAction(scope.$index, scope.row, 'Accept')">接收</el-button>
                      <el-button size="mini" v-if="scope.row.jcStatus === 'Accept'"
                              @click="handleAction(scope.$index, scope.row, 'On-Spot')">到位</el-button>
                      <el-button size="mini" v-if="scope.row.jcStatus === 'On-Spot' || scope.row.jcStatus === 'On-Work'" :disabled="scope.row.jcStatus === 'On-Work'"
                              @click="handleAction(scope.$index, scope.row, 'On-Work')">开工</el-button>
                      <el-button size="mini" type="primary" v-if="scope.row.jcStatus !== 'Finished'"
                              @click="handleAction(scope.$index, scope.row, 'Finished')">完成</el-button>
                  </template>
              </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogItemVisible = false">{{$t('task.close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchMyTaskList, fetchTaskItems } from '@/api/task'
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      itemList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        state: '',
        sort: '+id'
      },
      dialogVisible: false,
      dialogItemVisible: false,
      itemsLoading: false,
      options: [{
        value: '机械员',
        label: '机械员'
      }, {
        value: '勤务人员',
        label: '勤务人员'
      }, {
        value: '放行人员',
        label: '放行人员'
      }],
      selectdValue: '',
      currentRow: {}
    }
  },
  created() {
    this.getList()
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
    getListByState(val) {
      this.listQuery.state = val
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    expandRow(row, expandedRows) {
      row.stateRemark = '张三 2018-08-08 接收 | 李四 2018-08-09 开工'
    },
    rowClick(row, event, column) {
      // 一二方的才有具体条目
      if (!row.thirdParty) {
        this.dialogItemVisible = true
        this.itemsLoading = true
        fetchTaskItems({ taskid: 'taskid' }).then(response => {
          this.itemList = response.data.items
          this.itemsLoading = false
        })
      }
    },
    handleAction(index, row, state) {
      switch (state) {
        case 'Accept':
          this.dialogVisible = true
          this.currentRow = row
          break
        case 'On-Spot':
        case 'On-Work':
        case 'Finished':
      }
    },
    afterSelect() {
      this.currentRow.status = 'Accept'
      this.dialogVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-table-expand {
  font-size: 0;
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  label {
    width: 90px;
    color: #99a9bf;
  }
}
</style>
