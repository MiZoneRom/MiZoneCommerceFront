import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css' 

Vue.use(VuetifyDialog, {
  context: {
  vuetify
  }
})

import 'babel-polyfill'

import apiPath from "@/service/apiPath";

import Home from '@/views/Home'

const _import = require('./router/_import_' + process.env.NODE_ENV)

Vue.config.productionTip = false

//用来获取后台拿到的路由
var siteRouter;
//系统配置
var siteSettings;

router.beforeEach(async (to, from, next) => {

	//如果前往登录 清空登录信息
	if (to.path == '/login') {
		sessionStorage.removeItem('admin');
	}

	//获取用户信息
	let user = JSON.parse(sessionStorage.getItem('admin'));

	//获取系统配置
	if (!siteSettings) {
		var remoteSiteSettings = await Vue.axios.get(apiPath.SITE_SETTINGS);
		siteSettings = remoteSiteSettings.data.data;
	}

	//获取系统路由
	if (!siteRouter) {
		//从后台获取路由
		var remoteRouter = await Vue.axios.get(apiPath.NAVIGATION);
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

//初始化路由
function initRouter(data, to, next) {
	siteRouter = filterAsyncRouter(data); //过滤路由
	router.addRoutes(siteRouter); //动态添加路由
	router.addRoutes([{ path: '*', redirect: '/404', hidden: true }]);//添加动态路由后再添加404页面
	global.RouterList = siteRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
	next({ ...to, replace: true });
}

//保存本地储存
function saveLocalStorage(name, data) { //localStorage 存储数组对象的方法
	localStorage.setItem(name, JSON.stringify(data));
}

//获取本地储存
function getLocalStorage(name) { //localStorage 获取数组对象的方法
	return JSON.parse(window.localStorage.getItem(name));
}

//遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
	const accessedRouters = asyncRouterMap.filter(route => {
		if (route.component) {
			if (route.component === 'Layout') {//Layout组件特殊处理
				route.component = Home;
			} else {
				route.component = _import(route.component);
			}
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

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
