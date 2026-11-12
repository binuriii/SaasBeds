<script setup>
import { ref, computed } from 'vue'
import { tabs } from './DashboardPreview.js'
const activeTab = ref('Bookings'), rows = computed(()=>tabs[activeTab.value])
</script>
<template>
<section id="dashboard-review" class="dr-section wrap">
  <div id="dashboard-review-intro" class="dr-panel dr-intro">
    <span class="dr-tag">Hotel booking management software</span>
    <h1 class="dr-title">Simple, yet powerful for modern hotels</h1>
    <p>Run bookings, channels, payments and housekeeping from one dashboard built to simplify your daily operations.</p>
    <div class="dr-actions"><a class="btn solid" href="#">Book a demo</a><a class="btn ghost" href="#">See it in action</a></div>
  </div>
  <div id="dashboard-review-preview" class="dr-panel dr-shot">
    <div class="dr-app">
      <div class="dr-sidebar"><b>SaasBeds</b><i v-for="n in ['Front Desk','Dashboard','Bookings','Marketing']" :key="n">{{n}}</i></div>
      <div class="dr-main">
        <h5>Dashboard · {{activeTab}}</h5>
        <div class="dr-grid"><div v-for="r in rows" :key="r[0]" class="dr-stat"><small>{{r[0]}}</small><strong>{{r[1]}}</strong><span><u :style="{width:r[2]+'%'}"></u></span></div></div>
        <div class="dr-chart"><s v-for="n in [40,62,48,80,66,92,74]" :key="n+Math.random()" :style="{height:n+'%'}"></s></div>
      </div>
    </div>
    <div class="dr-tabs"><button v-for="(v,k) in tabs" :key="k" :class="{'is-active':activeTab===k}" @click="activeTab=k">{{k}}</button></div>
  </div>
</section>
</template>
<style scoped src="./DashboardPreview.css"></style>