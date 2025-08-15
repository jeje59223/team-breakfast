<script setup lang="ts">
import { useAuth } from '@/stores/authStore.js';

const { user } = useAuth();

</script>

<template>
  <div>
    <h1>
      Podium
    </h1>
    <p>
      Welcome {{ user.firstname }} to the Podium page
    </p>
    <p>This page is coming soon !</p>
  </div>
</template>
