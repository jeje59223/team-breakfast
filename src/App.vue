<script setup lang="ts">
import { RouterView } from 'vue-router';
import SelectLanguage from '@/components/molecules/select-language/SelectLanguage.vue';
import SlideBar from '@/components/molecules/slide-bar/SlideBar.vue';
import Snackbar from '@/components/atoms/snackbar/Snackbar.vue';
import { useNotificationStore } from '@/stores/notification.js';
import { computed } from 'vue';

const notification = useNotificationStore();

const showSnackBar = computed({
  get: () => !!notification.message,
  set: (val: boolean) => {
    if (!val) notification.clear();
  }
});
</script>

<template>
  <SelectLanguage />
  <header>
    <SlideBar />
  </header>

  <RouterView />

  <Snackbar
    v-if="showSnackBar"
    v-model:displaySnackBar="showSnackBar"
    :text="notification.message"
    :color="notification.color"
    :icon="notification.icon"
    :duration="3000"
    @update:displaySnackBar="notification.clear()"
  />
</template>
