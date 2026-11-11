<script setup>
import { items } from './PropertyTypesData.js'
</script>
<template>
<section class="sec wrap grid">
  <h2 class="h2">See what SaaSBeds can do for you</h2>
  <div class="cards"><a v-for="[t,d] in items" :key="t" href="#" class="c"><h3>{{t}}</h3><p>{{d}}</p><span class="more">Learn more →</span></a></div>
</section>
</template>
<style scoped src="./PropertyTypes.css"></style>
