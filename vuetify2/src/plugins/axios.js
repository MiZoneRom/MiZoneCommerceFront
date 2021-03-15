"use strict";

import Vue from 'vue';
import axios from "axios";
import apiPath from "@/service/apiPath";
import router from '@/router'
import { getToken, getRefreshToken,setToken,setRefreshToken } from '@/utils/auth'

//刷新token
export function getRefreshTokenAsync(param) {
  return axios.post(apiPath.REFRESH_TOKEN, param)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.VUE_APP_SERVICE_URL,
  timeout: 15 * 1000
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

// 配置通用请求动画
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    var token = getToken();
    if (token != 'undefined' && token) {
      config.headers.Authorization = 'Bearer ' + JSON.parse(token);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(async (response) => {
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
      const token = getToken();
      //const expires = parseInt(JSON.parse(sessionStorage.getItem('expires')));
      const refresh_token = getRefreshToken();

      //如果没有正在刷新
      if (!isRefreshing) {

        //设置为正在刷新
        isRefreshing = true;

        let refreshData = {
          token: token,
          refresh_token: refresh_token
        };

        //刷新数据
        var tokenResult = await getRefreshTokenAsync(refreshData);

        //如果获取成功
        if (tokenResult.success) {
          isRefreshing = false;
          setToken(JSON.stringify(tokenResult.data.token));
          setRefreshToken(JSON.stringify(tokenResult.data.refreshToken));
          //sessionStorage.setItem("expires", JSON.stringify(tokenResult.data.expires));
          //sessionStorage.setItem("refreshExpires", JSON.stringify(tokenResult.data.refreshExpires));
          // 已经刷新了token，将所有队列中的请求进行重试
          requests.forEach(cb => cb(tokenResult.data.token));
          requests = [];
          //重新请求之前的内容
          error.config.headers.Authorization = 'Bearer ' + tokenResult.data.token;
          return _axios(error.config);
        } else {
          this.$dialog.notify.info(tokenResult.msg, {
            position: 'top-right',
            timeout: 5000
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
            resolve(_axios(error.config));
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
    console.error('抱歉，请求处理异常');
  }
  return Promise.reject(error);
}
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
