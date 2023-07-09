<template>
  <div>
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input
            v-model="searchModel.shipid"
            placeholder="申述船舶ID"
            clearable
          ></el-input>
          <el-input
            v-model="searchModel.userid"
            placeholder="申述用户id"
            clearable
          ></el-input>
          <el-select v-model="searchModel.status" placeholder="请选择申述状态">
             <el-option label="全部" value=""></el-option>
             <el-option label="未处理" value="0"></el-option>
             <el-option label="已处理" value="1"></el-option>
             <el-option label="已驳回" value="2"></el-option>
          </el-select>
          <el-button
            @click="getAppealsList"
            type="primary"
            round
            icon="el-icon-search"
            >查询
          </el-button>
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
      <el-table :data="appealsList" border style="width: 100%">
        <el-table-column label="#" width="80">
          <template slot-scope="scope">
            <!-- (pageNum-1) * pageSize + index + 1 -->
            {{
              (searchModel.pageNum - 1) * searchModel.pageSize + scope.$index + 1
            }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="申述ID" width="80"></el-table-column>
        <el-table-column prop="userid" label="申述用户ID" width="100"></el-table-column>
        <el-table-column prop="shipid" label="申述船舶ID" width="100"></el-table-column>
        <el-table-column prop="content" label="申述内容" width="300"></el-table-column>
        <el-table-column prop="status" label="申述状态" width="150">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status === 0"
              type="warning"
            >
              未处理
            </el-tag>
            <el-tag
              v-else-if="scope.row.status === 1"
              type="success"
            >
              已处理
            </el-tag>
            <el-tag
              v-else-if="scope.row.status === 2"
              type="danger"
            >
              已驳回
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdat" label="创建时间" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150"> 
          <template slot-scope="scope">
            <el-button @click="openEditUI(scope.row.id)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
            <el-button @click="deleteAppeals(scope.row)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
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

    <!-- 信息编辑对话框 -->
    <el-dialog
      @close="clearForm"
      :title="title"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="appealsForm" ref="appealsFormRef" :rules="rules">
        <el-form-item
          label="申述ID"
          prop="id"
          :label-width="formLabelWidth"
        >
          <el-input v-model="appealsForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申述船舶id" :label-width="formLabelWidth">
          <el-input v-model="appealsForm.shipid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申述用户id" :label-width="formLabelWidth">
          <el-input v-model="appealsForm.userid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申述内容" :label-width="formLabelWidth">
          <el-input v-model="appealsForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申述状态" :label-width="formLabelWidth">
          <el-select v-model="appealsForm.status" placeholder="请选择申述状态">
             <el-option label="未处理" value="0"></el-option>
             <el-option label="已处理" value="1"></el-option>
             <el-option label="已驳回" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input v-model="appealsForm.createdat" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAppeals">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import appealsApi from "@/api/appeals";
export default {
  data() {
    return {
      formLabelWidth: "130px",
      appealsForm: {},
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        pageNum: 1,
        pageSize: 5,
      },
      appealsList: [],
    };
  },
  methods: {
    deleteAppeals(appeals){
      this.$confirm(`您确认删除申述 ${appeals.id} ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          appealsApi.deleteAppealsById(appeals.id).then(response => {
            this.$message({
              type: 'success',
              message: response.message
            });
            this.getAppealsList();
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    saveAppeals() {
      // 触发表单验证
      this.$refs.appealsFormRef.validate((valid) => {
        if (valid) {
          // 提交请求给后台
          appealsApi.saveAppeals(this.appealsForm).then(response => {
            // 成功提示
            this.$message({
              message: response.message,
              type: 'success'
            });
            // 关闭对话框
            this.dialogFormVisible = false;
            // 刷新表格
            this.getAppealsList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clearForm() {
      this.appealsForm = {};
      this.$refs.appealsFormRef.clearValidate();
    },
    openEditUI(id) {
      if( id == null){
        this.title = "新增放行";
      }else{
        this.title = "修改放行";
        // 根据id查询船舶数据
        appealsApi.getAppealsById(id).then(response => {
          this.appealsForm = response.data;
        });
      }
      this.dialogFormVisible = true;
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getAppealsList();
    },
    handleCurrentChange(pageNum) {
      this.searchModel.pageNum = pageNum;
      this.getAppealsList();
    },
    getAppealsList() {
      appealsApi.getAppealsList(this.searchModel).then(response => {
        this.appealsList = response.data.list;
        this.total = response.data.total;
      });
    },
  },
  created() {
    this.getAppealsList();
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