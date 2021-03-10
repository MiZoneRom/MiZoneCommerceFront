<template>
  <v-card flat>
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-tabs-items v-model="tab">
        <v-tab-item key="基本">
          <div class="pa-10">
            <v-text-field
              v-model="form.siteName"
              :rules="nameRules"
              label="站点名称"
              required
              outlined
              dense
            ></v-text-field>

            <v-file-input
              label="站点Logo"
              filled
              outlined
              prepend-icon="mdi-camera"
            ></v-file-input>
          </div>
        </v-tab-item>
        <v-tab-item key="页脚">
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-tab-item>
        <v-tab-item key="SEO">
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-tab-item>
        <v-tab-item key="注册">
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-tab-item>
      </v-tabs-items>
    </v-form>

    <v-fab-transition>
      <v-btn color="pink" dark absolute bottom right fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
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
      form: {
        siteName: "",
      },
      tab: null,
      items: ["基本", "页脚", "SEO", "注册"],
    };
  },
  created() {
    let vm = this;
    vm.axios.get(apiPath.SITE_SETTINGS).then((response) => {
      vm.form = response.data.data;
      console.info(vm.form);
    });
  },
  methods: {},
};
</script>