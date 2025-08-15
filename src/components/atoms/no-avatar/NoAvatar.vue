<script setup lang="ts">
defineProps<{
  initial?: string;
}>();
</script>
<template>
  <div class="no-avatar">{{ initial }}</div>
</template>
<style lang="scss">
.no-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007f8c;
}
</style>
