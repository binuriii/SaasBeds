
<script setup>
import AppHeader from './components/AppHeader/AppHeader.vue'
import AppFooter from './components/AppFooter/AppFooter.vue'
</script>

<template>
  <div class="app-layout">
    <!-- SaaSBeds Premium Header -->
    <AppHeader />
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
  font-family: Arial, Helvetica, sans-serif;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  min-width: 0;
}
</style>
