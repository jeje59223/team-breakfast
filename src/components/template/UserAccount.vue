<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useUsersStore } from '@/stores/user.store.js';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import Loading from '@/components/atoms/loading/Loading.vue';
import Account from '@/components/template/Account.vue';
import { useAuth } from '@/stores/authStore.js';

const route = useRoute();
const { getUserByLdap } = useUsersStore();
const { userByLdap, isLoadingUserByLdap } = storeToRefs(useUsersStore());
const ldap = route.params.ldap as string;

const { user, isAdmin } = useAuth();
const userConnected = computed(() => user.value);

onMounted(async () => {
  await getUserByLdap(ldap);
});
</script>

<template>
  <Loading v-model="isLoadingUserByLdap" />
  <Account
    :user="userByLdap"
    :is-display-edit-account-button="userConnected?.ldap === userByLdap?.ldap || isAdmin"
  />
</template>
<style lang="scss">
.user-account {
  padding: 10px;
  min-width: 500px;
  &__header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    min-height: 96px;

    &-picture {
      display: flex;
      max-width: 96px;

      &-avatar {
        width: 100%;
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
    }

    &-email, &-ldap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;

    &-roles {
      display: flex;
      align-items: center;
      padding: 10px;
      gap: 10px;
    }

    &-breakfasts {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px;

      &-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 10px;
      }

      ul {
        padding-left: 0;
        margin-left: 40px;

        li {
          color: #007f8c;
          font-weight: bold;
        }
      }

      &-no-dates {
        color: #007f8c;
        font-style: italic;
      }

      &-next-date {
        &-no-date {
          color: #007f8c;
          font-style: italic;
        }
      }
    }
  }

  span {
    color: #007f8c;
    font-weight: bold;
  }

  &__footer {
    padding: 10px 10px 0 10px;
    text-align: center;
    font-size: 0.9rem;
    color: #767676;
  }
}
</style>
