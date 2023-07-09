<template>
    <div class="register-container">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-position="left" label-width="120px" class="register-form">
        <el-form-item label="账号" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="password">
          <el-input v-model="registerForm.userphone"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="password">
          <el-input v-model="registerForm.realname"></el-input>
        </el-form-item>
        <el-form-item label="所属船舶" prop="password">
          <el-input v-model="registerForm.usership"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
        <p class="tips">
        <router-link to="/login">已有帐号？立即登录</router-link>
        </p>
      </el-form>
    </div>
  </template>
  
  <script>
  import userApi from "@/api/userManage";
  export default {
    name: 'Register',
    data() {
      return {
        registerForm: {
          username: '',
          password: '',
          confirmPassword: '',
        },
        registerRules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }],
          confirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' },
                            {validator: (rule, value, callback) => {
                                if (value === '') {
                                   callback(new Error('请再次输入密码'))
                               } else if (value !== this.registerForm.password) {
                                   callback(new Error('两次输入密码不一致'))
                               } else {
                                   callback()
                               }
                          },
                    trigger: 'blur'
             }],
        }
      };
    },
    methods: {
      register() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            userApi.addUser(this.registerForm).then(response => {
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
  