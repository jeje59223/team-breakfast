<script setup lang="ts">

import Account from '@/components/template/Account.vue';
import { computed } from 'vue';
import { useAuth } from '@/stores/authStore.js';
import Loading from '@/components/atoms/loading/Loading.vue';

const { user, isLoading } = useAuth();
const userConnected = computed(() => user.value);
</script>

<template>
  <Loading v-model="isLoading" />
  <Account
    :user="userConnected"
    is-display-edit-account-button
  />
</template>
