<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-position="left" label-width="120px" class="register-form">
      <el-form-item label="申述内容" prop="content">
        <el-input v-model="registerForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import appealApi from "@/api/appeals";
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        status: '',
      },
      registerRules: {
        status: [{ required: true, message: '请输入申述内容', trigger: 'blur' }],
      }
    };
  },
  methods: {
    register() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          appealApi.addAppeals(this.registerForm).then(response => {
          // 成功提示
          this.$message({
            message: response.message,
            type: 'success'
          });
        });
      } else {
          this.$message({
            message: response.message,
            type: 'fail'
          })
        console.log("error submit!!");
        return false;
      }
    });
  }
}}
</script>
