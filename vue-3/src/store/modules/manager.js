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
            var formData = vm.form;
            formData.logining = true;
            vm.axios
                .get(
                    api.LOGIN + "?username=" + formData.userName + "&password=" + formData.password
                )
                .then((response) => {
                    var responseData = response.data;
                    if (responseData.success == false) {
                        vm.$message({ message: responseData.msg, type: 'error' });
                        formData.logining = false;
                        return;
                    }
                    commit('SET_ADMIN', formData.userName);
                    commit('SET_TOKEN', responseData.data.token);
                    commit('SET_REFRESH_TOKEN', responseData.data.refreshToken);
                    vm.$router.push('/');
                });
        },
        //登出
        LoginOut({ commit }) {
            commit('LOGOUT');
        }
    }


}

export default manager