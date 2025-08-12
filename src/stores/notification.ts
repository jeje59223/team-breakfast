import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', () => {
  const message = ref<string | null>(null);
  const color = ref<string>('success');
  const icon = ref<string>('mdi-check-circle');

  function show(msg: string, type: 'success' | 'error' = 'success') {
    message.value = msg;
    color.value = type === 'success' ? 'success' : 'error';
    icon.value = type === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle';
  }

  function clear() {
    message.value = null;
  }

  return { message, color, icon, show, clear };
});
