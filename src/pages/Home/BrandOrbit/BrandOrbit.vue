<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { orbitHeading, logo, attention, flow, confirmed } from './BrandOrbitData.js'

const root = ref(null)
let raf = 0

const clamp = (n) => Math.min(1, Math.max(0, n))

function update() {
  raf = 0
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const total = el.offsetHeight - window.innerHeight
  const p = clamp(-rect.top / total)
  // cards: start shrinking early, arrive at the centre before the end
  el.style.setProperty('--q', clamp((p - 0.08) / 0.72).toFixed(4))
  // logo pop + glow once the cards have arrived
  el.style.setProperty('--k', clamp((p - 0.78) / 0.2).toFixed(4))
}
const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="orbit-wrap">
    <!-- heading (centered) -->
    <div class="section orbit__intro">
      <div class="container">
        <div class="orbit__head stack reveal">
          <h2>{{ orbitHeading.title }}</h2>
          <p class="lead text-muted">{{ orbitHeading.description }}</p>
        </div>
      </div>
    </div>

    <!-- pinned scroll stage -->
    <section ref="root" class="orbit">
      <div class="orbit__stage">
        <!-- background: glow, rings, lines -->
        <div class="orbit__glow"></div>
        <div class="orbit__ring orbit__ring--out"></div>
        <div class="orbit__ring orbit__ring--in"></div>
        <div class="orbit__line orbit__line--dash orbit__line--l"></div>
        <div class="orbit__line orbit__line--dash orbit__line--r"></div>
        <div class="orbit__line orbit__line--solid"></div>

        <!-- center logo tile -->
        <div class="orbit__logo">
          <img v-if="logo.src" :src="logo.src" :alt="logo.alt" />
          <svg v-else viewBox="0 0 48 48" width="52%" height="52%" role="img" :aria-label="logo.alt">
            <path d="M8 34V16m0 10h32V16m0 18V26" fill="none" stroke="var(--color-blue-dark)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="12" y="19" width="10" height="7" rx="2" fill="var(--color-blue-dark)" />
          </svg>
        </div>

        <!-- card 1: top -->
        <article class="orbit__card orbit__card--top">
          <div class="orbit__panel orbit__panel--pink">
            <div class="orbit__row">
              <h3 class="orbit__panel-title">{{ attention.title }}</h3>
              <span class="orbit__count">{{ attention.count }}</span>
            </div>
            <ul class="orbit__list">
              <li v-for="it in attention.items" :key="it.name">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                <div><strong>{{ it.name }}</strong><small>{{ it.meta }}</small></div>
              </li>
            </ul>
          </div>
          <div class="orbit__text">
            <h3>{{ attention.heading }}</h3>
            <p>{{ attention.text }}</p>
          </div>
        </article>

        <!-- card 2: bottom left -->
        <article class="orbit__card orbit__card--left">
          <div class="orbit__panel orbit__panel--blue">
            <div class="orbit__steps">
              <template v-for="(s, i) in flow.steps" :key="s">
                <span class="orbit__step" :style="{ '--i': i }">{{ s }}</span>
                <svg v-if="i < flow.steps.length - 1" class="orbit__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
              </template>
            </div>
            <h3 class="orbit__panel-title">{{ flow.title }}</h3>
            <p>{{ flow.text }}</p>
            <small class="orbit__meta">{{ flow.meta }}</small>
          </div>
          <div class="orbit__text">
            <h3>{{ flow.heading }}</h3>
            <p>{{ flow.paragraph }}</p>
          </div>
        </article>

        <!-- card 3: bottom right -->
        <article class="orbit__card orbit__card--right">
          <div class="orbit__panel orbit__panel--lime">
            <div class="orbit__bar">
              <span class="orbit__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7h14v12H5zM12 3v4M9 12v.01M15 12v.01" /></svg>
              </span>
              <span class="orbit__pill"><i></i> {{ confirmed.status }}</span>
            </div>
            <h3 class="orbit__panel-title orbit__panel-title--lg">{{ confirmed.title }}</h3>
            <p>{{ confirmed.text }}</p>
          </div>
          <div class="orbit__text">
            <h3>{{ confirmed.heading }}</h3>
            <p>{{ confirmed.paragraph }}</p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped src="./BrandOrbit.css"></style>