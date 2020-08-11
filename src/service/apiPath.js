// 使用线上地址 
let apiUrl = process.env.VUE_APP_SERVICE_URL;

export default {
	'LOGIN': apiUrl + '/Login',//登录
	'USER_INFO': apiUrl + '/Manager',// 用户基本资料获取
	'REFRESH_TOKEN': apiUrl + '/Login/RefreshToken',
	'NAVIGATION': apiUrl + '/Console/Navigation',
	'SITE_SETTINGS': apiUrl + '/Site/SiteSettings',//获取系统设置
	'EDIT_SITE_SETTINGS': apiUrl + '/Site/EditSiteSettings'
}