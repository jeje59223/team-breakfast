import { computed, ref } from 'vue';
import axios from 'axios';
import router from '@/router/index.ts';
import { Role, type User } from '@/models/user.ts';

const user = ref<User>();

export function useAuth() {
  async function checkAuth() {
    try {
      const response = await axios.get('http://localhost:8080/users/me', { withCredentials: true });
      user.value = response.data.user;
    } catch (error) {
      console.error('Erreur de vérification de l\'authentification :', error);
      user.value = undefined;
    }
  }

  async function login(username: string, password: string) {
    try {
      const csrfResponse = await axios.get('http://localhost:8080/csrf-token', {
        withCredentials: true
      });
      const csrfToken = csrfResponse.data.csrfToken;

      await axios.post(
        'http://localhost:8080/users/login',
        { username, password },
        {
          headers: {
            'X-CSRF-Token': csrfToken
          },
          withCredentials: true
        }
      );

      await checkAuth();
      if (isAuthenticated.value) {
        await router.push({ name: 'home' });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      throw new Error(`Échec de la connexion : ${error}`);
    }
  }

  async function logout() {
    try {
      const csrfResponse = await axios.get('http://localhost:8080/csrf-token', {
        withCredentials: true
      });
      const csrfToken = csrfResponse.data.csrfToken;

      await axios.post(
        'http://localhost:8080/users/logout',
        {},
        {
          withCredentials: true,
          headers: { 'X-CSRF-Token': csrfToken }
        }
      );

      user.value = undefined;
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      throw new Error('Échec de la déconnexion');
    } finally {
      await router.push({ name: 'login' });
    }
  }

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.roles?.includes(Role.ADMIN));
  const isLoading = computed(() => !user.value);

  return {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    checkAuth,
    login,
    logout
  };
}
