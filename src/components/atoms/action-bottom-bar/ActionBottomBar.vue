<script setup lang="ts">

</script>

<template>
  <div class="action-bottom-bar">
    <slot />
  </div>
</template>

<style>
.action-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>
