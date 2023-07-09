<template>
    <div>
          <!-- 搜索栏 -->
          <el-card id="search">
        <el-row>
          <el-col :span="20">
            <el-input
              v-model="searchModel.name"
              placeholder="船名"
              clearable
            ></el-input>
            <el-input
              v-model="searchModel.shiptype"
              placeholder="船舶类型"
              clearable
            ></el-input>
            <el-input
              v-model="searchModel.length"
              placeholder="船舶长度上限"
              clearable
            ></el-input>
            <el-input
              v-model="searchModel.tonnage"
              placeholder="船舶吨位上限"
              clearable
            ></el-input>
            <el-input
              v-model="searchModel.draft"
              placeholder="船舶吃水上限"
              clearable
            ></el-input>
            <el-input
              v-model="searchModel.captainname"
              placeholder="船长姓名"
              clearable
            ></el-input>
            <el-input
              v-model="searchModel.ownername"
              placeholder="船东姓名"
              clearable
            ></el-input>
            <el-select v-model="searchModel.reviewstatus" placeholder="船舶状态">
             <el-option label="全部" value=""></el-option>
             <el-option label="未审核" value="0"></el-option>
             <el-option label="已审核" value="1"></el-option>
             <el-option label="已禁用" value="2"></el-option>
          </el-select>
            <el-button
              @click="getShipList"
              type="primary"
              round
              icon="el-icon-search"
              >查询</el-button
            >
          </el-col>
          <el-col :span="4" align="right">
            <el-button
              @click="openEditUI(null)"
              type="primary"
              icon="el-icon-plus"
              circle
            ></el-button>
          </el-col>
        </el-row>
      </el-card>
      <!-- 结果列表 -->
      <el-card>
        <el-table :data="shipList" border style="width: 100%">
          <el-table-column label="#" width="80">
            <template slot-scope="scope">
              <!-- (pageNum-1) * pageSize + index + 1 -->
              {{
                (searchModel.pageNum - 1) * searchModel.pageSize + scope.$index + 1
              }}
            </template>
          </el-table-column>
          <el-table-column prop="id" label="船舶id" width="150">
          </el-table-column>
          <el-table-column prop="name" label="船名" width="150">
          </el-table-column>
          <el-table-column prop="shiptype" label="船舶类型" width="150">
          </el-table-column>
          <el-table-column prop="length" label="船舶长度" width="150">
          </el-table-column>
          <el-table-column prop="tonnage" label="吨位" width="150">
          </el-table-column>
          <el-table-column prop="draft" label="吃水深度" width="150">
          </el-table-column>
          <el-table-column prop="captainname" label="船长姓名" width="150">
          </el-table-column>
          <el-table-column prop="ownername" label="船东姓名" width="150">
          </el-table-column>
          <el-table-column prop="userid" label="最后修改用户" width="150">
          </el-table-column>
        <el-table-column prop="reviewstatus" label="船舶状态" width="150">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.reviewstatus === 0"
              type="warning"
            >
              未审核
            </el-tag>
            <el-tag
              v-else-if="scope.row.reviewstatus === 1"
              type="success"
            >
              已审核
            </el-tag>
            <el-tag
              v-else-if="scope.row.reviewstatus === 2"
              type="danger"
            >
              已禁用
            </el-tag>
          </template>
        </el-table-column>
          <el-table-column fixed="right" label="操作" width="150"> 
            <template slot-scope="scope">
              <el-button @click="openEditUI(scope.row.id)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
              <el-button @click="deleteShip(scope.row)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchModel.pageNum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="searchModel.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
  
      <!-- 船舶信息编辑对话框 -->
      <el-dialog
        @close="clearForm"
        :title="title"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="shipForm" ref="userFormRef" :rules="rules">
          <el-form-item
            label="船名"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="shipForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="船舶类型" :label-width="formLabelWidth">
            <el-input v-model="shipForm.shiptype" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="船舶长度" :label-width="formLabelWidth">
            <el-input v-model="shipForm.length" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="吃水深度" :label-width="formLabelWidth">
            <el-input v-model="shipForm.draft" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="吨位" :label-width="formLabelWidth">
            <el-input v-model="shipForm.tonnage" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="船长姓名" :label-width="formLabelWidth">
            <el-input v-model="shipForm.captainname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="船东姓名" :label-width="formLabelWidth">
            <el-input v-model="shipForm.ownername" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveShip">确 定</el-button>
        </div>
      </el-dialog>
  
    </div>
  </template>
  
  <script>
  import shipApi from "@/api/usership";
  export default {
    data() {
      return {
        formLabelWidth: "130px",
        shipForm: {},
        dialogFormVisible: false,
        title: "",
        total: 0,
        searchModel: {
          pageNum: 1,
          pageSize: 5,
        },
        shipList: [],
      };
    },
    methods: {
      deleteShip(ship){
        this.$confirm(`您确认删除船舶 ${ship.name} ?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            shipApi.deleteShipById(ship.id).then(response => {
              this.$message({
                type: 'success',
                message: response.message
              });
              this.getShipList();
            });
            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
      saveShip() {
        // 触发表单验证
        this.$refs.userFormRef.validate((valid) => {
          if (valid) {
            // 提交请求给后台
            shipApi.saveShip(this.shipForm).then(response => {
              // 成功提示
              this.$message({
                message: response.message,
                type: 'success'
              });
              // 关闭对话框
              this.dialogFormVisible = false;
              // 刷新表格
              this.getShipList();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
        
      },
      clearForm() {
        this.shipForm = {};
        this.$refs.userFormRef.clearValidate();
      },
      openEditUI(id) {
        if( id == null){
          this.title = "新增船舶";
        }else{
          this.title = "修改船舶";
          // 根据id查询用户数据
          shipApi.getShipById(id).then(response => {
            this.shipForm = response.data;
          });
        }
        this.dialogFormVisible = true;
      },
      handleSizeChange(pageSize) {
        this.searchModel.pageSize = pageSize;
        this.getShipList();
      },
      handleCurrentChange(pageNum) {
        this.searchModel.pageNum = pageNum;
        this.getShipList();
      },
      getShipList() {
        shipApi.getShipList(this.searchModel).then(response => {
          this.shipList = response.data.list;
          this.total = response.data.total;
        });
      },
    },
    created() {
      this.getShipList();
    },
  };
  </script>
  
  <style>
  #search .el-input {
    width: 200px;
    margin-right: 10px;
  }
  .el-dialog .el-input {
    width: 85%;
  }
  </style>