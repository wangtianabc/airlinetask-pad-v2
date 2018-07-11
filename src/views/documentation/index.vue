<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" :placeholder="$t('mat.partno')" v-model="listQuery.partno">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <div class="table-list">
      <el-table :data="tableData" border stripe highlight-current-row current-row-key="id" v-loading="listLoading" :element-loading-text="$t('task.loading')" style="width: 100%">
            <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="task-table-expand">
                        <el-form-item :label="$t('mat.provider')">
                            <span>{{ props.row.vendor }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('mat.location')">
                            <span>{{ props.row.location }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('mat.batchno')">
                            <span>{{ props.row.batch_no }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('mat.plant')">
                            <span>{{ props.row.plant }}</span>
                        </el-form-item>
                        </el-form>
                    </template>
            </el-table-column>
            <el-table-column :label="$t('mat.partno')" width="180" header-align="center" align="left">
                <template slot-scope="scope">
                    <svg-icon icon-class="component" class-name="icon-font"/>
                    <span class="icon-diy" style="margin-left: 5px">{{ scope.row.material_no }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="serial_no" :label="$t('mat.serialno')" width="160" header-align="center">
            </el-table-column>
            <el-table-column prop="qty_stock" :label="$t('mat.qty')" width="130" header-align="center">
            </el-table-column>
            <el-table-column prop="unit" :label="$t('mat.unit')" width="100"  header-align="center">
            </el-table-column>
             <el-table-column prop="material_desc" :label="$t('mat.desc')" header-align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column :label="$t('task.operate')" width="85" header-align="center">
                <template slot-scope="scope">
                    <el-button size="mini"
                            @click="handleAction(scope.$index, scope.row)">{{$t('mat.reserve')}}</el-button>
                </template>
            </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { fetchListByPN } from '@/api/mat'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      tableData: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        partno: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchListByPN(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
