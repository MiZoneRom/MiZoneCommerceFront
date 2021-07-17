import { createRouter, createWebHistory, RouteRecordRaw, stringifyQuery, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getAdmin, removeToken } from '@/utils/auth'
import apiPath from "@/http/apiPath";
import http from "@/http";
import store from '@/store';
import home from '@/views/Home.vue';

//用来获取后台拿到的路由
let siteRouter: Array<any> = [];
//系统配置
let siteSettings: any;

//环境区分
const _import = require('../router/_import_' + process.env.NODE_ENV)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '首页',
    redirect: '/Console',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        name: '控制台',
        path: '/Console',
        component: () => import('@/views/Console.vue'),
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

//创建路由
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

//初始化路由
function initRouter(data: any, to: RouteLocationNormalized, next: NavigationGuardNext) {
  siteRouter = filterAsyncRouter(data); //过滤路由
  router.addRoute(...siteRouter); //动态添加路由
  router.addRoute({ path: "/:catchAll(.*)", redirect: '/404' });//添加动态路由后再添加404页面
  //global.RouterList = siteRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true });
}

//遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: Array<RouteRecordRaw>): Array<RouteRecordRaw> {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      route.component = _import(route.component);
    } else {
      route.component = home as never;
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    route.meta = {
      title: `${String(route.name)} - ${siteSettings.siteName}`
    };
    return true;
  });
  return accessedRouters;
}

//路由开始之前
router.beforeEach(async (to, from, next) => {

  //如果前往登录 清空登录信息
  if (to.path == '/Login') {
    store.dispatch("LoginOut");
  }

  //获取系统配置
  if (!siteSettings) {
    const remoteSiteSettings = await http.axios.get(apiPath.SITE_SETTINGS);
    siteSettings = remoteSiteSettings.data.data;
  }

  //获取用户信息
  const user = getAdmin();

  //获取系统路由
  if (!siteRouter && user) {
    //从后台获取路由
    const remoteRouter = await http.axios.get(apiPath.NAVIGATION_TREELIST);
    const siteRouterData = remoteRouter.data.data;
    //执行路由跳转方法
    initRouter(siteRouterData, to, next);
  }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = String(to.meta.title);
  }

  //如果用户过期且没有前往登录
  if (!user && to.path != '/Login') {
    next({ path: '/Login' });
  } else {
    next();
  }

});

export default router
