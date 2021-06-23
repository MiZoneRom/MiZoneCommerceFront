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
})

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router


// import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
