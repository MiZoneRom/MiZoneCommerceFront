<template>
  <v-row class="pa-4" justify="space-between">
    <v-col cols="4" class="align-stretch">
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
        <template v-slot:append="{ item }">
          <v-btn icon>
            <v-icon @click="createNewNav(item.id, $event)">mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-treeview>
    </v-col>

    <v-divider vertical></v-divider>

    <v-col class="d-flex text-center">
      <v-scroll-x-transition mode="out-in">
        <div
          v-if="!selectedNav"
          class="title grey--text text--lighten-1 font-weight-light"
        >
          选择一个导航
        </div>
        <v-card v-else :key="selectedNav.id" class="mx-auto pa-5" flat>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="selectedNav.parentId"
                  :items="sortNavs"
                  label="父级导航"
                  item-value="id"
                  item-text="name"
                  prepend-inner-icon="mdi-map"
                >
                  <template v-slot:append-item>
                    <v-divider class="mb-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedNav.name"
                  :counter="10"
                  :rules="nameRules"
                  label="名称"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedNav.subTitle"
                  :rules="nameRules"
                  label="副标题"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedNav.icon"
                  label="图标"
                ></v-text-field
              ></v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedNav.component"
                  label="组件"
                ></v-text-field
              ></v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedNav.path"
                  label="地址"
                ></v-text-field
              ></v-col>
            </v-row>

            <v-row>
              <v-col cols="6"> </v-col>
              <v-col cols="6"> </v-col>
            </v-row>

            <v-row>
              <v-col cols="6"> </v-col>
              <v-col cols="6"> </v-col>
            </v-row>

            <v-text-field
              v-model="selectedNav.sortId"
              label="排序"
              required
              type="number"
            ></v-text-field>

            <v-textarea label="简介" v-model="selectedNav.remark"></v-textarea>
            <v-fab-transition>
              <v-btn
                v-show="valid"
                :disabled="!valid || loading"
                color="pink"
                dark
                absolute
                bottom
                right
                fab
                @click="submitNav"
              >
                <v-icon v-if="!selectedNav.id">mdi-plus</v-icon>
                <v-icon v-if="selectedNav.id">mdi-content-save</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-form>
        </v-card>
      </v-scroll-x-transition>
    </v-col>
  </v-row>
</template>
<script>
import apiPath from "@/service/apiPath";

export default {
  data: () => ({
    valid: true,
    active: [],
    open: [],
    navs: [],
    sortNavs: [],
    selectedNav: null,
    edit: false,
    loading: false,
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
        if (this.active.length <= 0) {
          this.selectedNav = null;
          return;
        }
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
      var sortNavs = await this.axios.get(apiPath.NAVIGATION_SORT_LIST, {
        id: 0,
      });
      this.sortNavs = sortNavs.data.data;
      this.sortNavs.unshift({ id: 0, name: "一级导航" });
      return navData.data.data;
    },
    async submitNav() {
      this.$refs.form.validate();
      var result = null;
      this.loading = true;
      if (this.selectedNav.id) {
        result = await this.axios.put(
          apiPath.NAVIGATION + this.selectedNav.id,
          this.selectedNav
        );
      } else {
        result = this.axios.post(apiPath.NAVIGATION, this.selectedNav);
      }
      this.loading = false;
      this.$dialog.message.info(result.data.msg, {
        position: "bottom-center",
        timeout: 5000,
      });
    },
    createNewNav(id, event) {
      if (event) event.cancelBubble = true;
      var newNavData = { parentId: id, name: "新导航" };
      this.selectedNav = newNavData;
    },
  },
};
</script>
<style scoped>
.mx-auto {
  width: 100%;
}
</style>