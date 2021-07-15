<template>
  <el-menu
    :default-active="$route.path"
    class="navgation"
    @open="handleOpen"
    @close="handleClose"
    background-color="#f9f9f9"
    :router="true"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <template #title>首页</template>
    </el-menu-item>

    <el-submenu
      v-for="item in menuData"
      v-bind:key="item.path"
      :index="item.path"
    >
      <template #title>
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </template>
      <el-menu-item
        v-for="sub in item.children"
        v-bind:key="sub.path"
        :index="item.path + '/' + sub.path"
      >
        <!-- <template #title>{{ sub.meta.title }}</template> -->
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.navgation {
  height: 100%;
}
</style>

<script>
import { router } from "@/router";
export default {
  data() {
    return {
      menuData: [],
    };
  },
  created() {
    this.menuData = this.$router.getRoutes();
  },
};
</script>
<style>
.el-menu {
  border-right: none;
}
</style>