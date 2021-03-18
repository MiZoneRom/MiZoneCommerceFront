// 使用线上地址 
let apiUrl = process.env.VUE_APP_SERVICE_URL;

export default {
	'LOGIN': '/Login',//登录
	'USER_INFO': '/Manager',// 用户基本资料获取
	'REFRESH_TOKEN': '/Login/RefreshToken',//刷新用户凭据
	'NAVIGATION_TREELIST': '/ManagerNavigation/GetNavigationTreeList',//获取导航树状列表
	'NAVIGATION_LIST_BY_PARENT_ID': '/ManagerNavigation/GetNavigationList',//根据父级Id获取导航列表
	'NAVIGATION_SORT_LIST': '/ManagerNavigation/GetNavigationSortList',//获取根据层级排序列表
	'NAVIGATION': '/ManagerNavigation/',
	'SITE_SETTINGS': '/Site',//获取系统设置
	'EDIT_SITE_SETTINGS': '/Site'//编辑系统设置
}