<script setup lang="ts">
import { RouterView } from 'vue-router'
import SelectLanguage from '@/components/molecules/select-language/SelectLanguage.vue'
import SlideBar from '@/components/molecules/slide-bar/SlideBar.vue'
</script>

<template>
  <SelectLanguage />
  <header>
    <SlideBar />
  </header>

  <RouterView />
</template>
