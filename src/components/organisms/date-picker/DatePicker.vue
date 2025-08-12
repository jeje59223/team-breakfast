<script setup lang="ts">
import { User } from '@/models/user.js';

defineProps<{
  allowDate: (date: string) => (undefined | boolean),
  addNextBreakfastDate: (id: User['ldap'], date: string | undefined) => void,
}>();

const overlay = defineModel<boolean>('overlay');
const date = defineModel<Date>('date');
</script>

<template>
  <v-overlay
    v-model="overlay"
    class="date-picker"
  >
    <v-date-picker
      v-model="date"
      :allowed-dates="allowDate"
      width="400"
      color="#007f8c"
      title="Select date"
      @update:model-value="addNextBreakfastDate"
    >
      <template #header>
        <div class="custom-header" />
      </template>
    </v-date-picker>
  </v-overlay>
</template>

<style scoped lang="scss">
.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
