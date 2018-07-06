<template>
    <div class="app-container">
      <div class="filter-container">
        <!-- 是否禁用 -->
        <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.disabled" placeholder="是否禁用">
          <el-option v-for="item in disabled" :key="item" :label="item == 1 ? '禁用' : '非禁用'" :value="item">
          </el-option>
        </el-select>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
      </div>
  
      <!-- 表格 -->
      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
        style="width: 100%">
        <!-- label就是表格的表头项 -->
        <!-- id -->
        <el-table-column align="center" label="序号" width="65">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <!-- 数量 -->
        <el-table-column width="150px" align="center" label="数量">
          <template slot-scope="scope">
            <span>{{scope.row.number}}</span>
          </template>
        </el-table-column>
        <!-- 金额 -->
        <el-table-column width="110px" align="center" label="金额">
          <template slot-scope="scope">
            <span>{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <!-- 描述 -->
        <el-table-column min-width="150px" align="center" label="描述">
          <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        
        <!-- 是否禁用 -->
        <el-table-column width="110px" align="center" label="是否jinyong">
          <template slot-scope="scope">
            <span style='color:red;'>{{scope.row.disabled == '1' ? '禁用' : '非禁用'}}</span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">
                删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
  
      <!-- 编辑表单 -->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <!-- 数量 -->
          <el-form-item :label="$t('table.number')" prop="number">
              <el-input v-model="temp.number"></el-input>
            </el-form-item>
          <!-- 金额 -->
          <el-form-item label="金额" prop="price">
              <el-input v-model="temp.price"></el-input>
            </el-form-item>
          <!-- 描述 -->
          <el-form-item label="描述" prop="description">
              <el-input v-model="temp.description"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
          <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
        </div>
      </el-dialog>
  
      <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
        <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
          <el-table-column prop="key" label="Channel"> </el-table-column>
          <el-table-column prop="pv" label="Pv"> </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
        </span>
      </el-dialog>
  
    </div>
  </template>
  
  <script>
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  
  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        disabled: [0,1],
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          description: '',
          number: '',
          price: ''
        },
        dialogFormVisible: false, // 表单是否显示
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      //商品列表
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          const data = response.data
          console.log('data: ', data);
          if (data.err_code == 0) {
            this.list = data.data
            this.total = data.total
            this.listLoading = false
          }else {
            console.log(data.err_msg);
          }
          
        })
      },
      //添加商品
      createData() {
        this.$refs['dataForm'].validate((valid) => {
            //表单验证
          if (valid) {//如果验证通过
          // this.temp：数量，金额，描述
            createArticle(this.temp).then((res) => {
                console.log('res: ', res);
                const data = res.data;
                
                if (res.data.err_code == 0) {
                  this.list.unshift(this.temp)
                  this.dialogFormVisible = false
                  this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                  })
                }else {
                  this.$notify({
                  title: '错误',
                  message: data.err_msg,
                  type: 'fail',
                  duration: 2000
                  })
                }
              
            })
          }
        })
      },
      //   编辑/更新商品
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // const tempData = Object.assign({}, this.temp)
            updateArticle(this.temp).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      //删除商品
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
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
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          description: '',
          number: '',
          price: ''
        }
      }
    }
  }
  </script>
  