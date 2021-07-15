//import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

//createApp.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    iconCls: 'mdi-clock',
    redirect: '/Console',
    component: () => import('@/views/Home'),
    children: [
      {
        name: '控制台',
        path: '/Console',
        iconCls: 'mdi-clock',
        component: () => import('@/views/Console'),
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


export default router