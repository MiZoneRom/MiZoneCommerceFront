<template>
  <el-container class="container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <span>登录</span>
        </div>
      </template>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        class="login-form"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="form.userName"
            autocomplete="off"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit-btn"
            @click="submitForm('form')"
            :loading="form.logining"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    padding: 40px 50px 50px;
    .login-form {
      .submit-btn {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>

<script>
export default {
  name: "Home",
  data: () => {
    //用户名验证
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    //密码验证
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      form: {
        userName: "",
        password: "",
        logining: false,
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  components: {},
  async created() {
    let vm = this;
  },
  methods: {
    //提交表单
    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$store.dispatch("Login", vm);
        } else {
          return false;
        }
      });
    },
  },
};
</script>
