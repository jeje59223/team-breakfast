<script setup lang="ts">
import { useUsersStore } from '@/stores/user.store.ts';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import Datatable from '@/components/molecules/datatable/Datatable.vue';
import Snackbar from '@/components/atoms/snackbar/Snackbar.vue';
import Dialog from '@/components/atoms/dialog/Dialog.vue';
import ActionBottomBar from '@/components/atoms/action-bottom-bar/ActionBottomBar.vue';
import router from '@/router/index.js';
import { useAuth } from '@/stores/authStore.js';
import { useNotificationStore } from '@/stores/notification.js';

const { getUsers } = useUsersStore();
const notification = useNotificationStore();
const { users, isLoading } = storeToRefs(useUsersStore());
const { deleteUserByLdap, addNextOrganizedBreakfastDate, validateBreakfast, removeNextOrganizedBreakfastDate } = useUsersStore();
const displaySnackbar = ref<boolean>(false);
const openDeleteDialog = ref<boolean>(false);
const openDeleteSuccessMessage = ref<boolean>(false);
const userLdapToDelete = ref<string>('');
const isOpenDatePicker = ref(false);
const isOpenAddNextBreakfastDateDialog = ref(false);
const isOpenValidateBreakfastMessage = ref(false);

const { isAdmin } = useAuth();

onMounted(async () => {
  await getUsers();
});

function handleDeleteUser(ldap: string) {
  openDeleteDialog.value = true;
  userLdapToDelete.value = ldap;
}

async function deleteUser() {
  try{
    await deleteUserByLdap(userLdapToDelete.value);
    openDeleteSuccessMessage.value = true;
  } catch (error) {
    displaySnackbar.value = true;
    console.error(error);
  } finally {
    openDeleteDialog.value = false;
    await getUsers();
  }
}

async function addBreakfastDate(ldap: string, date: Date) {
  try {
    await addNextOrganizedBreakfastDate(ldap, date);
  } catch (error) {
    console.error('Error adding breakfast date:', error);
  } finally {
    await getUsers();
    isOpenDatePicker.value = false;
    isOpenAddNextBreakfastDateDialog.value = true;
  }
}

async function validateBreakfastDate(ldap: string, date: string) {
  try {
    await validateBreakfast(ldap, date);
  } catch (error) {
    console.error('Error validating breakfast date:', error);
  } finally {
    await getUsers();
    isOpenValidateBreakfastMessage.value = true;
  }
}

async function removeNextBreakfastDate(ldap: string) {
  try {
    await removeNextOrganizedBreakfastDate(ldap);
  } catch (error) {
    console.error('Error removing next breakfast date:', error);
  } finally {
    await getUsers();
  }
}

const showSnackBar = computed({
  get: () => !!notification.message,
  set: (val: boolean) => {
    if (!val) notification.clear();
  }
});
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
  <div
    v-if="!isLoading"
    class="team-breakfast">
    <h1 class="team-breakfast__title">
      Team Breakfast
    </h1>
    <Datatable
      :users="users"
      :is-open-date-picker="isOpenDatePicker"
      @update:is-open-date-picker="isOpenDatePicker = $event"
      @handle-delete-user="handleDeleteUser"
      @delete-user="deleteUser"
      @handle-add-breakfast-date="addBreakfastDate"
      @validate-breakfast-date="validateBreakfastDate"
      @remove-next-breakfast-date="removeNextBreakfastDate"
    />
    <ActionBottomBar>
      <v-btn
        color="#007f8c"
        variant="elevated"
        :disabled="!isAdmin"
        @click="router.push({ name: 'create-user' })"
      >
        Add user
      </v-btn>
    </ActionBottomBar>
  </div>

  <Snackbar
    v-model:displaySnackBar="displaySnackbar"
    text="Vous n'avez pas les droits pour supprimer cet utilisateur"
    icon="$cancel"
    color="#ea302d"
    :duration="3000"
  />
  <Dialog
    v-model:openDialog="openDeleteDialog"
    title="Supprimer un utilisateur"
    text="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    icon="mdi-delete-outline"
    color-icon="#ea302d"
    label-confirm-button="Supprimer"
    label-cancel-button="Annuler"
    @confirm="deleteUser"
    @cancel="openDeleteDialog = false"
  />
  <Snackbar
    v-model="openDeleteSuccessMessage"
    text="L'utilisateur a été supprimé avec succès"
    icon="mdi-check-circle-outline"
    color="success"
    :duration="3000"
  />
  <Snackbar
    v-model="isOpenAddNextBreakfastDateDialog"
    text="La date du petit déjeuner a été ajoutée avec succès"
    icon="mdi-check-circle-outline"
    color="success"
    :duration="3000"
  />
  <Snackbar
    v-model:displaySnackBar="showSnackBar"
    :text="notification.message"
    :color="notification.color"
    :icon="notification.icon"
    :duration="3000"
    @update:displaySnackBar="notification.clear()"
  />
</template>
<style lang="scss">
.team-breakfast {
  width: 80%;
  &__title {
    text-align: center;
  }
}
</style>
