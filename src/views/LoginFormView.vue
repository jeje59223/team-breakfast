<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/stores/authStore.ts';
import LoginForm from '@/components/template/LoginForm.vue';

const { login } = useAuth();
const username = ref('');
const password = ref('');
const isLoading = ref(false);
const displayErrorMessage = ref(false);

async function handleLogin() {
  try {
    isLoading.value = true;
    await login(username.value, password.value);
  } catch (error) {
    displayErrorMessage.value = true;
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <LoginForm
    v-model:username="username"
    v-model:password="password"
    v-model:isLoading="isLoading"
    v-model:displayErrorMessage="displayErrorMessage"
    @login="handleLogin"
  />
</template>
