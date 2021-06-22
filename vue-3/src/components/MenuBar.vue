<template>
  <el-menu
    :default-active="activeIndex"
    class="menu-bar"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1" class="logo">
      <img src="@/assets/logo.png" />
      <span>MiZoneCommerce</span>
    </el-menu-item>
    <el-menu-item index="2">处理中心</el-menu-item>
    <el-submenu index="3">
      <template #title>我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template #title>选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4">
      <a href="https://www.ele.me" target="_blank">订单管理</a>
    </el-menu-item>
    <el-submenu index="4" class="pull-right">
      <template #title>
        <el-avatar icon="el-icon-user-solid" :src="avatarUrl"></el-avatar>
        {{ realName }}
      </template>
      <el-menu-item index="3-1" @click="$router.push('/profile')"
        >个人主页</el-menu-item
      >
      <el-menu-item index="3-2" @click="logout">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.logo {
  width: 200px;
  img {
    height: 30px;
    width: 30px;
  }
}
</style>