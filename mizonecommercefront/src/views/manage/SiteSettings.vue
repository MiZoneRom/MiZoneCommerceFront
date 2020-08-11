<template>
  <el-tabs tab-position="left">
    <el-tab-pane label="系统">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="网站名称">
          <el-input v-model="form.siteName"></el-input>
        </el-form-item>
        <el-form-item label="网站图标">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logo" :src="form.logo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="客服电话">
          <el-input v-model="form.siteName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 64px;
  height: 64px;
  line-height: 64px;
  text-align: center;
}
.avatar {
  width: 64px;
  height: 64px;
  display: block;
}
</style>

<script>
import apiPath from "@/service/apiPath";

export default {
  data() {
    return {
      form: {
        siteName: "",
        logo: "",
      },
      rules: {
        siteName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    let that = this;
    that.$get(apiPath.SITE_SETTINGS).then((response) => {
      that.form = response.data;
    });
  },
  methods: {
    async onSubmit(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formModel = this.$refs[formName].model;
          that
            .$post(apiPath.EDIT_SITE_SETTINGS, formModel, true)
            .then((response) => {
              console.info(response);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>