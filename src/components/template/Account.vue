<script setup lang="ts">
import { getInitials } from '@/utils/get-initials.utils.js';
import NoAvatar from '@/components/atoms/no-avatar/NoAvatar.vue';
import { User } from '@/models/user.js';
import noImage from '@/assets/no-image.jpg';
import router from '@/router/index.js';

defineProps<{
  user: User | null;
  isDisplayEditAccountButton?: boolean;
}>();

const defaultPicture = noImage as string;

const handlePictureError = (event: Event) => {
  (event.target as HTMLImageElement).src = defaultPicture;
};
</script>

<template>
  <v-card class="user-account">
    <div class="user-account__header">
      <div class="user-account__header-picture">
        <img
          v-if="user && user.picture"
          class="user-account__header-picture-avatar"
          :src="user.picture"
          @error="handlePictureError"
        >
        <NoAvatar
          v-else
          class="user-account__header-picture-no-avatar"
          :initial="user ? getInitials(user) : ''"
        />
      </div>
      <div class="user-account__header-identity">
        <div class="user-account__header-identity-title">
          <h1 class="user-account__header-title-full-name">
            {{ user?.firstname }} {{ user?.lastname }}
          </h1>
          <v-btn
            v-if="isDisplayEditAccountButton"
            size="x-small"
            icon="mdi-pencil"
            @click="router.push({ name: 'update-account', params: { ldap: user?.ldap } })"
          />
        </div>
        <p class="user-account__header-email">
          <v-icon
            small
            color="#767676"
          >
            mdi-email
          </v-icon>Email: {{ user?.email }}
        </p>
        <p class="user-account__header-ldap">
          <v-icon
            color="#767676"
            small
          >
            mdi-account-box
          </v-icon>LDAP: {{ user?.ldap }}
        </p>
      </div>
    </div>
    <v-divider />
    <div class="user-account__body">
      <p class="user-account__body-roles">
        <v-icon
          left
          color="#767676"
          small
        >
          mdi-account-cog
        </v-icon>
        {{ user?.roles.join(',') }}
      </p>
      <v-divider />
      <div class="user-account__body-breakfasts">
        <h3 class="user-account__body-breakfasts-title">Organisation des petits-déjeuners</h3>
        <p class="user-account__body-breakfasts-count">
          <v-icon
            color="#767676"
            small
          >
            mdi-coffee-outline
          </v-icon>
          Nombre de petits-déjeuners organisés : <span>{{ user?.datesOfOrganizedBreakfasts.length }}</span>
        </p>
        <p class="user-account__body-breakfasts-next-date">
          <v-icon
            color="#767676"
            small
          >
            mdi-calendar-clock
          </v-icon>
          Prochain petit-déjeuner prévu :
          <span v-if="user?.nextOrganizedBreakfastDate"
                class="user-account__body-breakfasts-next-date-response">

            {{ user?.nextOrganizedBreakfastDate ? new Date(user?.nextOrganizedBreakfastDate).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }) : '' }}
          </span>
          <span
            v-else
            class="user-account__body-breakfasts-next-date-no-date"
          >
            Aucun petit-déjeuner prévu
          </span>
        </p>
        <p class="user-account__body-breakfasts-dates">
          <v-icon
            color="#767676"
            small
          >
            mdi-calendar
          </v-icon>
          Dates des petits-déjeuners organisés :
          <ul
            v-if="user?.datesOfOrganizedBreakfasts.length"
            class="user-account__body-breakfasts-dates-response"
          >
            <li
              v-for="(date, index) in user?.datesOfOrganizedBreakfasts"
              :key="index"
            >
              {{
                new Date(date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })
              }}
            </li>
          </ul>
          <span
            v-else
            class="user-account__body-breakfasts-no-dates"
          >
            Aucune date enregistrée
          </span>
        </p>
      </div>
      <v-divider />
      <div class="user-account__footer">
        Compte crée le {{ user?.creationDate ? new Date(user?.creationDate as string).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }) : 'Date inconnue' }}
      </div>
    </div>
  </v-card>
</template>

<style lang="scss">
.user-account {
  padding: 10px;
  min-width: 550px;
  &__header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    min-height: 96px;
    width: 100%;

    &-identity {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;

      &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

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
