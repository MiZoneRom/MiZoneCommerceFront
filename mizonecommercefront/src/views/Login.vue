<template>
  <el-form
    :model="form"
    :rules="hintMsg"
    ref="hintMsg"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="login"
        :loading="logining"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import apiPath from "@/service/apiPath";
import { Message } from "element-ui";
export default {
  data() {
    return {
      logining: false,
      form: {
        username: "",
        password: ""
      },
      hintMsg: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  created() {},
  methods: {
    login() {
      let vm = this;
      if (vm.form.username.trim() == "") {
        Message({
          type: "warning",
          message: "输入的用户名不正确哦",
          duration: 1500
        });
      } else {
        vm.logining = true;
        vm.$get(
          apiPath.LOGIN +
            "?username=" +
            vm.form.username +
            "&password=" +
            vm.form.password
        ).then(data => {

          if (data.success == false) {
            Message({
              type: "warning",
              message: data.msg,
              duration: 1500
            });
            vm.logining = false;
            return;
          }

          sessionStorage.setItem("admin", JSON.stringify(vm.form.username));
          sessionStorage.setItem("token", JSON.stringify(data.data.token));
          sessionStorage.setItem("refreshToken", JSON.stringify(data.data.refreshToken));
          sessionStorage.setItem("expires", JSON.stringify(data.data.expires));
          sessionStorage.setItem("refreshExpires", JSON.stringify(data.data.refreshExpires));
          vm.$router.push({ path: "/" });

        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>