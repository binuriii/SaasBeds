<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { impactHeading, stats, impactNote } from './ImpactStatsData.js'

const root = ref(null)
const active = ref(0)
const entered = ref(false)
const intro = ref(false) // stagger delay only on the first entrance
let io = null
let t = null

const prev = () => { active.value = (active.value - 1 + stats.length) % stats.length }
const next = () => { active.value = (active.value + 1) % stats.length }

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    entered.value = true
    return
  }
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      intro.value = true
      entered.value = true
      t = setTimeout(() => { intro.value = false }, 2200)
      io.disconnect()
    }
  }, { threshold: 0.3 })
  io.observe(root.value)
})

onBeforeUnmount(() => {
  io && io.disconnect()
  clearTimeout(t)
})
</script>

<template>
  <section ref="root" class="section imp" :class="{ 'is-in': entered, 'is-intro': intro }">
    <div class="container">
      <!-- heading + arrows -->
      <div class="imp__head reveal">
        <div class="stack">
          <h2>{{ impactHeading.title }}</h2>
          <p class="lead text-muted">{{ impactHeading.description }}</p>
        </div>

        <div class="imp__arrows">
          <button type="button" class="imp__arrow" aria-label="Previous" @click="prev">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
          </button>
          <button type="button" class="imp__arrow" aria-label="Next" @click="next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
          </button>
        </div>
      </div>

      <!-- stage: the active item expands into the wide card -->
      <div class="imp__stage">
        <div
          v-for="(s, i) in stats"
          :key="s.id"
          class="imp__item"
          :class="[`imp__item--${s.tone}`, { 'is-active': active === i }]"
          :style="{ '--h': s.h + '%', '--i': i }"
          :role="active === i ? undefined : 'button'"
          :tabindex="active === i ? -1 : 0"
          :aria-label="active === i ? undefined : `${s.value} ${s.label}`"
          @click="active = i"
          @keydown.enter="active = i"
        >
          <!-- text (open card only) -->
          <div class="imp__detail">
            <h3>{{ s.title }}</h3>
            <a :href="s.link" class="more" :tabindex="active === i ? 0 : -1" @click.stop>Read case study →</a>
          </div>

          <!-- image (open card only) -->
          <div class="imp__media">
            <img v-if="s.src" :src="s.src" :alt="s.alt" loading="lazy" />
          </div>

          <!-- number + label (always visible) -->
          <div class="imp__sum">
            <strong class="imp__big">{{ s.value }}</strong>
            <span class="label">{{ s.label }}</span>
          </div>
        </div>
      </div>

      <p class="imp__note text-muted">{{ impactNote }}</p>
    </div>
  </section>
</template>

<style scoped src="./ImpactStats.css"></style>