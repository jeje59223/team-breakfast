<script setup lang="ts">
import { ref } from 'vue';
import { User } from '@/models/user.ts';
import dayjs from 'dayjs';
import { useAuth } from '@/stores/authStore.js';
import DatePicker from '@/components/organisms/date-picker/DatePicker.vue';
import NoAvatar from '@/components/atoms/no-avatar/NoAvatar.vue';
import { getInitials } from '@/utils/get-initials.utils.js';
import noImage from '@/assets/no-image.jpg';
import router from '@/router/index.ts';

const props = defineProps<{
  users: User[]
  isOpenDatePicker: boolean
}>();

const { isAdmin, user } = useAuth();
const defaultPicture = noImage as string;

const emit = defineEmits<{
  (e: 'update:isOpenDatePicker', value: boolean): void;
  (e: 'deleteUser', value: User['ldap']): void;
  (e: 'removeNextBreakfastDate', value: User['ldap']): void;
  (e: 'handleDeleteUser', value: User['ldap']): void;
  (e: 'handleAddBreakfastDate', value: User['ldap'], date: Date): void;
  (e: 'validateBreakfastDate', value: User['ldap'], date: string): void;
}>();

const isLoadingDate = ref<boolean>(false);
const date = ref<Date>();
const userId = ref<string>('');

const headers = ref([
  {
    key: 'picture',
    title: 'Picture',
    sortable: false
  },
  {
    key: 'lastname',
    title: 'Lastname'
  },
  {
    key: 'firstname',
    title: 'Firstname'
  },
  {
    key: 'datesOfOrganizedBreakfasts',
    title: 'Total Breakfast'
  },
  {
    key: 'lastDateOfOrganizedBreakfasts',
    title: 'Last Breakfast'
  },
  {
    key: 'nextOrganizedBreakfastDate',
    title: 'Next breakfast'
  },
  {
    key: 'actions',
    title: 'ACTIONS',
    sortable: false
  }
]);

const allowDate = (date: string): boolean => {
  if (!date) {
    return;
  }
  const nbAppearances = props.users.reduce((total, user) => {
    if (dayjs(user.nextOrganizedBreakfastDate).isSame(date, 'day')) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  return nbAppearances < 2 && (dayjs(date).isSame(dayjs(), 'day') || dayjs(date).isAfter(dayjs(), 'day')) && dayjs(date).day() === 3;
};


const itemsPerPageOptions = [
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: -1, title: 'pages' }
];

const openDatePicker = (ldap: string): void => {
  userId.value = ldap;
  emit('update:isOpenDatePicker', true);
};
</script>
<template>
  <v-data-table
    :items="users"
    :headers="headers"
    :items-per-page-options="itemsPerPageOptions"
    hover
  >
    <template v-slot:[`header.picture`]>
      PICTURE
    </template>
    <template v-slot:[`header.lastname`]="header">
      <div class="d-flex align-center">
        <p>Lastname</p>
        <v-icon
          v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'lastname' && header.sortBy[0].order === 'asc'"
          icon="mdi-arrow-down"
          class="arrow-down"
          color="#037E8C"
        />
        <v-icon
          v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'lastname' && header.sortBy[0].order === 'desc'"
          icon="mdi-arrow-up"
          class="arrow-up"
          size="x-small"
          color="#037E8C"
        />
      </div>
    </template>
    <template v-slot:[`header.firstname`]="header">
      <div class="d-flex align-center">
        <p>Firstname</p>
        <v-icon
          v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'firstname' && header.sortBy[0].order === 'asc'"
          class="arrow-down"
          icon="mdi-arrow-down"
          color="#037E8C"
        />
        <v-icon
          v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'firstname' && header.sortBy[0].order === 'desc'"
          class="arrow-up"
          icon="mdi-arrow-up"
          color="#037E8C"
        />
      </div>
    </template>
    <template v-slot:[`header.numberOfBreakFastOrganised`]="header">
      <div class="d-flex align-center">
        <p>TOTAL BREAKFAST</p>
        <v-icon
          v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'numberOfBreakFastOrganised' && header.sortBy[0].order === 'asc'"
          class="arrow-down"
          icon="mdi-arrow-down"
          color="#037E8C"
        />
        <v-icon
          v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'numberOfBreakFastOrganised' && header.sortBy[0].order === 'desc'"
          class="arrow-up"
          icon="mdi-arrow-up"
          color="#037E8C"
        />
      </div>
    </template>
    <template v-slot:[`header.nextOrganizedBreakfastDate`]="header">
      <div class="d-flex align-center">
        <p>Next breakfast date</p>
        <v-icon
          v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'nextOrganizedBreakfastDate' && header.sortBy[0].order === 'asc'"
          class="arrow-down"
          icon="mdi-arrow-down"
          color="#037E8C"
        />
        <v-icon
          v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'nextOrganizedBreakfastDate' && header.sortBy[0].order === 'desc'"
          class="arrow-up"
          icon="mdi-arrow-up"
          color="#037E8C"
        />
      </div>
    </template>
    <template v-slot:[`header.actions`]></template>
    <template v-slot:[`item.picture`]="{ item }">
      <img
        v-if="item.picture"
        :src="item.picture"
        width="40"
        height="40"
        class="datatable-user-picture"
        :alt="`Avatar de ${item.firstname}`"
        @error="item.picture = defaultPicture"
      />
      <div v-else>
        <NoAvatar class="datatable-user-picture__no-avatar"
                  :initial="getInitials(item)" />
      </div>
    </template>
    <template v-slot:[`item.lastname`]="{ item }">
      {{ item.lastname }}
    </template>
    <template v-slot:[`item.firstname`]="{ item }">
      {{ item.firstname }}
    </template>
    <template v-slot:[`item.datesOfOrganizedBreakfasts`]="{ item }">
      <v-chip
        color="#037E8C"
        density="default"
        tnr-id=""
        :label="true"
        :text="(item.datesOfOrganizedBreakfasts || []).length.toString()"
      />
    </template>
    <template v-slot:[`item.lastDateOfOrganizedBreakfasts`]="{ item }">
      <p
        v-if="item.datesOfOrganizedBreakfasts?.length"
      >
        {{ dayjs(item.datesOfOrganizedBreakfasts[item.datesOfOrganizedBreakfasts.length -1]).format('YYYY-MM-DD') || '' }}
      </p>
    </template>
    <template v-slot:[`item.nextOrganizedBreakfastDate`]="{ item }">
      <div
        v-if="isLoadingDate"
        class="d-flex justify-center"
      >
        <v-progress-circular
          :size="20"
          color="#287F8C"
          indeterminate
        ></v-progress-circular>
      </div>
      <div
        v-else
        class="d-flex align-center ga-1"
      >
        <p
          v-if="item.nextOrganizedBreakfastDate"
          class="mr-4">
          {{ dayjs(item.nextOrganizedBreakfastDate).format('YYYY-MM-DD') }}
        </p>
        <v-tooltip
          v-if="user && item.nextOrganizedBreakfastDate && (user.ldap === item.ldap || isAdmin)"
          text="Delete this date">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-alpha-x-circle-outline"
              color="rgb(198, 17, 18)"
              size="x-small"
              @click="emit('removeNextBreakfastDate', item.ldap)"
            />
          </template>
        </v-tooltip>
        <v-tooltip
          v-if="item.nextOrganizedBreakfastDate && isAdmin"
          text="Validate this breakfast">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-check-circle"
              color="success"
              size="x-small"
              @click="emit('validateBreakfastDate', item.ldap, item.nextOrganizedBreakfastDate)"
            />
          </template>
        </v-tooltip>
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex justify-end ga-1">
        <v-tooltip text="Ajouter une date">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-calendar-blank"
              color="#007f8c"
              size="x-small"
              @click="openDatePicker(item.ldap)"
            />
          </template>
        </v-tooltip>
        <v-tooltip text="Voir le compte">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              size="x-small"
              icon="mdi-eye"
              color="#0b96cc"
              @click="router.push({ name: 'account', params: { ldap: item?.ldap } })"
            />
          </template>
        </v-tooltip>
        <v-tooltip text="Supprimer le compte">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-delete"
              size="x-small"
              color="#c61112"
              :disabled="!isAdmin"
              @click="emit('handleDeleteUser', item.ldap)"
            />
          </template>
        </v-tooltip>
      </div>
    </template>
  </v-data-table>
  <DatePicker
    :allow-date="allowDate"
    :overlay="props.isOpenDatePicker"
    @update:overlay="emit('update:isOpenDatePicker', $event)"
    v-model:date="date"
    :add-next-breakfast-date="() => emit('handleAddBreakfastDate', userId, date)"/>
</template>
<style scoped lang="scss">
.datatable-user-picture {
  border-radius: 50%;
  display: flex;
  align-items: center;
  object-fit: contain;
  background: #007f8c;

  &__no-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.arrow-down, .arrow-up {
  font-size: 20px;
}
</style>
