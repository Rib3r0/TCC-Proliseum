import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: () => import('@/views/StartView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/recovery',
      name: 'Recovery',
      component: () => import('@/views/RecoveryView.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/teste',
      name: 'teste',
      component: () => import('@/views/TesteView.vue')
    },
    {
      path: '/perfil/editar',
      name: 'Editar',
      component: () => import('@/views/EditarUsuarioView.vue')
    },
    {
      path: '/perfil/:id',
      name: 'Perfil',
      component: () => import('@/views/PerfilView.vue')
    },
    {
      path: '/:notFound',
      name: 'Not_Found',
      component: () => import('@/views/NotFoundView.vue')
    }

  ]
})

export default router
