import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import type { User } from '@/models/user.ts';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const csrfToken = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  const getCsrfToken = async () => {
    try {
      const response = await axios.get('http://localhost:8080/csrf-token', { withCredentials: true });
      csrfToken.value = response.data.csrfToken;
    } catch (err: unknown) {
      throw new Error(`Get CSRF token error: ${err}`);
    }
  };

  const getUsers = async () => {
    try {
      isLoading.value = true;
      const getCollaborators = await axios.get('http://localhost:8080/users', { withCredentials: true });
      users.value = getCollaborators.data.documents;
    } catch (err: unknown) {
      throw new Error(`Get users error: ${err}`);
    }
    finally {
      isLoading.value = false;
    }
  };

  const createUser = async (user: User) => {
    try {
      await getCsrfToken();
      await axios.post('http://localhost:8080/users/add-user', user, {
        headers: {
          'X-CSRF-Token': csrfToken.value
        },
        withCredentials: true
      });
    } catch (err: unknown) {
      throw new Error(`Create user error: ${err}`);
    }
  };

  const deleteUserByLdap = async (ldap: string) => {
    try {
      await getCsrfToken();
      await axios.delete('http://localhost:8080/users/delete-user', {
        data: { ldap },
        headers: {
          'X-CSRF-Token': csrfToken.value
        },
        withCredentials: true
      });
    } catch (err: unknown) {
      throw new Error(`Delete user error: ${err}`);
    }
  };

  const addNextOrganizedBreakfastDate = async (ldap: string, date: Date) => {
    try {
      await getCsrfToken();
      await axios.put(
        'http://localhost:8080/users/add-next-organized-breakfast-date',
        { ldap, date },
        {
          headers: {
            'X-CSRF-Token': csrfToken.value
          },
          withCredentials: true
        }
      );
    } catch (err: unknown) {
      throw new Error(`Add next organized breakfast date error: ${err}`);
    }
  };

  const validateBreakfast = async (ldap: string, date: string) => {
    try {
      await getCsrfToken();
      await axios.put(
        'http://localhost:8080/users/validate-breakfast',
        { ldap, date },
        {
          headers: {
            'X-CSRF-Token': csrfToken.value
          },
          withCredentials: true
        }
      );
    } catch (err: unknown) {
      throw new Error(`Validate breakfast error: ${err}`);
    }
  };

  const removeNextOrganizedBreakfastDate = async (ldap: string) => {
    try {
      await getCsrfToken();
      await axios.put(
        'http://localhost:8080/users/remove-next-organized-breakfast-date',
        { ldap },
        {
          headers: {
            'X-CSRF-Token': csrfToken.value
          },
          withCredentials: true
        }
      );
    } catch (err: unknown) {
      throw new Error(`Remove next organized breakfast date error: ${err}`);
    }
  };

  return {
    getUsers,
    deleteUserByLdap,
    createUser,
    addNextOrganizedBreakfastDate,
    validateBreakfast,
    removeNextOrganizedBreakfastDate,
    users,
    isLoading
  };
});
