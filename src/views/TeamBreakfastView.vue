<script setup lang="ts">

import TeamBreakfast from '@/components/template/TeamBreakfast.vue';
import Snackbar from '@/components/atoms/snackbar/Snackbar.vue';
import { ref } from 'vue';

const showCreateUserSuccessMessageSnackbar = ref(false);
const showCreateUserErrorMessageSnackbar = ref(false);

// onMounted(() => {
//   if (displayCreateUserSuccessMessage) {
//     showCreateUserSuccessMessageSnackbar.value = true;
//   }
//   setTimeout(() => {
//     showCreateUserSuccessMessageSnackbar.value = false;
//   }, 3000);
//   if (displayCreateUserErrorMessage) {
//     showCreateUserErrorMessageSnackbar.value = true;
//   }
//   setTimeout(() => {
//     showCreateUserErrorMessageSnackbar.value = false;
//   }, 3000);
// });
</script>

<template>
  <TeamBreakfast />
  <Snackbar
    v-model="showCreateUserErrorMessageSnackbar"
    color="error"
    icon="mdi-check-circle-outline"
    text="create user with error"
    :duration="2000"
  />
</template>
