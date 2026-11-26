<script setup>
import { RouterView } from 'vue-router'

import AppHeader from './components/AppHeader/AppHeader.vue'
import AppFooter from './components/AppFooter/AppFooter.vue'
</script>

<template>
  <div class="app-layout">

    <div class="app-header-wrapper">
      <AppHeader />
    </div>

    <main class="main-content">
      <RouterView />
    </main>

    <AppFooter />

  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}

body {
  font-family: var(--font-primary, 'Outfit', sans-serif);
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  flex-shrink: 0;
}

.main-content {
  position: relative;
  z-index: 0;
  flex: 1;
  min-width: 0;
}
</style>