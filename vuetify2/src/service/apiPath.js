// 使用线上地址 
let apiUrl = process.env.VUE_APP_SERVICE_URL;

export default {
	'LOGIN': '/Login',//登录
	'USER_INFO': '/Manager',// 用户基本资料获取
	'REFRESH_TOKEN': '/Login/RefreshToken',
	'NAVIGATION': '/ManagerNavigation/GetNavigationList',
	'SITE_SETTINGS': '/Site',//获取系统设置
	'EDIT_SITE_SETTINGS': '/Site'
}