<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { productCardsHeading, rooms, stays } from './ProductCardsData.js'

const root = ref(null)
const entered = ref(false)
let io = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    entered.value = true
    return
  }
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      entered.value = true
      io.disconnect()
    }
  }, { threshold: 0.2 })
  io.observe(root.value)
})

onBeforeUnmount(() => io && io.disconnect())
</script>

<template>
  <section ref="root" class="section pc" :class="{ 'is-in': entered }">
    <div class="container">
      <!-- heading -->
      <div class="pc__head stack reveal">
        <h2>{{ productCardsHeading.title1 }}<br>
          {{ productCardsHeading.title2 }}
        </h2>
        <p class="lead text-muted">{{ productCardsHeading.description }}</p>
      </div>

      <!-- cards -->
      <div class="pc__grid">
        <article class="pc__card pc__card--sky" style="--c: 0">
          <span class="badge pc__badge pc__in" style="--i: 0">Front desk</span>
          <h3 class="pc__in" style="--i: 1">Run your property your way</h3>
          <p class="lead pc__in" style="--i: 2">
            Simplify everything from booking to check-out with a cloud-based system designed for daily hotel operations.
          </p>
          <a href="#" class="more pc__in" style="--i: 3">Explore front desk →</a>

          <div class="pc__cal" aria-hidden="true">
            <div v-for="(r, i) in rooms" :key="r.no" class="pc__row">
              <em>{{ r.no }}</em>
              <b :style="{ gridColumn: `${r.start + 1} / span ${r.span}`, '--r': i }">{{ r.name }}</b>
            </div>
          </div>
        </article>

        <article class="pc__card pc__card--deep" style="--c: 1">
          <span class="badge pc__badge pc__in" style="--i: 0">Booking engine</span>
          <h3 class="pc__in" style="--i: 1">Turn visitors into direct bookings</h3>
          <p class="lead pc__in" style="--i: 2">
            A fast booking widget for your own website, with live availability and no commission.
          </p>
          <a href="#" class="more pc__in" style="--i: 3">Explore booking engine →</a>

          <div class="pc__phone" aria-hidden="true">
            <div v-for="(s, i) in stays" :key="s.name" class="pc__stay" :style="{ '--s': i }">
              <strong>{{ s.name }}</strong>
              <small class="text-muted">{{ s.meta }}</small>
            </div>
            <span class="btn btn-cta pc__book">Book now</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="./ProductCards.css"></style>