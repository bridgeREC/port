<template>
  <div>
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input
            v-model="searchModel.title"
            placeholder="公告标题"
            clearable
          ></el-input>
          <el-input
            v-model="searchModel.author"
            placeholder="发布人"
            clearable
          ></el-input>
          <el-button
            @click="getAnnouncementList"
            type="primary"
            round
            icon="el-icon-search"
            >查询
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 结果列表 -->
    <el-card>
      <el-table :data="announcementList" border style="width: 100%">
        <el-table-column label="#" width="80">
          <template slot-scope="scope">
            <!-- (pageNum-1) * pageSize + index + 1 -->
            {{
              (searchModel.pageNum - 1) * searchModel.pageSize + scope.$index + 1
            }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="公告id" width="150"></el-table-column>
        <el-table-column prop="title" label="公告标题" width="150"></el-table-column>
        <el-table-column prop="content" label="公告内容" width="500"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="190"></el-table-column>
        <el-table-column prop="author" label="发布人" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150"> 
          <template slot-scope="scope">
            <el-button @click="openEditUI(scope.row.id)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>          </template>
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
      <el-form :model="announcementForm" ref="announcementFormRef" :rules="rules">
        <el-form-item
          label="公告标题"
          prop="title"
          :label-width="formLabelWidth"
        >
        <el-input v-model="announcementForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" :label-width="formLabelWidth">
          <el-input v-model="announcementForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input v-model="announcementForm.createtime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布人" :label-width="formLabelWidth">
          <el-input v-model="announcementForm.author" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import announcementApi from "@/api/announcement";
export default {
  data() {
    return {
      formLabelWidth: "130px",
      announcementForm: {},
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        pageNum: 1,
        pageSize: 5,
      },
      announcementList: [],
    };
  },
  methods: {
    clearForm() {
      this.announcementForm = {};
      this.$refs.announcementFormRef.clearValidate();
    },
    openEditUI(id) {
        this.title = "查询公告";
        // 根据id查询公告数据
        announcementApi.getAnnouncementById(id).then(response => {
          this.announcementForm = response.data;
        });
      this.dialogFormVisible = true;
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getAnnouncementList();
    },
    handleCurrentChange(pageNum) {
      this.searchModel.pageNum = pageNum;
      this.getAnnouncementList();
    },
    getAnnouncementList() {
      announcementApi.getAnnouncementList(this.searchModel).then(response => {
        this.announcementList = response.data.list;
        this.total = response.data.total;
      });
    },
  },
  created() {
    this.getAnnouncementList();
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