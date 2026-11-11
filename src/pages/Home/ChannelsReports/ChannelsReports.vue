<script setup>
import { ch, bars } from './ChannelsReportsData.js'
</script>
<template>
<section class="wrap grid">
  <article class="card night">
    <span class="chip">Channel manager</span>
    <h2 class="h3">Sell everywhere guests are searching</h2>
    <p class="lead">Sync rates and availability across every channel in real time. No double bookings.</p>
    <a href="#" class="more">Channel manager →</a>
    <ul><li v-for="c in ch" :key="c">{{c}}</li></ul>
  </article>
  <article class="card aqua">
    <span class="chip">Reports</span>
    <h2 class="h3">See what drives your revenue</h2>
    <p class="lead">Occupancy, ADR and revenue in one live view, compared with last year.</p>
    <a href="#" class="more">Reports →</a>
    <div class="bars"><s v-for="b in bars" :key="b" :style="{height:b+'%'}"></s></div>
  </article>
</section>
</template>
<style scoped src="./ChannelsReports.css"></style>
