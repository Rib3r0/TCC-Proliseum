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
      path: '/chanpionships',
      name: 'Chanpionships',
      component: () => import('@/views/ChanpionshipsView.vue')
    },
    {
      path: '/requests',
      name: 'Requests',
      component: () => import('@/views/RequestsView.vue')
    },
    {
      path: '/teams',
      name: 'Teams',
      component: () => import('@/views/TeamsView.vue')
    },
    {
      path: '/teams/:id',
      name: 'Team',
      component: () => import('@/views/ProfileTeamView.vue')
    },
    {
      path: '/myorg',
      name: 'MyOrg',
      redirect: '/perfil/' + localStorage.getItem('id'),
    },
    {
      path: '/Org/:id',
      name: 'Org',
      component: () => import('@/views/ProfileOrgView.vue')
    },
    {
      path: '/premium',
      name: 'Premium',
      component: () => import('@/views/PremiumView.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/SearchView.vue')
    },
    {
      path: '/perfil/editar',
      name: 'EditarPerfil',
      component: () => import('@/views/EditarUsuarioView.vue')
    },
    {
      path: '/edit',
      name: 'Editar',
      component: () => import('@/views/EditPrefsView.vue')
    },
    {
      path: '/perfil/:id',
      name: 'Perfil',
      component: () => import('@/views/PerfilView.vue'),
    },
    {
      path: '/perfil',
      name: 'PerfilDefault',
      redirect: '/perfil/' + localStorage.getItem('id'),
    },
    {
      path: '/:notFound',
      name: 'Not_Found',
      component: () => import('@/views/NotFoundView.vue')
    }

  ]
})

export default router
