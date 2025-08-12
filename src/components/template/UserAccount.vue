<script setup lang="ts">
import { useAuth } from '@/stores/authStore.ts';
import { computed, ref } from 'vue';
import ActionBottomBar from '@/components/atoms/action-bottom-bar/ActionBottomBar.vue';

const { user } = useAuth();

const userConnected = computed(() => user.value);

const selectedFile = ref<File | null>(null);

const onFileChange = (file: File | File[] | null) => {
  if (file instanceof File) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // On ne met QUE la string base64 dans l'objet user
        user.value.picture = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="user-account">
    <h1 class="mb-8 user-account__title">
      Account page
    </h1>
    <div class="user-account__content">
      <img
        v-if="user.picture"
        class="user-account__content-picture"
        :src="user.picture"
      />
      <div
        v-else
        class="user-account__content-no-picture">
        {{ user.firstname.charAt(0).toUpperCase() }}
      </div>
      <v-card class="user-account__content-form">
        <div class="mb-8 user-account__content-form-firstname-lastname">
          <v-text-field
            v-model="userConnected.firstname"
            class="w-50"
            label="First name"
            variant="outlined"
            color="#007f8c"
            :hide-details="true"
          />
          <v-text-field
            v-model="userConnected.lastname"
            class="w-50"
            label="Last name"
            variant="outlined"
            color="#007f8c"
            :hide-details="true"
          />
        </div>
        <v-text-field
          v-model="userConnected.email"
          label="First name"
          class="mb-8"
          variant="outlined"
          color="#007f8c"
          :hide-details="true"
        />
        <v-file-input
          v-model="selectedFile"
          label="Picture"
          variant="outlined"
          color="#007f8c"
          :hide-details="true"
          clearable
          @update:modelValue="onFileChange"
        />
      </v-card >
    </div>
  </div>
  <ActionBottomBar>
    <v-btn
      color="#007f8c"
      variant="elevated"
      @click="console.log('Save changes')"
    >
      Sauvegarder
    </v-btn>
  </ActionBottomBar>
</template>
<style lang="scss">
.user-account {
  width: 60%;
  &__title {
    text-align: center;
  }
  &__content {
    display: flex;
    align-items: center;
    gap: 40px;
    &-picture, &-no-picture {
      width: 30vh;
      height: 30vh;
      border-radius: 50%;
      max-width: 200px;
      max-height: 200px;
      min-width: 100px;
      min-height: 100px;
    }
    &-picture {
      img {
        border-radius: 50%;
      }
    }
    &-no-picture {
      background: #007f8c;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #f8f8f8;
      font-size: 100px;
    }
    &-form {
      width: auto;
      min-width: 70%;
      padding: 40px;
      &-firstname-lastname {
        display: flex;
        justify-content: space-between;
        gap: 20px;
      }
    }
  }
}
</style>
