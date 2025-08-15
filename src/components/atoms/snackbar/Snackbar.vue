<script setup lang="ts">
defineProps<{
  className?: string;
  color?: string;
  duration?: number;
  icon?: string;
  text?: string;
}>();

const displaySnackBar = defineModel<boolean>('displaySnackBar');

</script>

<template>
  <v-snackbar
    v-model="displaySnackBar"
    location="top right"
    style="top: 80px; z-index: 9999"
    :class="className"
    :color="color"
    variant="flat"
    position="relative"
    :timeout="duration"
  >
    <template v-slot:default>
      <div
        class="d-flex align-center"
      >
        <v-icon
          class="ma-3"
          :icon="icon"
        />
        <span>{{ text }}</span>
      </div>
    </template>
  </v-snackbar>
</template>
