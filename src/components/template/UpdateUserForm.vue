<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores/user.store.js';
import noImage from '@/assets/no-image.jpg';
import { getInitials } from '@/utils/get-initials.utils.js';
import NoAvatar from '@/components/atoms/no-avatar/NoAvatar.vue';
import ActionBottomBar from '@/components/atoms/action-bottom-bar/ActionBottomBar.vue';
import router from '@/router/index.ts';
import { useNotificationStore } from '@/stores/notification.js';

const route = useRoute();
const ldap = route.params.ldap as string;
const { getUserByLdap, updateUser } = useUsersStore();
const defaultPicture = noImage as string;
const { userByLdap } = storeToRefs(useUsersStore());
const notification = useNotificationStore();

onMounted(async () => {
  await getUserByLdap(ldap);
});

const handlePictureError = (event: Event) => {
  (event.target as HTMLImageElement).src = defaultPicture;
};

const selectedFile = ref<File | null>(null);

const onFileChange = (file: File | File[] | null) => {
  if (file instanceof File) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        userByLdap.value.picture = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }
};

const handleUpdateUser = async (user) => {
  try {
    await updateUser(user.ldap, {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      picture: user.picture
    });
    notification.show('Compte utilisateur mis à jour avec succès', 'success');

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour :', error);
    notification.show('Erreur lors de la mise a jour du compte utilisateur', 'error');
  } finally {
    await router.push({ name: 'account', params: { ldap: userByLdap?.ldap } });
  }
};
</script>

<template>
  <v-card class="update-user-form">
    <h1 class="update-user-form__title">Edition du compte</h1>
    <div class="update-user-form__header">
      <div class="update-user-form__header-picture">
        <img
          v-if="userByLdap && userByLdap.picture"
          class="update-user-form__header-picture-avatar"
          :src="userByLdap.picture"
          @error="handlePictureError"
        >
        <NoAvatar
          v-else
          class="update-user-form__header-picture-no-avatar"
          :initial="userByLdap ? getInitials(userByLdap) : ''"
        />
      </div>
      <div class="update-user-form__header-picture-input">
        <p>Photo de profil</p>
        <v-file-input
          v-if="userByLdap && userByLdap.picture"
          v-model="selectedFile"
          accept="image/*"
          label="Changer la photo de profil"
          variant="outlined"
          @update:modelValue="onFileChange"
        />
      </div>
    </div>
    <v-divider />
    <div
      v-if="userByLdap"
      class="update-user-form__body"
    >
      <v-text-field
        v-model="userByLdap.firstname"
        label="Prénom"
        variant="outlined"
        color="#007f8c"
        :hide-details="true"
      />
      <v-text-field
        v-model="userByLdap.lastname"
        label="Nom"
        variant="outlined"
        color="#007f8c"
        :hide-details="true"
      />
      <v-text-field
        v-model="userByLdap.ldap"
        label="LDAP"
        variant="outlined"
        color="#007f8c"
        :hide-details="true"
        disabled
      />
      <v-text-field
        v-model="userByLdap.email"
        label="Email"
        variant="outlined"
        color="#007f8c"
        :hide-details="true"
      />
    </div>
  </v-card>
  <ActionBottomBar>
    <v-btn
      color="#007f8c"
      @click="handleUpdateUser(userByLdap)"
    >
      Sauvegarder
    </v-btn>
    <v-btn
      color="#ea302d"
      variant="outlined"
      @click="router.push({ name: 'account', params: { ldap: userByLdap?.ldap } })"
    >
      Annuler
    </v-btn>
  </ActionBottomBar>
</template>

<style lang="scss">
.update-user-form {
  padding: 10px;
  min-width: 550px;

  &__header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    min-height: 96px;
    width: 100%;

    &-picture {
      display: flex;
      max-width: 96px;

      &-avatar {
        width: 100%;
        max-width: 96px;
        object-fit: cover;
        border-radius: 4px;
      }

      &-no-avatar {
        min-width: 96px;
        min-height: 96px;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        font-size: 30px;
        object-fit: cover;
      }

      &-input {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
      }
    }
  }

  &__body {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-text-field {
      width: 100%;
    }
  }
}
</style>
