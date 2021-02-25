<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-sheet color="white" elevation="5" size="3">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="用户名"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="密码"
              required
            ></v-text-field>

            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || '你必须同意才能继续']"
              label="同意协议"
              required
            ></v-checkbox>

            <v-btn
              :disabled="!valid || logining"
              color="success"
              class="mr-4"
              @click="validate"
            >
              <v-progress-circular
                v-if="logining"
                :size="20"
                indeterminate
                color="primary"
              ></v-progress-circular>
              登录
            </v-btn>
          </v-form>
        </v-sheet>
      </v-container>
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import apiPath from "@/service/apiPath";

export default {
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "请输入用户名密码",
        (v) => (v && v.length <= 10) || "用户名必须少于10个字符",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "密码是必须的",
        (v) => (v && v.length <= 20) || "密码必须少于20个字符",
      ],
      select: null,
      checkbox: false,
      logining: false,
    };
  },
  created() {},
  methods: {
    validate() {
      let vm = this;

      //验证表单
      var validateResult = this.$refs.form.validate();

      //如果没有验证通过
      if (!validateResult) return;

      vm.logining = true;

      vm.axios
        .get(
          apiPath.LOGIN + "?username=" + vm.name + "&password=" + vm.password
        )
        .then((data) => {
          if (data.success == false) {
            this.$dialog.notify.info(data.msg, {
              position: "top-right",
              timeout: 5000,
            });
            vm.logining = false;
            return;
          }

          sessionStorage.setItem("admin", JSON.stringify(vm.name));
          sessionStorage.setItem("token", JSON.stringify(data.data.token));
          sessionStorage.setItem(
            "refreshToken",
            JSON.stringify(data.data.refreshToken)
          );
          sessionStorage.setItem("expires", JSON.stringify(data.data.expires));
          sessionStorage.setItem(
            "refreshExpires",
            JSON.stringify(data.data.refreshExpires)
          );
          vm.$router.push({ path: "/" });
        });
    },
  },
};
</script>