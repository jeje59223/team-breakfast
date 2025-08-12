import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TeamBreakfastView from '@/views/TeamBreakfastView.vue';
import AccountView from '@/views/AccountView.vue';
import PodiumView from '@/views/PodiumView.vue';
import LoginForm from '@/components/template/LoginForm.vue';
import { useAuth } from '@/stores/authStore.ts';
import LoginFormView from '@/views/LoginFormView.vue';
import CreateUserFormView from '@/views/CreateUserFormView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/team-breakfast',
      name: 'breakfast',
      component: TeamBreakfastView,
      meta: { requiresAuth: true }
    },
    {
      path: '/account/:ldap',
      name: 'account',
      component: AccountView,
      meta: { requiresAuth: true }
    },
    {
      path: '/podium',
      name: 'podium',
      component: PodiumView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginFormView,
      meta: { requiresAuth: false }
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: CreateUserFormView,
      meta: { requiresAuth: false }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const { checkAuth, isAuthenticated } = useAuth();

  await checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
