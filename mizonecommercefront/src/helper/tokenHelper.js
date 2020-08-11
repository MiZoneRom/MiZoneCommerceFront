import axios from 'axios'
import apiPath from "@/service/apiPath";

export function getRefreshToken(param) { // 刷新token 注意这里用到的service
  return axios.post(apiPath.REFRESH_TOKEN, param)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}