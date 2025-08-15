<script setup lang="ts">
import CreateUserForm from '@/components/template/CreateUserForm.vue';
import { User } from '@/models/user.js';
import { ref } from 'vue';
import { useUsersStore } from '@/stores/user.store.js';
import router from '@/router/index.js';
import { useNotificationStore } from '@/stores/notification.js';

const { createUser } = useUsersStore();

const notification = useNotificationStore();

const user = ref<User>({
  firstname: '',
  lastname: '',
  ldap: '',
  login: { password: '', username: '' },
  nextOrganizedBreakfastDate: '',
  numberOfBreakFastOrganised: 0,
  email: '',
  roles: []
});

async function createNewUser() {
  try {
    const newUser = {
      ...user.value,
      login: {
        ...user.value.login,
        username: user.value.ldap
      }
    };
    await createUser(newUser);
    notification.show('Utilisateur créé avec succès', 'success');
  }
  catch (error) {
    notification.show('Erreur lors de la création de l’utilisateur', 'error');
    console.error('Error creating user:', error);
  }
  finally {
    await router.push({ name: 'breakfast' });
  }
}
</script>

<template>
  <CreateUserForm
    v-model:user="user"
    @create-user="createNewUser"
    @cancel="router.push({ name: 'breakfast' })"
  />
</template>
