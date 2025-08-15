<script setup lang="ts">
import { computed } from 'vue';

const activeModel = defineModel('active', {
  type: Boolean,
  default: false
});

const overlayActive = computed({
  get: () => activeModel.value,
  set: (val: boolean) => activeModel.value = val
});
</script>

<template>
  <v-overlay
    v-model="overlayActive"
    class="connexion__is-loading"
  >
    <v-progress-circular
      :size="150"
      color="#287F8C"
      indeterminate
    />
  </v-overlay>
</template>
