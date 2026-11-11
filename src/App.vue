<script setup>
import AppHeader from './components/AppHeader/AppHeader.vue'
import AppFooter from './components/AppFooter/AppFooter.vue'
</script>
<template>
  <AppHeader />
  <main><router-view /></main>
  <AppFooter />
</template>
