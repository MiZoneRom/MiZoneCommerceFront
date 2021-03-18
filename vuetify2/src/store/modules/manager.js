import api from '@/service/apiPath'
import { getToken, setToken, setAdmin, getAdmin, removeToken, setRefreshToken, getRefreshToken } from '@/utils/auth'
const manager = {
    state: {
        token: getToken(),
        admin: getAdmin(),
        refreshToken: getRefreshToken()
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
            setToken(token)
        },
        SET_ADMIN(state, admin) {
            state.admin = admin
            setAdmin(admin)
        },
        SET_REFRESH_TOKEN(state, refreshToken) {
            state.refreshToken = refreshToken
            setRefreshToken(refreshToken)
        },
        LOGOUT(state) {
            state.token = '';
            state.admin = null;
            removeToken()
        }
    },
    actions: {
        // 登录获取token
        Login({ commit }, vm) {
            vm.logining = true;
            vm.axios
                .get(
                    api.LOGIN + "?username=" + vm.name + "&password=" + vm.password
                )
                .then((response) => {
                    var responseData = response.data;
                    if (responseData.success == false) {
                        vm.$dialog.notify.info(responseData.msg, {
                            position: "top-right",
                            timeout: 5000,
                        });
                        vm.logining = false;
                        return;
                    }
                    commit('SET_ADMIN', vm.name);
                    commit('SET_TOKEN', responseData.data.token);
                    commit('SET_REFRESH_TOKEN', responseData.data.refreshToken);

                    vm.$router.push('/');
                });
        },
        LoginOut({ commit }, vm) {
            commit('LOGOUT');
        }
    }


}

export default manager