import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: () => import('../views/StartView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/recovery',
      name: 'Recovery',
      component: () => import('../views/RecoveryView.vue')
    },
    {
      path: '/reboot-message',
      name: ' RebootMessage',
      component: () => import('../views/RebootMessageView.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
