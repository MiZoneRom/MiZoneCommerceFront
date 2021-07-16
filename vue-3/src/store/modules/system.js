import api from '@/service/apiPath'

const system = {
    state: {
    },
    mutations: {
    },
    actions: {
        //获取导航列表
        GetNavigationTreeList({ commit }, vm) {
            vm.axios
                .get(api.NAVIGATION_TREELIST)
                .then((response) => {
                    var responseData = response.data;
                    if (responseData.success == false) {
                        vm.$message({ message: responseData.msg, type: 'error' });
                        return;
                    }
                    return responseData.data;
                });
        }
    }
}

export default system