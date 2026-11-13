<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { dashboardHeading, intro, sidebar, tabs, days } from './DashboardPreview.js'

const names = Object.keys(tabs)
const active = ref(names[0])
const data = computed(() => tabs[active.value])

const root = ref(null)
const entered = ref(false)
const nums = ref(data.value.stats.map(() => 0))

const fmt = (s, n) => `${s.prefix || ''}${Math.round(n).toLocaleString('en-US')}${s.suffix || ''}`

/* count-up */
let raf = 0
function count() {
  cancelAnimationFrame(raf)
  const stats = data.value.stats
  const t0 = performance.now()
  const dur = 900
  const tick = (t) => {
    const p = Math.min((t - t0) / dur, 1)
    const e = 1 - Math.pow(1 - p, 3)
    nums.value = stats.map((s) => s.value * e)
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

/* auto-cycling tabs, only while the section is on screen */
let timer = null
let io = null
let reduced = false
const stop = () => clearInterval(timer)
const play = () => {
  stop()
  if (reduced) return
  timer = setInterval(() => {
    active.value = names[(names.indexOf(active.value) + 1) % names.length]
  }, 4200)
}
const select = (name) => { active.value = name; play() }

watch(active, () => { if (entered.value) count() })

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    entered.value = true
    nums.value = data.value.stats.map((s) => s.value)
    return
  }
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (!entered.value) { entered.value = true; count() }
      play()
    } else {
      stop()
    }
  }, { threshold: 0.3 })
  io.observe(root.value)
})

onBeforeUnmount(() => {
  stop()
  cancelAnimationFrame(raf)
  io && io.disconnect()
})
</script>

<template>
  <section id="dashboard-review" ref="root" class="section dp" :class="{ 'is-in': entered }">
    <div class="container">
      <!-- heading (centered) -->
      <div class="dp__head stack reveal">
        <h2>{{ dashboardHeading.title1 }}<br>
        {{ dashboardHeading.title2 }}</h2>
        <p class="lead text-muted">{{ dashboardHeading.description }}</p>
      </div>

      <div class="dp__grid">
        <!-- left: intro -->
        <div id="dashboard-review-intro" class="dp__panel dp__intro">
          <h3 class="dp__item" style="--i: 1">{{ intro.title }}</h3>
          <p class="dp__item" style="--i: 2">{{ intro.text }}</p>
          <div class="dp__actions dp__item" style="--i: 3">
            <a class="btn btn-primary" href="#">Book a demo</a>
            <a class="btn btn-outline" href="#">See it in action</a>
          </div>
        </div>

        <!-- right: animated dashboard -->
        <div id="dashboard-review-preview" class="dp__panel dp__shot">
          <div class="dp__app">
            <div class="dp__sidebar">
              <b class="dp__side" style="--i: 0">SaasBeds</b>
              <i
                v-for="(n, i) in sidebar"
                :key="n"
                class="dp__side"
                :class="{ 'is-active': data.nav === n }"
                :style="{ '--i': i + 1 }"
              >{{ n }}</i>
            </div>

            <div class="dp__main">
              <div class="dp__top">
                <h4>Dashboard · {{ active }}</h4>
                <span class="dp__live"><i class="dp__dot"></i> Live</span>
              </div>

              <div :key="active" class="dp__stats">
                <div v-for="(s, i) in data.stats" :key="s.label" class="dp__stat" :style="{ '--i': i }">
                  <small class="text-muted">{{ s.label }}</small>
                  <strong>{{ fmt(s, nums[i]) }}</strong>
                  <span class="dp__track"><u class="dp__bar" :style="{ width: s.pct + '%', '--i': i }"></u></span>
                </div>
              </div>

              <div :key="active + '-chart'" class="dp__chart">
                <div v-for="(n, i) in data.chart" :key="i" class="dp__colwrap">
                  <s class="dp__col" :style="{ height: n + '%', '--i': i }"></s>
                  <small class="text-muted">{{ days[i] }}</small>
                </div>
              </div>
            </div>
          </div>

          <div class="dp__tabs" role="tablist">
            <button
              v-for="k in names"
              :key="k"
              type="button"
              role="tab"
              class="btn dp__tab"
              :class="{ 'btn-dark': active === k }"
              :aria-selected="active === k"
              @click="select(k)"
            >{{ k }}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./DashboardPreview.css"></style>