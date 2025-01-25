<script setup lang="ts">
import French from '@/components/atoms/french/French.vue';
import English from '@/components/atoms/english/English.vue';
import { ref } from 'vue';

const isFrenchLanguageSelected = ref<boolean>(true);
const isEnglishLanguageSelected = ref<boolean>(false);

const selectFrenchLanguage = () => {
  isFrenchLanguageSelected.value = true;
  isEnglishLanguageSelected.value = false;
};

const selectEnglishLanguage = () => {
  isEnglishLanguageSelected.value = true;
  isFrenchLanguageSelected.value = false;
};
</script>
<template>
  <div
    class="select-language-container"
    tnr-id="SelectLanguageContainer"
  >
    <div
      class="select-language-container__choice"
      tnr-id="select-language-container__choice"
    >
      <French
        tnr-id="select-language-container__choice_french"
        @click="selectFrenchLanguage"
        :is-selected="isFrenchLanguageSelected"
      />
      <English
        tnr-id="select-language-container__choice_english"
        @click="selectEnglishLanguage"
        :is-selected="isEnglishLanguageSelected"
      />
    </div>
  </div>
</template>
<style lang="scss">
.select-language-container {
  width: 100%;
  height: 70px;
  background-color: #007f8c;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
  color: white;
  position: fixed;
  top: 0;
  left: 0;

  &__choice {
    display: flex;
    gap: 20px;
    padding: 20px;
  }
}
</style>
