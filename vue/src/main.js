import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// use es6 syntax and api
import 'babel-polyfill'

// use vue-router
import VueRouter from 'vue-router'

// use lodash
import _ from 'lodash'

import axios from 'axios'

// use moment
import moment from 'moment'

// register global filter
import '@/utils/filters'

// use vuex
import store from './store/index'

import apiPath from "@/service/apiPath";

import cacheKeyCollection from "@/service/cacheKeyCollection";

import Home from '@/views/Home'

const _import = require('./router/_import_' + process.env.NODE_ENV)

// use axios
import { post, get, patch, put } from './service/requestApi.js'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

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
		var remoteSiteSettings = await axios.get(apiPath.SITE_SETTINGS);
		siteSettings = remoteSiteSettings.data.data;
	}

	//获取系统路由
	if (!siteRouter) {
		//从后台获取路由
		var remoteRouter = await axios.get(apiPath.NAVIGATION);
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
	global.antRouter = siteRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
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


createApp(App).mount('#app')
