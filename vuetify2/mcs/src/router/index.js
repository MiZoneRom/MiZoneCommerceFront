import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('@/views/Home'),
    iconCls: 'el-icon-edit',
    redirect: '/Console',
    children: [
      {
        name: '控制台',
        path: '/Console',
        hidden: true
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
