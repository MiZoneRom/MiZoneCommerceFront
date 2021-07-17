<template>
  <el-menu
    :default-active="$route.path"
    class="navgation"
    @open="handleOpen"
    @close="handleClose"
    background-color="#f9f9f9"
    :router="true"
  >

    <el-submenu
      v-for="item in navigationList"
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
        <template #title>{{ sub.name }}</template>
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
export default {
  data() {
    return {
      navigationList: [],
    };
  },
  created() {
    this.navigationList = global.RouterList;
  },
};
</script>
<style>
.el-menu {
  border-right: none;
}
</style>