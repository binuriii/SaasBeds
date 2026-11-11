<script setup>
import { apps } from './IntegrationsData.js'
</script>
<template>
<section class="wrap sec row">
  <div><h2 class="h2">Build your SaaSBeds</h2><p class="lead">Plug into the hospitality apps you already use and create a platform that fits your property like a glove.</p><a href="#" class="btn ghost">See all integrations</a></div>
  <div class="pill"><span v-for="a in apps" :key="a[0]" :style="{background:a[1]}">{{a[0]}}</span><span class="plus">+</span></div>
</section>
</template>
<style scoped src="./Integrations.css"></style>
