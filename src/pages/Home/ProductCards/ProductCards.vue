<script setup>
import { rooms } from './ProductCardsData.js'
</script>
<template>
<section class="sec wrap grid">
  <article class="card sky">
    <span class="chip">Front desk</span>
    <h2 class="h3">Run your property your way</h2>
    <p class="lead">Simplify everything from booking to check-out with a cloud-based system designed for daily hotel operations.</p>
    <a href="#" class="more">Explore front desk →</a>
    <div class="cal"><div v-for="r in rooms" :key="r[0]"><em>{{r[0]}}</em><b :style="{gridColumn:r[2]+' / span '+r[3]}">{{r[1]}}</b></div></div>
  </article>
  <article class="card blue">
    <span class="chip">Booking engine</span>
    <h2 class="h3">Turn visitors into direct bookings</h2>
    <p class="lead">A fast booking widget for your own website, with live availability and no commission.</p>
    <a href="#" class="more">Explore booking engine →</a>
    <div class="phone"><b>Deluxe King</b><small>2 nights · $240</small><b>Garden Suite</b><small>3 nights · $410</small><i>Book now</i></div>
  </article>
</section>
</template>
<style scoped src="./ProductCards.css"></style>
