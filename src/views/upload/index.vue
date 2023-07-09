<!-- <template>
  <div id="index">
    <div class="container">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:9999/upload"
        :data="uplist"
        multiple
        :file-list="fileList"
        :on-success="fileSuccess"
        :on-error	="fileFail"
        :on-change="handleChange"
        :auto-upload="false"
      >
        <el-button style="margin-top:1em" slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;margin-top:1em;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip" style="color:red;font-size:1.7em;">只能上传不能超过500MB</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList:[],
      uplist:{},
      itemList: [
      ]
    };
  },
  mounted(){
    
  },
  methods: {
    handleChange(file, fileList){
      this.uplist = {
        file:fileList,
        username:'mikasa'
      }
    },
    fileSuccess(response,file,fileList){
        console.log(response)
        console.log(response.regEX);
        if(!response.regEX){
          this.$msgbox({
              title: "提示",
              message: "正则校验失败",
              type: "error"
            });
        }
    },
    fileFail(err,file,fileList){
        console.log(err)
    },
    submitUpload(){
        this.$refs.upload.submit();
    },
    
  }
};
</script>

<style lang="less" scoped>
</style> -->