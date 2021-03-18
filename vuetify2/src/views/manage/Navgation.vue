<template>
  <v-card class="ma-4">
    <v-row class="pa-4" justify="space-between">
      <v-col cols="2">
        <v-treeview
          :active.sync="active"
          :items="navs"
          :load-children="fetchNavs"
          :open.sync="open"
          activatable
          transition
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            <v-icon v-if="!item.icon">mdi-folder-network</v-icon>
          </template>
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selectedNav"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center"
          >
            选择一个导航
          </div>
          <v-card v-else :key="selectedNav.id" class="mx-auto" flat>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="selectedNav.name"
                :counter="10"
                :rules="nameRules"
                label="名称"
                required
              ></v-text-field>

              <v-text-field
                v-model="selectedNav.subTitle"
                :rules="nameRules"
                label="副标题"
                required
              ></v-text-field>

              <v-text-field
                v-model="selectedNav.icon"
                label="图标"
              ></v-text-field>

              <v-text-field
                v-model="selectedNav.component"
                label="组件"
              ></v-text-field>

              <v-text-field
                v-model="selectedNav.path"
                label="地址"
              ></v-text-field>

              <v-text-field
                v-model="selectedNav.sortId"
                label="排序"
                required
                type="number"
              ></v-text-field>

              <v-textarea label="简介" v-model="selectedNav.desc"></v-textarea>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="submitNav"
              >
                保存
              </v-btn>
            </v-form>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>

    <v-fab-transition>
      <v-btn v-show="!edit" color="pink" dark absolute bottom right fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>
<script>
import apiPath from "@/service/apiPath";

export default {
  data: () => ({
    valid: true,
    active: [],
    open: [],
    navs: [],
    selectedNav: null,
    edit: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
  }),
  async created() {
    var navData = await this.axios.get(apiPath.NAVIGATION_TREELIST);
    var navList = navData.data.data;
    this.filterTreeList(navList);
    this.navs = navList;
  },
  computed: {
    selected() {
      if (!this.active.length) return undefined;
      const id = this.active[0];
      return this.navs.find((nav) => nav.id === id);
    },
  },
  watch: {
    open: {
      deep: true,
      async handler() {},
    },
    active: {
      deep: true,
      async handler() {
        if (this.active.length <= 0) return;
        var navData = await this.getNavData(this.active[0]);
        this.selectedNav = navData;
      },
    },
  },
  methods: {
    async fetchNavs(item) {
      this.$delete(item, "children");
      item.children.push(item);
    },
    //处理导航列表
    filterTreeList(item) {
      item.forEach((element) => {
        if (element.children.length <= 0) {
          this.$delete(element, "children");
        } else {
          this.filterTreeList(element.children);
        }
      });
    },
    async getNavData(id) {
      var navData = await this.axios.get(apiPath.NAVIGATION + "?id=" + id);
      return navData.data.data;
    },
    submitNav() {
      this.$refs.form.validate();
    },
  },
};
</script>