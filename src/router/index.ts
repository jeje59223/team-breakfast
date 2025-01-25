import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TeamBreakfastView from '@/views/TeamBreakfastView.vue'
import AccountView from '@/views/AccountView.vue'
import PodiumView from '@/views/PodiumView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
  path: '/team-breakfast',
    name: 'breakfast',
  component: TeamBreakfastView
    },
    {
      path: '/account/:ldap',
        name: 'account',
      component: AccountView
    },
    {
      path: '/podium',
        name: 'podium',
      component: PodiumView
    },
  ],
})

export default router
