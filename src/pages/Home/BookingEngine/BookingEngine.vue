<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  head, features, nav, stats, avail, days, revenue, peak, bookings, yTicks,
  platforms, rating, tasks, ICONS, smooth, mobileApp, support
} from './BookingEngineData.js'

/* ---------- animation timeline (ms after the section enters the viewport) ----------
   1 panel · 2 sidebar (items one by one) · 3 top bar · 4 stat cards (one by one)
   5 availability · 6 revenue · 7 reservations · 8 platforms · 9 rating · 10 tasks */
const TIMELINE = [200, 600, 1700, 2200, 3100, 3700, 4500, 5300, 5900, 6500]
const LOOP_AT = 14000
const root = ref(null)
const step = ref(0)
const prog = ref(0)
const leaving = ref(false)
const lower = ref(null)
const entered = ref(false)
let timers = [], raf = 0, io = null, io2 = null, started = false

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const later = (fn, ms) => timers.push(setTimeout(fn, ms))
const clearAll = () => { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf) }

function countUp() {
  cancelAnimationFrame(raf)
  const t0 = performance.now()
  const tick = (n) => {
    const p = Math.min(1, (n - t0) / 1200)
    prog.value = 1 - Math.pow(1 - p, 3)
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

function play() {
  clearAll()
  leaving.value = false
  step.value = 0
  prog.value = 0
  if (reduce()) { step.value = TIMELINE.length; prog.value = 1; return }
  TIMELINE.forEach((ms, i) => later(() => {
    step.value = i + 1
    if (i + 1 === 4) countUp()
  }, ms))
  later(() => { leaving.value = true }, LOOP_AT)
  later(play, LOOP_AT + 700)
}

onMounted(() => {
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !started) { started = true; play() }
    else if (!e.isIntersecting && started) { started = false; clearAll(); step.value = 0 }
  }, { threshold: 0.25 })
  io.observe(root.value)

  // lower cards: slide in once when they scroll into view
  if (reduce()) { entered.value = true; return }
  io2 = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { entered.value = true; io2.disconnect() }
  }, { threshold: 0.3 })
  io2.observe(lower.value)
})
onBeforeUnmount(() => { clearAll(); io && io.disconnect(); io2 && io2.disconnect() })

/* ---------- derived values ---------- */
const fmt = (n) => Math.round(n).toLocaleString('en-US')
const statVal = (s) => (s.prefix || '') + fmt(s.value * prog.value)
const chart = smooth(revenue, 210, 70, 50, 200)
const marker = { x: chart.pts[peak][0] / 210 * 100, y: chart.pts[peak][1] / 70 * 100 }
const scale = (v) => ((v - 10) / 70) * 100
const donut = computed(() => {
  let acc = 0
  return platforms.map((p) => {
    const on = step.value >= 8 ? p.pct : 0
    const seg = { ...p, dash: `${on} ${100 - on}`, off: -acc }
    acc += p.pct
    return seg
  })
})
const total = computed(() => fmt(step.value >= 8 ? 1234 * prog.value : 0))
</script>

<template>
  <section id="booking-engine" class="section be">
    <div class="container">
    <header class="be__head stack reveal">
      <h2>{{ head.title1 }}<br>{{ head.title2 }}</h2>
      <p class="lead text-muted">{{ head.text }}</p>
    </header>

    <div ref="root" class="be__frame">
      <!-- ============ animated dashboard ============ -->
      <div class="be__panel">
        <div class="be__dash" :class="{ 'is-on': step >= 1, 'is-out': leaving }" role="img"
             aria-label="Animated SaaSBeds hotel dashboard preview">

          <aside class="side" :class="{ 'is-on': step >= 2 }">
            <div class="side__brand"><b>SaasBeds</b><i><svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7" /></svg></i></div>
            <ul>
              <li v-for="(n, i) in nav" :key="n.label" :class="{ active: n.active }"
                  :style="{ '--d': i * 0.18 + 's' }">
                <svg viewBox="0 0 24 24"><path :d="ICONS[n.icon]" /></svg>{{ n.label }}
              </li>
            </ul>
          </aside>

          <div class="main">
            <!-- top bar -->
            <div class="top" :class="{ 'is-on': step >= 3 }">
              <strong>Dashboard</strong>
              <span class="top__search"><svg viewBox="0 0 24 24"><path :d="ICONS.search" /></svg>search...</span>
              <span class="top__ic"><svg viewBox="0 0 24 24"><path :d="ICONS.chat" /></svg></span>
              <span class="top__ic has-dot"><svg viewBox="0 0 24 24"><path :d="ICONS.alarm" /></svg></span>
              <span class="top__ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg></span>
              <span class="top__pill">How to Set Up</span>
            </div>

            <div class="body">
              <div class="left">
                <!-- stat cards -->
                <div class="stats" :class="{ 'is-on': step >= 4 }">
                  <div v-for="(s, i) in stats" :key="s.label" class="stat" :class="`t-${s.tone}`"
                       :style="{ '--d': i * 0.28 + 's' }">
                    <small>{{ s.label }}</small>
                    <em><svg v-if="i < 3" viewBox="0 0 24 24"><path :d="ICONS[i === 1 ? 'inn' : i === 2 ? 'out' : 'cal']" /></svg></em>
                    <strong>{{ statVal(s) }}</strong>
                    <span class="delta">
                      <b class="pill" :class="i === 0 ? 'white' : s.up ? 'up' : 'down'">{{ s.up ? '↗' : '↘' }} {{ s.delta }}</b>
                      <i>From Last Month</i>
                    </span>
                  </div>
                </div>

                <div class="row2">
                  <!-- room availability -->
                  <div class="pn avail" :class="{ 'is-on': step >= 5 }">
                    <h6>Room Availability</h6>
                    <div class="avail__bar">
                      <s v-for="(g, i) in avail.segments" :key="g.label"
                         :style="{ width: g.w + '%', background: g.c, '--d': i * 0.14 + 's' }"></s>
                    </div>
                    <div class="avail__grid">
                      <div v-for="(g, i) in avail.grid" :key="g.label" :style="{ '--bar': g.c, '--d': .5 + i * 0.12 + 's' }">
                        <small>{{ g.label }}</small><strong>{{ fmt(g.value * prog) }}</strong>
                      </div>
                    </div>
                  </div>

                  <!-- revenue -->
                  <div class="pn rev" :class="{ 'is-on': step >= 6 }">
                    <h6>Revenue<span class="chip">23 h</span><span class="sel">Last 7 Days ⌄</span></h6>
                    <div class="rev__plot">
                      <div class="rev__y"><i>200k</i><i>150k</i><i>100k</i><i>50k</i></div>
                      <div class="rev__chart">
                        <svg viewBox="0 0 210 70" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="beArea" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0" stop-color="#DCE5FA" stop-opacity=".95" />
                              <stop offset="1" stop-color="#DCE5FA" stop-opacity="0" />
                            </linearGradient>
                          </defs>
                          <path class="rev__area" :d="chart.area" fill="url(#beArea)" />
                          <path class="rev__line" :d="chart.line" pathLength="1" />
                        </svg>
                        <i class="rev__dot" :style="{ left: marker.x + '%', top: marker.y + '%' }"></i>
                      </div>
                    </div>
                    <div class="rev__x"><i v-for="d in days" :key="d">{{ d }}</i></div>
                  </div>
                </div>

                <div class="row3">
                  <!-- reservations -->
                  <div class="pn resv" :class="{ 'is-on': step >= 7 }">
                    <h6>Reservations <span class="sel">Last 7 Days ⌄</span></h6>
                    <div class="legend"><i class="b"></i>Booked <i class="c"></i>Cancelled</div>
                    <div class="resv__plot">
                      <div class="resv__y"><i v-for="t in yTicks" :key="t">{{ t }}</i></div>
                      <div class="resv__bars">
                        <div v-for="(b, i) in bookings" :key="i" class="resv__col" :style="{ '--d': i * 0.09 + 's' }">
                          <s class="c" :style="{ '--h': scale(b[1]) - scale(b[0]) + '%' }"></s>
                          <s class="b" :style="{ '--h': scale(b[0]) + '%' }"></s>
                        </div>
                      </div>
                    </div>
                    <div class="resv__x"><i v-for="d in days" :key="d">{{ d.toLowerCase() }}</i></div>
                  </div>

                  <!-- booking by platform -->
                  <div class="pn plat" :class="{ 'is-on': step >= 8 }">
                    <h6>Booking By Platform</h6>
                    <div class="plat__wrap">
                      <div class="plat__donut">
                        <svg viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.915" class="ring" />
                          <circle v-for="p in donut" :key="p.pct + p.label" cx="18" cy="18" r="15.915"
                                  class="seg" :stroke="p.tone" :stroke-dasharray="p.dash" :stroke-dashoffset="p.off" />
                        </svg>
                        <div><strong>{{ total }}</strong><small>Rs.100,000.00</small></div>
                      </div>
                      <ul>
                        <li v-for="p in platforms" :key="p.pct"><i :style="{ background: p.tone }"></i><b>{{ p.pct }}%</b><span>{{ p.label }}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- right column -->
              <div class="right">
                <div class="pn rate" :class="{ 'is-on': step >= 9 }">
                  <h6>Overall Rating</h6>
                  <div class="rate__score">
                    <span class="rate__pill"><b>{{ rating.score }}</b><small>/5</small></span>
                    <span class="rate__txt"><strong>{{ rating.word }}</strong><i>{{ rating.from }}</i></span>
                  </div>
                  <ul>
                    <li v-for="([k, v], i) in rating.rows" :key="k" :style="{ '--d': i * 0.09 + 's' }">
                      <span>{{ k }}</span><s><u :style="{ '--w': (v / 5 * 100) + '%' }"></u></s><b>{{ v }}</b>
                    </li>
                  </ul>
                </div>
                <div class="pn task" :class="{ 'is-on': step >= 10 }">
                  <h6>Tasks <span class="plus">+</span></h6>
                  <ul>
                    <li v-for="(t, i) in tasks" :key="i" :style="{ '--d': i * 0.14 + 's' }">
                      <input type="checkbox" tabindex="-1" aria-hidden="true" />
                      <span :class="`t-${t.tone}`"><small>{{ t.date }}</small>{{ t.text }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ feature cards ============ -->
      <div class="be__cards">
        <article v-for="(f, i) in features" :key="f.title" class="fcard" :class="{ 'is-on': step >= i + 2 }">
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </article>
      </div>
    </div>
    <!-- ============ app + support cards (formerly DashboardPreview) ============ -->
    <div ref="lower" class="dp dp__grid" :class="{ 'is-in': entered }">
      <div class="dp__panel dp__app">
        <span class="dp__tag dp__item" style="--i: 0">{{ mobileApp.tag }}</span>
        <h3 class="dp__item" style="--i: 1">{{ mobileApp.title }}</h3>
        <p class="dp__item" style="--i: 2">{{ mobileApp.text }}</p>
        <div class="dp__actions dp__item" style="--i: 3">
          <a v-for="b in mobileApp.buttons" :key="b.label" :href="b.href" class="dp__btn"
             :aria-label="`${b.small} ${b.label}`">
            <svg v-if="b.store === 'apple'" class="dp__btn-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            <svg v-else class="dp__btn-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#00c3ff" d="M3 1.5 13 12 3 22.5z" />
              <path fill="#32e36b" d="M3 1.5 17.2 9.78 13 12z" />
              <path fill="#ffd500" d="M17.2 9.78 21 12 17.2 14.22 13 12z" />
              <path fill="#ff3a44" d="M13 12 17.2 14.22 3 22.5z" />
            </svg>
            <span class="dp__btn-text">
              <small>{{ b.small }}</small>
              <strong>{{ b.label }}</strong>
            </span>
          </a>
        </div>
      </div>

      <div class="dp__panel dp__support">
        <span class="dp__tag dp__item" style="--i: 0">{{ support.tag }}</span>
        <h3 class="dp__item" style="--i: 1">{{ support.title }}</h3>
        <p class="dp__item" style="--i: 2">
          {{ support.text }}
          <a :href="`tel:${support.tel}`" class="dp__phone">{{ support.phone }}</a>.
        </p>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped src="./BookingEngine.css"></style>
