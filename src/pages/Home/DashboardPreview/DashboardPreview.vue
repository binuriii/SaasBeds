<script setup>
import { ref, computed } from 'vue'
import { tabs } from './DashboardPreview.js'
const tab = ref('Bookings'), rows = computed(()=>tabs[tab.value])
</script>
<template>
<section class="hero wrap">
  <div class="panel intro">
    <span class="tag">Hotel booking management software</span>
    <h1>Simple, yet powerful for modern hotels</h1>
    <p>Run bookings, channels, payments and housekeeping from one dashboard built to simplify your daily operations.</p>
    <div class="row"><a class="btn solid" href="#">Book a demo</a><a class="btn ghost" href="#">See it in action</a></div>
  </div>
  <div class="panel shot">
    <div class="app">
      <div class="side"><b>SaasBeds</b><i v-for="n in ['Front Desk','Dashboard','Bookings','Marketing']" :key="n">{{n}}</i></div>
      <div class="main">
        <h5>Dashboard · {{tab}}</h5>
        <div class="grid"><div v-for="r in rows" :key="r[0]" class="stat"><small>{{r[0]}}</small><strong>{{r[1]}}</strong><span><u :style="{width:r[2]+'%'}"></u></span></div></div>
        <div class="chart"><s v-for="n in [40,62,48,80,66,92,74]" :key="n+Math.random()" :style="{height:n+'%'}"></s></div>
      </div>
    </div>
    <div class="pills"><button v-for="(v,k) in tabs" :key="k" :class="{on:tab===k}" @click="tab=k">{{k}}</button></div>
  </div>
</section>
</template>
<style scoped src="./DashboardPreview.css"></style>
