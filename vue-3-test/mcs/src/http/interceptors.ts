// 首先引入axios和上一步封装的cookie方法
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import apiPath from "@/http/apiPath";
import router from '@/router'
import {
    setToken,
    setRefreshToken,
    getToken,
    getRefreshToken
} from "../plugins/cookie";

// 是否在刷新
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests: Array<any> = [];

export class Interceptors {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: "/api",
            timeout: 10 * 1000,
        });
    }
    // 初始化拦截器
    init(): void {

        // 请求接口拦截器
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const token = getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (err: any) => {
                console.error(err);
            }
        );

        // 响应拦截器
        this.instance.interceptors.response.use(

            //请求成功
            (response: AxiosResponse) => {
                return response;
            },

            //请求失败
            async (error) => {

                //状态码
                const status: number = error.response.status;

                if (status == 401) {

                    const token = getToken();
                    const refresh_token = getRefreshToken();

                    //如果不在刷新状态
                    if (!isRefreshing) {

                        //设置为正在刷新
                        isRefreshing = true;

                        //数据结构
                        const refreshData = {
                            token: token,
                            refreshToken: refresh_token
                        };


                        //刷新数据
                        const tokenResult = await getRefreshTokenAsync(refreshData);

                        //如果获取成功
                        if (tokenResult.success) {
                            isRefreshing = false;
                            setToken(tokenResult.data.token);
                            setRefreshToken(tokenResult.data.refreshToken);
                            // 已经刷新了token，将所有队列中的请求进行重试
                            requests.forEach(cb => cb(tokenResult.data.token));
                            requests = [];
                            //重新请求之前的内容
                            error.config.headers.Authorization = 'Bearer ' + tokenResult.data.token;
                            return this.instance(error.config);
                        } else {
                            //vm.$message({ message: tokenResult.msg });
                            //跳转到登录
                            router.replace({
                                path: '/Login',
                                query: {
                                    redirect: router.currentRoute.value.fullPath
                                }
                            });
                        }

                    } else {

                        // 如果正在刷新token，将返回一个未执行resolve的promise
                        return new Promise((resolve) => {

                            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                            requests.push((token: any) => {
                                error.config.headers.Authorization = `Bearer ${token}`;
                                resolve(this.instance(error.config));
                            });

                        });
                    }

                }

                return Promise.resolve(error);
            }
        );
    }
    //返回实例
    getInterceptors(): AxiosInstance {
        return this.instance;
    }
}


//刷新token
export function getRefreshTokenAsync(param: any): Promise<any> {
    return axios.post(process.env.VUE_APP_SERVICE_URL + apiPath.REFRESH_TOKEN, param)
        .then((res) => {
            return Promise.resolve(res.data)
        });
}