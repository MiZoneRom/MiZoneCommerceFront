<template>
  <el-container class="container">
    <el-header class="header-menu">
      <MenuBar></MenuBar>
    </el-header>
    <el-container>
      <el-aside class="header-navgation">
        <Navigation></Navigation>
      </el-aside>
      <el-container>
        <el-main>
          <el-page-header @back="goBack" content="详情页面"> </el-page-header>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header-menu {
    padding: 0;
  }
  .header-navgation {
    padding-top: 1px;
    width: 200px !important;
  }
}
</style>

<script>
//左侧导航
import Navigation from "@/components/Navigation.vue";
//菜单栏
import MenuBar from "@/components/MenuBar.vue";

export default {
  name: "Home",
  components: {
    Navigation,
    MenuBar,
  },
};
</script>
