<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { userMoke } from '@/tests/data/user.ts'
import type { User } from '@/models/user.ts'

const router = useRouter()
const route = useRoute()
const userConnected = ref<User>(userMoke)

const getFullName = () => {
  if (userConnected.value) {
    return `${userConnected?.value?.firstname} ${userConnected?.value?.lastname}`
  }
  return ''
}

const disconnected = () => {
  console.log('disconnected')
}

const getFirstLetterOfFirstname = computed(() => userConnected.value?.firstname.charAt(0).toUpperCase())
</script>

<template>
  <v-card class="SlideBar" tnr-id="slide-bar">
    <v-layout>
      <v-navigation-drawer
        :rail="true"
        :permanent="true"
        expand-on-hover
      >
        <v-list :nav="true">
          <div>
            <v-list-item
              v-if="userConnected && userConnected?.picture"
              :prepend-avatar="userConnected?.picture"
              :title="getFullName()"
              :nav="true"
              tnr-id="slide-bar-user-fullname"
            >
            </v-list-item>
            <v-list-item
              v-else
              tnr-id="SlideBar__no-picture-container"
              :title="getFullName()"
              class="SlideBar__no-picture-container"
            >
              <template v-slot:prepend>
                <div class="SlideBar__no-picture" tnr-id="SlideBar__no-picture-container">{{ getFirstLetterOfFirstname }}</div>
              </template>
            </v-list-item>
          </div>
          <div v-if="!userConnected" tnr-id="slideBar__not-connected">
            <v-list-item tnr-id="SlideBar__no-connected-user"></v-list-item>
          </div>
        </v-list>
        <v-list density="compact" :nav="true" tnr-id="slide-bar-navigation">
          <v-list-item prepend-icon="mdi-home" title="Accueil" :active="route.name === 'home'" value="home" color="#007f8c" tnr-id="slide-bar-home" @click="router.push({ name: 'home' })"></v-list-item>
          <v-divider class="mb-12"></v-divider>
          <v-list-item prepend-icon="mdi-account" :active="route.name === 'account'" title="Mon compte" value="account" color="#007f8c" tnr-id="slide-bar-account" @click="router.push({ name: 'account', params: { ldap: userConnected?.ldap } })"></v-list-item>
          <v-list-item prepend-icon="mdi-food-croissant" :active="route.name === 'breakfast'" title="Team-Breakfast" value="users" color="#007f8c" tnr-id="slide-bar-breakfast" @click="router.push({ name: 'breakfast' })"></v-list-item>
          <v-list-item prepend-icon="mdi-podium" :active="route.name === 'podium'" title="Classement" value="podium" color="#007f8c" tnr-id="slide-bar-podium" @click="router.push({ name: 'podium' })"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div>
            <v-list density="compact" :nav="true">
              <v-list-item prepend-icon="mdi-logout-variant" title="Se déconnecter" value="logout" @click="disconnected"></v-list-item>
            </v-list>
          </div>
        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
<style scoped lang="scss">
.SlideBar {
  z-index: 3;

  &__no-picture {
    width: 30px;
    height: 30px;
    margin-left: -4px;
    background-color: #767676;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-right: 22px;
  }
}
</style>
