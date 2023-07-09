<template>
  <div>
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input
            v-model="searchModel.shipid"
            placeholder="船舶ID"
            clearable
          ></el-input>
          <el-input
            v-model="searchModel.operatorid"
            placeholder="操作员ID"
            clearable
          ></el-input>
          <el-select v-model="searchModel.clearancetype" placeholder="放行类型">
             <el-option label="全部" value=""></el-option>
             <el-option label="未放行" value="0"></el-option>
             <el-option label="入港放行" value="1"></el-option>
             <el-option label="出港放行" value="2"></el-option>
             <el-option label="入港申请" value="3"></el-option>
             <el-option label="出港申请" value="4"></el-option>
          </el-select>
          <el-button
            @click="getReleaseList"
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
      <el-table :data="releaseList" border style="width: 100%">
        <el-table-column label="#" width="80">
          <template slot-scope="scope">
            <!-- (pageNum-1) * pageSize + index + 1 -->
            {{
              (searchModel.pageNum - 1) * searchModel.pageSize + scope.$index + 1
            }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="放行id" width="150"></el-table-column>
        <el-table-column prop="shipid" label="船舶id" width="150"></el-table-column>
        <el-table-column prop="operatorid" label="操作员ID" width="150"></el-table-column>
        <el-table-column prop="releasetime" label="放行时间" width="190"></el-table-column>
        <el-table-column prop="clearancetype" label="放行类型" width="150">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.clearancetype === 0"
              type="danger"
            >
              未放行
            </el-tag>
            <el-tag
              v-else-if="scope.row.clearancetype === 1"
              type="success"
            >
              入港放行
            </el-tag>
            <el-tag
              v-else-if="scope.row.clearancetype === 2"
              type="info"
            >
              出港放行
            </el-tag>
            <el-tag
              v-else-if="scope.row.clearancetype === 3"
              type="warning"
            >
              入港申请
            </el-tag>
            <el-tag
              v-else-if="scope.row.clearancetype === 4"
              type="primary"
            >
              出港申请
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="clearanceremark" label="放行备注" width="150"></el-table-column>
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

        <!-- 用户信息编辑对话框 -->
    <el-dialog
      @close="clearForm"
      :title="title"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="releaseForm" ref="releaseFormRef" :rules="rules">
        <el-form-item
          label="船舶ID"
          prop="shipid"
          :label-width="formLabelWidth"
        >
          <el-input v-model="releaseForm.shipid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="放行时间" :label-width="formLabelWidth">
          <el-input v-model="releaseForm.releasetime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="放行状态" :label-width="formLabelWidth">
          <el-select v-model="releaseForm.clearancetype" placeholder="请选择申述状态">
             <el-option label="未放行" value="0"></el-option>
             <el-option label="入港放行" value="1"></el-option>
             <el-option label="出港放行" value="2"></el-option>
             <el-option label="入港申请" value="3"></el-option>
             <el-option label="出港申请" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="放行备注" :label-width="formLabelWidth">
          <el-input v-model="releaseForm.clearanceremark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRelease">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import releaseApi from "@/api/release";
export default {
  data() {
    return {
      formLabelWidth: "130px",
      releaseForm: {},
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        pageNum: 1,
        pageSize: 5,
      },
      releaseList: [],
    };
  },
  methods: {
    saveRelease() {
      // 触发表单验证
      this.$refs.releaseFormRef.validate((valid) => {
        if (valid) {
          // 提交请求给后台
          releaseApi.saveRelease(this.releaseForm).then(response => {
            // 成功提示
            this.$message({
              message: response.message,
              type: 'success'
            });
            // 关闭对话框
            this.dialogFormVisible = false;
            // 刷新表格
            this.getReleaseList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clearForm() {
      this.releaseForm = {};
      this.$refs.releaseFormRef.clearValidate();
    },
    openEditUI(id) {
      if( id == null){
        this.title = "新增放行";
      }else{
        this.title = "修改放行";
        // 根据id查询船舶数据
        releaseApi.getReleaseById(id).then(response => {
          this.releaseForm = response.data;
        });
      }
      this.dialogFormVisible = true;
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getReleaseList();
    },
    handleCurrentChange(pageNum) {
      this.searchModel.pageNum = pageNum;
      this.getReleaseList();
    },
    getReleaseList() {
      releaseApi.getReleaseList(this.searchModel).then(response => {
        this.releaseList = response.data.list;
        this.total = response.data.total;
      });
    },
  },
  created() {
    this.getReleaseList();
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