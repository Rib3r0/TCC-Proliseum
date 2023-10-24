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
      path: '/championships',
      name: 'Chanpionships',
      component: () => import('@/views/ChampionshipsView.vue')
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
      path: '/teams/create',
      name: 'TeamsCreate',
      component: () => import('@/views/TeamCreateView.vue')
    },
    {
      path: '/teams/editar/:id',
      name: 'TeamEdit',
      component: () => import('@/views/EditTeamView.vue')
    },
    {
      path: '/teams/:id',
      name: 'Team',
      component: () => import('@/views/ProfileTeamView.vue')
    },
    {
      path: '/myorg',
      name: 'MyOrg',
      redirect: '/org/' + localStorage.getItem('id'),
    },
    {
      path: '/org/:id',
      name: 'Org',
      component: () => import('@/views/ProfileOrgView.vue')
    },
    {
      path: '/org/editar',
      name: 'OrgEdit',
      redirect: '/edit',
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
      path: '/offers',
      name: 'Offers',
      component: () => import('@/views/SearchTeamView.vue')
    },
    {
      path: '/search/post',
      name: 'SearchEdit',
      component: () => import('@/views/PostEditView.vue')
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
      path: '/players',
      name: 'Players',
      component: () => import('@/views/PlayersView.vue'),
    },
    {
      path: '/:notFound(.*)',
      name: 'Not_Found',
      component: () => import('@/views/NotFoundView.vue')
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },

})

export default router
