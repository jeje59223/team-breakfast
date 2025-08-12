<script setup lang="ts">

import { User } from '@/models/user.js';
import { defineModel, ref } from 'vue';
import ActionBottomBar from '@/components/atoms/action-bottom-bar/ActionBottomBar.vue';

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'createUser'): void;
}>();

const user = defineModel<User>('user');
const selectedFileName = ref('');

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');

        const MAX_WIDTH = 300;
        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          user.value.picture = compressedBase64;
        }
      };
    };
  }
};
</script>

<template>
  <div class="create-user-form">
    <h1 class="create-user-form__title">Create User</h1>
    <form>
      <div class="create-user-form__container">
        <v-text-field
          v-model="user.firstname"
          class="create-user-form__container-firstname"
          label="First name"
          variant="outlined"
          color="#007f8c"
          :hide-details="true"
        />
        <v-text-field
          v-model="user.lastname"
          class="create-user-form__container-lastname"
          label="Last name"
          variant="outlined"
          color="#007f8c"
          :hide-details="true"
        />
      </div>
      <div class="create-user-form__container">
        <v-text-field
          v-model="user.ldap"
          class="create-user-form__container-ldap"
          label="LDAP"
          variant="outlined"
          color="#007f8c"
          :hide-details="true"
        />
        <v-text-field
          v-model="user.email"
          class="create-user-form__container-email"
          label="Email"
          variant="outlined"
          type="email"
          color="#007f8c"
          :hide-details="true"
        />
      </div>
      <div class="create-user-form__container">
        <v-select
          v-model="user.roles"
          class="create-user-form__container-roles"
          clearable
          variant="outlined"
          multiple
          chips
          hide-details
          label="Select"
          :items="['ADMIN', 'USER']"
        >
        </v-select>
        <v-text-field
          v-model="user.login.password"
          class="create-user-form__container-password"
          label="Password"
          variant="outlined"
          type="password"
          color="#007f8c"
          :hide-details="true"
        />
      </div>
      <div class="create-user-form__container-picture">
        <img
          v-if="user.picture || selectedFileName"
          :src="user.picture"
          class="create-user-form__container-picture-value"
          alt="User Picture"
        />
        <v-icon
          v-else
          class="test"
          icon="mdi-camera"
        />
        <v-file-input
          :model-value="selectedFileName"
          label="File input"
          variant="outlined"
          hide-details
          @change="onFileChange"
        >
        </v-file-input>
      </div>
    </form>
    <ActionBottomBar>
      <v-btn
        color="#007f8c"
        @click="emit('createUser')"
      >
        Create
      </v-btn>
      <v-btn
        variant="outlined"
        color="#ea302d"
        @click="emit('cancel')"
      >
        Cancel
      </v-btn>
    </ActionBottomBar>
  </div>
</template>

<style lang="scss" scoped>
.create-user-form {

  &__title {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    width: 800px;
    gap: 20px;

    &-firstname, &-lastname, &-ldap, &-email, &-roles, &-password {
      width: 50%;
    }

    &-picture {
      display: flex;
      justify-content: center;
      align-items: end;

      &-value {
        max-width: 50%;
        object-fit: cover;
        border-radius: 8px;
        width: 80px;
        height: 80px;
        border: 1px solid #007f8c;
      }
    }
  }
}
.test {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #007f8c;
  font-size: 100px;
}
</style>
