<script setup>
import { stats } from './ImpactStatsData.js'
</script>
<template>
<section class="sec wrap">
  <div class="head"><h2 class="h2">Powering hospitality impact</h2><p class="lead">Smarter systems lead to stronger performance. Hotels using SaaSBeds see the difference in revenue, efficiency and guest satisfaction.</p></div>
  <div class="stage">
    <article class="case"><h3 class="h3">Guest houses grow direct bookings with SaaSBeds</h3><a href="#" class="more">Read case study →</a><strong>45%</strong><small>Increase in direct bookings</small></article>
    <div class="steps"><div v-for="s in stats" :key="s[0]" :style="{height:s[2]+'%',background:s[3],color:s[4]}"><strong>{{s[0]}}</strong><small>{{s[1]}}</small></div></div>
  </div>
  <p class="note">Sample figures. Replace with verified customer results.</p>
</section>
</template>
<style scoped src="./ImpactStats.css"></style>
