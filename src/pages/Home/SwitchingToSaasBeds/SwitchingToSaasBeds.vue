<script setup>
import { reactive, computed, onMounted, onBeforeUnmount, ref } from 'vue'
import './SwitchingToSaasBeds.css'
import { switching, steps, calendar, video } from './SwitchingToSaasBeds.js'

/* ---------- scroll stages (IntersectionObserver only, no scroll listeners) ---------- */
const root = ref(null)
const rightEl = ref(null)
const flags = reactive({ split: false, ui: false, stats: false, video: false })
const desktop = ref(false)
const reduced = ref(false)
const mode = computed(() => (desktop.value && !reduced.value ? 'scroll' : 'static'))

let io = null
let mqDesktop = null
let mqReduce = null

const setAll = (v) => { Object.keys(flags).forEach((k) => { flags[k] = v }) }

// a step is "passed" while its marker is in the upper 55% of the screen, or already above the screen
function onSteps(entries) {
  for (const e of entries) {
    const above = e.boundingClientRect.bottom <= (e.rootBounds ? e.rootBounds.top : 0)
    flags[e.target.dataset.stage] = e.isIntersecting || above
  }
}
// stacked layout: reveal progressively while the visual area scrolls into view
function onReveal(entries) {
  const r = entries[0].intersectionRatio
  if (r >= 0.12) { flags.split = true; flags.ui = true }
  if (r >= 0.3) flags.stats = true
  if (r >= 0.5) flags.video = true
}

function setup() {
  io?.disconnect()
  io = null
  if (!root.value || !rightEl.value) return
  if (reduced.value) { setAll(true); return }
  if (mode.value === 'scroll') {
    io = new IntersectionObserver(onSteps, { rootMargin: '0px 0px -45% 0px', threshold: 0 })
    root.value.querySelectorAll('[data-stage]').forEach((el) => io.observe(el))
  } else {
    setAll(false)
    io = new IntersectionObserver(onReveal, { threshold: [0.12, 0.3, 0.5, 0.7] })
    io.observe(rightEl.value)
  }
}
const syncQueries = () => { desktop.value = mqDesktop.matches; reduced.value = mqReduce.matches; setup() }

onMounted(() => {
  mqDesktop = window.matchMedia('(min-width: 901px)')
  mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  mqDesktop.addEventListener('change', syncQueries)
  mqReduce.addEventListener('change', syncQueries)
  syncQueries()
})
onBeforeUnmount(() => {
  io?.disconnect()
  mqDesktop?.removeEventListener('change', syncQueries)
  mqReduce?.removeEventListener('change', syncQueries)
})
</script>

<template>
  <section
    ref="root"
    class="swx"
    :class="[mode === 'scroll' ? 'swx--scroll' : 'swx--static', { 'is-split': flags.split, 'is-ui': flags.ui, 'is-stats': flags.stats, 'is-video': flags.video }]"
    aria-labelledby="swx-title"
  >
    <!-- icon sprite -->
    <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
      <symbol id="ic-lock" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" /><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" stroke-width="2.4" /></symbol>
      <symbol id="ic-loop" viewBox="0 0 24 24"><path d="M20 12a8 8 0 11-2.4-5.7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" /><path d="M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></symbol>
      <symbol id="ic-people" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.6" fill="currentColor" /><circle cx="6" cy="18" r="2.6" fill="currentColor" /><circle cx="18" cy="18" r="2.6" fill="currentColor" /><path d="M12 8v4M6 15v-3h12v3" fill="none" stroke="currentColor" stroke-width="2" /></symbol>
      <symbol id="ic-access" viewBox="0 0 24 24"><circle cx="12" cy="4.5" r="2.4" fill="currentColor" /><path d="M12 8v6h5l2 6M12 11h5M9 12a5 5 0 105 8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></symbol>
      <symbol id="ic-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.2" /><circle cx="12" cy="12" r="3" fill="currentColor" /></symbol>
      <symbol id="ic-x" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></symbol>
      <symbol id="ic-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></symbol>
      <symbol id="ic-menu" viewBox="0 0 24 24"><path d="M3 6h8M3 12h18M3 18h18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></symbol>
      <symbol id="ic-cal" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="2" /><path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></symbol>
      <symbol id="ic-caret" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></symbol>
    </svg>

    <div class="swx-runway">
      <div v-for="s in steps" :key="s.stage" class="swx-sentinel" :data-stage="s.stage" :style="{ top: `${s.at}%` }" aria-hidden="true"></div>

      <div class="swx-stage">
        <!-- 1. full-width centered intro -->
        <div class="swx-intro" aria-hidden="true">
          <p class="swx-eyebrow">{{ switching.eyebrow }}</p>
          <p class="swx-h">{{ switching.title }}</p>
          <p class="swx-lead">{{ switching.description }}</p>
          <span class="swx-hint"><i></i>{{ switching.hint }}</span>
        </div>

        <!-- 2. right side: calendar UI + small image card (sits under the pink panel) -->
        <div ref="rightEl" class="swx-right">
          <div class="swx-vis">
            <div class="swx-app" aria-hidden="true">
              <div class="cal-head">
                <svg class="ic"><use href="#ic-menu" /></svg>
                <b class="cal-logo">{{ calendar.brand }}</b>
                <span class="cal-search"><svg class="ic"><use href="#ic-search" /></svg>{{ calendar.search }}</span>
              </div>

              <div class="cal-tools">
                <span class="cal-today"><span>‹</span>{{ calendar.today }}<span>›</span></span>
                <span class="cal-pill"><svg class="ic"><use href="#ic-cal" /></svg>{{ calendar.selectDate }}<svg class="ic"><use href="#ic-caret" /></svg></span>
                <span class="cal-pill">{{ calendar.selectSpace }}<svg class="ic"><use href="#ic-caret" /></svg></span>
                <span class="cal-opt">{{ calendar.optimize }}</span>
              </div>

              <div class="cal-grid">
                <div class="cal-days">
                  <span></span>
                  <span v-for="(d, i) in calendar.days" :key="d.date" class="cal-day" :class="{ hl: i === calendar.highlight }"><small>{{ d.dow }}</small><b>{{ d.date }}</b></span>
                </div>

                <div class="cal-rows">
                  <div v-for="r in calendar.rooms" :key="r.no" class="cal-row">
                    <span class="cal-room"><i :class="`dot-${r.tone}`"></i>{{ r.no }}</span>
                    <span v-for="(d, i) in calendar.days" :key="d.date" class="cal-cell" :class="{ hl: i === calendar.highlight }"></span>
                  </div>

                  <div class="cal-groups">
                    <span v-for="g in calendar.groups" :key="g.label" class="cal-group" :style="{ '--n': g.rows }">{{ g.label }}</span>
                  </div>

                  <div class="cal-books">
                    <div
                      v-for="(b, i) in calendar.bookings"
                      :key="i"
                      class="cal-bk"
                      :class="{ blocked: b.blocked }"
                      :style="{ '--r': b.row, '--f': b.from, '--t': b.to, '--k': i }"
                    >
                      <svg v-if="b.blocked" class="ic"><use href="#ic-x" /></svg>
                      <svg v-else-if="b.lock" class="ic"><use href="#ic-lock" /></svg>
                      <span v-if="b.name">{{ b.name }}</span>
                      <span v-if="b.icons" class="cal-icons"><svg v-for="ic in b.icons" :key="ic" class="ic"><use :href="`#ic-${ic}`" /></svg></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- small image card (Unsplash link comes from video.image in the .js file) -->
            <figure v-if="video.image" class="swx-lady">
              <img :src="video.image" :alt="video.label" loading="lazy" decoding="async" />
            </figure>
          </div>
        </div>

        <!-- 3. left panel (pink, curved edge, on top of the blue side) -->
        <div class="swx-copy">
          <p class="swx-eyebrow" style="--k:0">{{ switching.eyebrow }}</p>
          <h2 id="swx-title" class="swx-h" style="--k:1">{{ switching.title }}</h2>
          <p class="swx-lead" style="--k:2">{{ switching.description }}</p>
          <ul class="swx-features">
            <li v-for="(f, i) in switching.features" :key="f" :style="{ '--k': 3 + i }">
              <span class="swx-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
              <span>{{ f }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>