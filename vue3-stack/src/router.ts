import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import useUserStore from '@/store/useUserStore'

// 路由实例
const router = createRouter({
  // history: createWebHistory(),  // history模式
  history: createWebHashHistory(), // hash模式
  // 定义路由规则
  routes: [
    {
      path: '/',
      component: ()=>import('@/pages/home/index.vue')
    },
    {
      path: '/cate',
      component: ()=>import('@/pages/cate/index.vue')
    },
    { path: '/*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next)=>{
  const store = useUserStore()
  console.log('-----secret', store.secret)
  if (store.isLogin) {
    next()
  }
})

export default router
