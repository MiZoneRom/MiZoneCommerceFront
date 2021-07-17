import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '首页',
    redirect: '/Console',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        name: '控制台',
        path: '/Console',
        component: () => import('@/views/Console.vue'),
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
