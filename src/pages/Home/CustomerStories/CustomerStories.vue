<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storiesHeading, stories } from './CustomerStoriesData.js'

const root = ref(null)
const entered = ref(false)
const progress = ref(0)

let io = null
let raf = 0

const fmt = (card) =>
  Math.round(card.value * progress.value).toLocaleString('en-US') + card.suffix

/* count-up for the number cards */
function count() {
  cancelAnimationFrame(raf)
  const t0 = performance.now()
  const dur = 1600
  const tick = (t) => {
    const p = Math.min((t - t0) / dur, 1)
    progress.value = 1 - Math.pow(1 - p, 3)
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    entered.value = true
    progress.value = 1
    return
  }
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      entered.value = true
      count()
      io.disconnect()
    }
  }, { threshold: 0.2 })
  io.observe(root.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  io && io.disconnect()
})
</script>

<template>
  <section id="customer-stories" ref="root" class="section cs" :class="{ 'is-in': entered }">
    <div class="container">
      <!-- heading (centered) -->
      <div class="cs__head stack reveal">
        <h2>{{ storiesHeading.title }}</h2>
        <p class="lead text-muted">{{ storiesHeading.description }}</p>
      </div>

      <div class="cs__grid">
        <article
          v-for="(card, i) in stories"
          :key="card.id"
          class="cs__card"
          :class="[
            `cs__card--${card.type}`,
            { 'cs__card--span': card.span },
          ]"
          :style="{ '--d': `${(i % 3) * 0.08}s` }"
        >
          <!-- testimonial -->
          <template v-if="card.type === 'quote'">
            <span class="cs__mark" aria-hidden="true">“</span>
            <p class="cs__text">{{ card.text }}</p>

            <div class="cs__foot">
              <div class="cs__person">
                <span class="cs__avatar">
                  <img :src="card.avatar" :alt="card.name" loading="lazy" />
                </span>
                <div>
                  <b>{{ card.name }}</b>
                  <small>{{ card.role }}</small>
                </div>
              </div>

              <div v-if="card.rating" class="cs__rating">
                <div class="cs__stars">
                  <svg v-for="n in 5" :key="n" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.5l2.9 6 6.6.8-4.8 4.6 1.2 6.5L12 17.3 6.1 20.4l1.2-6.5L2.5 9.3l6.6-.8z" />
                  </svg>
                </div>
                <span>{{ card.rating }} <em>Ratings</em></span>
              </div>
            </div>
          </template>

          <!-- number on a photo -->
          <template v-else-if="card.type === 'metric'">
            <div class="cs__bg" :style="{ backgroundImage: `url('${card.image}')` }" aria-hidden="true"></div>
            <div class="cs__shade" aria-hidden="true"></div>
            <div class="cs__copy">
              <strong class="cs__num">{{ fmt(card) }}</strong>
              <p>{{ card.label }}</p>
            </div>
          </template>

          <!-- wide photo -->
          <template v-else>
            <div class="cs__bg" aria-hidden="true">
              <img :src="card.image" :alt="card.alt" loading="lazy" />
            </div>
            <div class="cs__shade" aria-hidden="true"></div>
            <div class="cs__copy">
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </div>
          </template>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="./CustomerStories.css"></style>