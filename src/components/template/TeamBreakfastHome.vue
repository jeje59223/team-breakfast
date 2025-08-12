<script setup lang="ts">
import { useAuth } from '@/stores/authStore.ts';

const { user } = useAuth();

</script>

<template>
  <div class="home">
    <h1 class="home__title"
        tnr-id="home-title">
      Home
    </h1>
    <p class="home__subtitle"
       tnr-id="home-subtitle">
      Welcome {{user.firstname}} to the home page
    </p>
  </div>
</template>
