<script setup lang="ts">

import { defineModel } from 'vue';

defineProps<{
  title: string;
  text: string;
  icon?: string;
  colorIcon?: string;
  labelConfirmButton: string;
  labelCancelButton: string;
}>();

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'confirm'): void;
}>();

const openDialog = defineModel<boolean>('openDialog');

</script>

<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="openDialog"
      max-width="600"
      persistent
      :closeOnBack="true"
    >
      <v-card
        :prepend-icon="icon"
        :text="text"
        :title="title"
      >
        <template v-slot:prepend>
          <v-icon
            :color="colorIcon"
            :icon="icon">
          </v-icon>
        </template>
        <template v-slot:actions>
          <div class="footer">
            <v-btn
              color="#c61112"
              variant="elevated"
              @click="emit('confirm')"
            >
              {{ labelConfirmButton }}
            </v-btn>
            <v-btn
              @click="emit('cancel')"
              variant="outlined"
            >
              {{ labelCancelButton }}
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
.footer {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  padding-right: 16px;
  gap: 10px;
}
</style>
