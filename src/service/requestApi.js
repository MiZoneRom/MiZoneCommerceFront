import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getRefreshToken } from '../helper/tokenHelper'
import router from '../router'

let request = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000
})


// 配置通用请求动画
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];

// http request 拦截器
request.interceptors.request.use(
	config => {

		var token = sessionStorage.getItem('token');

		if (token != 'undefined' && token) {
			config.headers.Authorization = 'Bearer ' + JSON.parse(token);
		}

		return config;
	},
	error => {
		return Promise.reject(err);
	}
);

// http response 拦截器
request.interceptors.response.use(async (response) => {

	//请求状态
	var status = response.status;

	//如果登录失效
	if (response.data.code == 2) {
		router.push({
			path: "/Login",
			querry: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
		})
		return response;
	}

	return response;

}, async (error) => {

	if (error.response) {

		var status = error.response.status;

		if (status == 401) {

			//获取Token
			const token = JSON.parse(sessionStorage.getItem('token'));
			const expires = parseInt(JSON.parse(sessionStorage.getItem('expires')));
			const refresh_token = JSON.parse(sessionStorage.getItem('refreshToken'));

			//如果没有正在刷新
			if (!isRefreshing) {

				//设置为正在刷新
				isRefreshing = true;

				let refreshData = {
					token: token,
					refresh_token: refresh_token
				};

				//刷新数据
				var tokenResult = await getRefreshToken(refreshData);

				//如果获取成功
				if (tokenResult.success) {
					isRefreshing = false;

					sessionStorage.setItem("token", JSON.stringify(tokenResult.data.token));
					sessionStorage.setItem("refreshToken", JSON.stringify(tokenResult.data.refreshToken));
					sessionStorage.setItem("expires", JSON.stringify(tokenResult.data.expires));
					sessionStorage.setItem("refreshExpires", JSON.stringify(tokenResult.data.refreshExpires));

					// 已经刷新了token，将所有队列中的请求进行重试
					requests.forEach(cb => cb(tokenResult.data.token));
					requests = [];

					//重新请求之前的内容
					error.config.headers.Authorization = 'Bearer ' + tokenResult.data.token;
					return request(error.config);

				} else {
					//刷新失败信息
					Message({
						type: 'warning',
						message: res.msg,
						duration: 1500
					});
					//跳转到登录
					router.replace({
						path: '/Login',
						query: {
							redirect: router.currentRoute.fullPath
						}
					});
				}

			} else {

				// 正在刷新token，将返回一个未执行resolve的promise
				return new Promise((resolve) => {
					// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
					requests.push((token) => {
						error.config.headers.Authorization = 'Bearer ' + token;
						resolve(request(error.config));
					});
				});

			}

		} else if (status == 403) {
			router.replace({
				path: '/Login',
				query: {
					redirect: router.currentRoute.fullPath//登录之后跳转到对应页面
				}
			});
			return;
		}

	} else {

		Message({
			type: 'warning',
			message: '抱歉，请求处理异常',
			duration: 1500
		});

	}

	return Promise.reject(error)
})

/**
* Get方法
* @param url
* @param data
* @return {Promise}
*/
export function get(url, params = {}, showLoding = false) {
	return new Promise((resolve, reject) => {
		var loadingMask = null;
		if (showLoding) {
			loadingMask = showLoading();
		}
		request.get(url, { params: params }).then(response => {
			resolve(response.data);
		}).catch(error => {
			reject(error);
		}).finally(res => {
			if (loadingMask) {
				loadingMask.close();
			}
		});
	})
}

/**
 * Post请求
 * @param url
 * @param data
 * @return {Promise}
 */
export function post(url, data = {}, showLoding = false) {
	return new Promise((resolve, reject) => {
		var loadingMask = null;
		if (showLoding) {
			loadingMask = showLoading();
		}
		request.post(url, data).then(response => {
			resolve(response.data);
		}, error => {
			reject(error)
		}).finally(res => {
			if (loadingMask) {
				loadingMask.close();
			}
		});
	});
}

/**
* Patch请求
* @param url
* @param data
* @return {Promise}
*/
export function patch(url, data = {}, showLoding = false) {
	return new Promise((resolve, reject) => {
		var loadingMask = null;
		if (showLoding) {
			loadingMask = showLoading();
		}
		request.patch(url, data).then(response => {
			resolve(response.data);
		}, error => {
			reject(error)
		}).finally(res => {
			if (loadingMask) {
				loadingMask.close();
			}
		});
	})
}

/**
* Put请求
* @param url
* @param data
* @return {Promise}
*/
export function put(url, data = {}, showLoding = false) {
	return new Promise((resolve, reject) => {
		var loadingMask = null;
		if (showLoding) {
			loadingMask = showLoading();
		}
		request.put(url, data).then(response => {
			resolve(response.data);
		}, error => {
			reject(error)
		}).finally(res => {
			if (loadingMask) {
				loadingMask.close();
			}
		});
	})
}

export function showLoading() {
	let loading = Loading.service();
	return loading;
}