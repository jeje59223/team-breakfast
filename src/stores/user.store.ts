import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import type { User } from '@/models/user.ts';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const userByLdap = ref<User | null>();
  const csrfToken = ref<string | null>(null);
  const isLoading = ref<boolean>(false);
  const isLoadingUserByLdap = ref<boolean>(false);

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

  const getUserByLdap = async (ldap: string): Promise<void> => {
    try {
      isLoadingUserByLdap.value = true;
      const response = await axios.get(`http://localhost:8080/users/ldap/${ldap}`, { withCredentials: true });
      if (response.data) {
        userByLdap.value = response.data;  // <- ici, pas .document
      } else {
        userByLdap.value = null;
        console.warn(`Aucun utilisateur trouvé pour LDAP ${ldap}`);
      }

    } catch (err: unknown) {
      console.error(`Error retrieving user by ldap: ${err}`);
      userByLdap.value = null;
    } finally {
      isLoadingUserByLdap.value = false;
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

  const updateUser = async (ldap: string, updateData: Partial<User>) => {
    try {
      await getCsrfToken();
      await axios.put(
        'http://localhost:8080/users/update-user',
        { ldap, updateData },
        {
          headers: { 'X-CSRF-Token': csrfToken.value },
          withCredentials: true
        }
      );
    } catch (err) {
      throw new Error(`Update user error: ${err}`);
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
      throw err;
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
    updateUser,
    deleteUserByLdap,
    createUser,
    addNextOrganizedBreakfastDate,
    validateBreakfast,
    removeNextOrganizedBreakfastDate,
    getUserByLdap,
    users,
    userByLdap,
    isLoading,
    isLoadingUserByLdap
  };
});
