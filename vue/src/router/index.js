import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

//设置默认路由
export default new Router({
  routes: [
    {
      path: '/',
      name: '控制台',
      component: Home,
      iconCls: 'el-icon-edit',
      children: [
        {
          path: '/',
          hidden: true,
          redirect: '/Console',
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      hidden: true, // 左侧导航栏中隐藏
      component: () => import('@/views/Login'),
      iconCls: 'el-icon-message',//图标样式class
    }
  ]
})

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
