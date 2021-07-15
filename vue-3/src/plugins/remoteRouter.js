"use strict";

import apiPath from "@/service/apiPath";
import router from '@/router'
import store from '@/store';
import { getAdmin, removeToken } from '@/utils/auth'

//用来获取后台拿到的路由
var siteRouter;
//系统配置
var siteSettings;
import Home from '@/views/Home'
const _import = require('../router/_import_' + process.env.NODE_ENV)

//初始化路由
function initRouter(data, to, next) {
  siteRouter = filterAsyncRouter(data); //过滤路由
  router.addRoute(...siteRouter); //动态添加路由
  router.addRoute(...[{ path: "/:catchAll(.*)", redirect: '/404', hidden: true }]);//添加动态路由后再添加404页面
  global.RouterList = siteRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true });
}

//遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      route.component = _import(route.component);
    } else {
      route.component = Home;
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    route.meta = {
      title: `${route.name} - ${siteSettings.siteName}`
    };
    return true;
  });
  return accessedRouters;
}

export default (app, router) => {

  console.info(router);

  router.beforeEach(async (to, from, next) => {

    var vm = this;

    //如果前往登录 清空登录信息
    if (to.path == '/Login') {
      store.dispatch("LoginOut", vm);
    }

    //获取系统配置
    if (!siteSettings) {
      var remoteSiteSettings = await app.axios.get(apiPath.SITE_SETTINGS);
      siteSettings = remoteSiteSettings.data.data;
    }

    //获取用户信息
    let user = getAdmin();

    //获取系统路由
    if (!siteRouter && user) {
      //从后台获取路由
      var remoteRouter = await app.axios.get(apiPath.NAVIGATION_TREELIST);
      var siteRouterData = remoteRouter.data.data;
      //执行路由跳转方法
      initRouter(siteRouterData, to, next);
    }

    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }

    //如果用户过期且没有前往登录
    if (!user && to.path != '/Login') {
      next({ path: '/Login' });
    } else {
      next();
    }

  });

}