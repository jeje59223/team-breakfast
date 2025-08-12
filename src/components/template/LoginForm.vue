<script setup lang="ts">
import { ref, defineEmits, defineModel } from 'vue';
import Snackbar from '@/components/atoms/snackbar/Snackbar.vue';

const emit = defineEmits(['login']);
const username = defineModel<string>('username');
const password = defineModel<string>('password');
const visible = ref(false);
const isLoading = defineModel<boolean>('isLoading');
const displayErrorMessage = defineModel<boolean>('displayErrorMessage');

function submitForm() {
  emit('login');
}
</script>

<template>
  <v-overlay
    v-model="isLoading"
    class="connexion__is-loading"
  >
    <v-progress-circular
      :size="150"
      color="#287F8C"
      indeterminate
    />
  </v-overlay>

  <v-card
    class="mx-auto connexion"

    tnr-id="connexion">
    <form
      @submit.prevent="submitForm"
      class="connexion__form"
    >
      <v-text-field
        v-model="username"
        class="mb-8"
        label="LDAP"
        variant="outlined"
        color="#007f8c"
        :hide-details="true"
        :clearable="true"
        tnr-id="connexion-card-ldap-field"
      />

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        :hide-details="true"
        variant="outlined"
        color="#007f8c"
        placeholder="Password"
        tnr-id="connexion-card-password-field"
        :clearable="true"
        @click:append-inner="visible = !visible"
      />

      <div
        class="mb-2 connexion__form-actions"
        tnr-id="connexion-card-forgot-password-link"
      >
        <v-btn
          type="submit"
          color="#007f8c"
          size="large"
          class="mt-8 connexion__form-actions-validate">
          Connexion
        </v-btn>
        <p
          class="connexion__form-actions-forgot-password text-decoration-underline"
          @click="console.log('Forgot password')"
        >
          Mot de passe oublié ?
        </p>
      </div>
    </form>
  </v-card>
  <Snackbar
    v-model="displayErrorMessage"
    text="Invalid username and/or password"
    icon="$cancel"
    color="#ea302d"
    :duration="3000"
  />
</template>
<style lang="scss">
.connexion {
  min-width: 400px;
  margin: 0 auto;
  padding: 18px 18px 10px;

  &__form {
    &-actions {
      &-validate {
        width: 100%;
      }
      &-forgot-password {
        margin-top: 10px;
        cursor: pointer;
      }
    }
    &-error-message-content {
      display: flex;
      align-items: center;
    }
  }
  &__is-loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
