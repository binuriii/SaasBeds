<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './MeetAITeam.css'
import { switching, staff, guest, video } from './MeetAITeamData.js'

// tab: 0 = AI Receptionist, 1 = AI Front Desk Manager.
// step: 0..3 reveals each demo beat, driven by scroll position.
const root = ref(null)
const track = ref(null)
const pin = ref(null)
const stage = ref(null)
const inView = ref(false)
const isStatic = ref(false) // reduced motion: no pinning, final state shown
const tab = ref(0)
const step = ref(0)

let ioEnter = null
let raf = 0
let desktop = null
let reduced = false

const clamp = (n) => Math.max(0, Math.min(1, n))
const pinned = () => !reduced && desktop.matches

// pin height is written to a CSS variable so the track is exactly content + scroll distance
function measure() {
  if (!root.value || !pin.value) return
  root.value.style.setProperty('--pin-h', `${pin.value.offsetHeight}px`)
}

// where the pinned content sticks (vertically centered)
const stickTop = () => Math.max(0, (window.innerHeight - pin.value.offsetHeight) / 2)

// scroll progress 0..1 through the whole animation
function progressNow() {
  if (pinned()) {
    const r = track.value.getBoundingClientRect()
    const total = r.height - pin.value.offsetHeight
    return total > 0 ? clamp((stickTop() - r.top) / total) : 0
  }
  // not pinned (mobile): follow the card as it travels up the screen
  const r = stage.value.getBoundingClientRect()
  const vh = window.innerHeight
  return clamp((vh * 0.85 - r.top) / (r.height * 0.9 + vh * 0.3))
}

// the scroll position (in px) that corresponds to progress p
function scrollTargetFor(p) {
  if (pinned()) {
    const r = track.value.getBoundingClientRect()
    const total = r.height - pin.value.offsetHeight
    return window.scrollY + r.top - (stickTop() - p * total)
  }
  const r = stage.value.getBoundingClientRect()
  const vh = window.innerHeight
  const desiredTop = vh * 0.85 - p * (r.height * 0.9 + vh * 0.3)
  return window.scrollY + r.top - desiredTop
}

// map progress to tab + step
function apply(p) {
  if (p < 0.5) {
    tab.value = 0
    step.value = p < 0.05 ? 0 : p < 0.17 ? 1 : p < 0.3 ? 2 : 3
  } else {
    tab.value = 1
    step.value = p < 0.55 ? 0 : p < 0.66 ? 1 : p < 0.8 ? 2 : 3
  }
  // circles drift with scroll
  stage.value?.style.setProperty('--p', (p * 2 - 1).toFixed(3))
}

function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    if (!stage.value) return
    apply(progressNow())
  })
}

function onResize() {
  measure()
  onScroll()
}

const pick = (i) => {
  if (reduced) { tab.value = i; step.value = 3; return }
  window.scrollTo({ top: scrollTargetFor(i ? 0.88 : 0.35), behavior: 'smooth' })
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  desktop = window.matchMedia('(min-width: 901px)')

  if (reduced) {
    isStatic.value = true
    inView.value = true
    step.value = 3
    return
  }

  measure()

  // entrance animation when the section first appears
  ioEnter = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { inView.value = true; ioEnter.disconnect() }
  }, { threshold: 0 })
  ioEnter.observe(root.value)

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  onScroll()
})

onBeforeUnmount(() => {
  ioEnter?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <section
    ref="root"
    class="section meet-ai-team"
    :class="{ 'is-in': inView, 'is-static': isStatic }"
    aria-labelledby="meet-ai-team-title"
  >
    <div ref="track" class="meet-ai-team__track">
      <div ref="pin" class="meet-ai-team__pin">
        <div class="container meet-ai-team__grid">
          <div>
            <h2 id="meet-ai-team-title" class="meet-ai-team__title meet-ai-team__enter" style="--i:0">{{ switching.title }}</h2>

            <div class="meet-ai-team__tabs meet-ai-team__enter" style="--i:1">
              <button
                v-for="(f, i) in switching.features"
                :key="f.title"
                type="button"
                class="meet-ai-team__tab"
                :class="[`meet-ai-team__tab--${i ? 'guest' : 'staff'}`, { 'is-on': tab === i }]"
                :aria-pressed="tab === i"
                @click="pick(i)"
              >
                <span>
                  <span class="meet-ai-team__tab-title">{{ f.title }}</span>
                  <span class="meet-ai-team__tab-text">{{ f.description }}</span>
                </span>
              </button>
            </div>

            <div class="meet-ai-team__enter" style="--i:2">
              <a :href="switching.link.url" class="btn btn-dark meet-ai-team__cta">{{ switching.link.text }}</a>
            </div>
          </div>

          <div
            ref="stage"
            class="meet-ai-team__stage meet-ai-team__enter"
            :class="`meet-ai-team__stage--${tab ? 'guest' : 'staff'}`"
            aria-hidden="true"
          >
            <div class="meet-ai-team__sheet">
              <!-- AI Receptionist -->
              <div class="meet-ai-team__scene" :class="{ 'is-on': tab === 0 }">
                <div class="meet-ai-team__bar">
                  <span class="meet-ai-team__avatar">AI</span>
                  <span class="meet-ai-team__name">{{ staff.title }}</span>
                  <span class="meet-ai-team__live"><i></i>{{ staff.badge }}</span>
                </div>
                <div class="meet-ai-team__thread">
                  <div class="meet-ai-team__msg meet-ai-team__me meet-ai-team__reveal" :class="{ 'is-on': step >= 1 }">{{ staff.question }}</div>

                  <div class="meet-ai-team__msg meet-ai-team__ai meet-ai-team__reveal" :class="{ 'is-on': step >= 2 }">
                    <div class="meet-ai-team__lead">{{ staff.answer }}</div>
                    <div
                      v-for="(r, i) in staff.rooms"
                      :key="r.type"
                      class="meet-ai-team__row meet-ai-team__reveal"
                      :class="{ 'is-on': step >= 2, 'is-picked': i === 0 }"
                      :style="{ '--d': `${0.3 + i * 0.12}s` }"
                    >
                      <span class="meet-ai-team__tile" :class="`meet-ai-team__tile--${i}`">{{ r.type[0] }}</span>
                      <span class="meet-ai-team__grow"><span class="meet-ai-team__strong">{{ r.type }}</span><span class="meet-ai-team__sub">{{ r.plan }}</span></span>
                      <span class="meet-ai-team__end"><span class="meet-ai-team__strong">{{ r.price }}</span><span class="meet-ai-team__sub meet-ai-team__ok">{{ r.left }}</span></span>
                    </div>
                  </div>

                  <div class="meet-ai-team__folio meet-ai-team__reveal" :class="{ 'is-on': step >= 3 }">
                    <div class="meet-ai-team__folio-top"><span>{{ staff.draft.label }}</span><span class="meet-ai-team__state">{{ staff.draft.state }}</span></div>
                    <div class="meet-ai-team__folio-main">
                      <span class="meet-ai-team__grow"><span class="meet-ai-team__strong">{{ staff.draft.room }}</span><span class="meet-ai-team__sub">{{ staff.draft.dates }}</span></span>
                      <span class="meet-ai-team__strong meet-ai-team__price">{{ staff.draft.price }}</span>
                    </div>
                    <div class="meet-ai-team__perf"></div>
                    <div class="meet-ai-team__acts"><span class="meet-ai-team__ghost">{{ staff.draft.edit }}</span><span class="meet-ai-team__dark">{{ staff.draft.confirm }}</span></div>
                  </div>
                </div>
              </div>

              <!-- AI Front Desk Manager -->
              <div class="meet-ai-team__scene" :class="{ 'is-on': tab === 1 }">
                <div class="meet-ai-team__bar">
                  <img v-if="video.image" class="meet-ai-team__photo" :src="video.image" :alt="video.label" loading="lazy" decoding="async" />
                  <span class="meet-ai-team__name">{{ guest.title }}</span>
                  <span class="meet-ai-team__live meet-ai-team__live--guest"><i></i>{{ guest.badge }}</span>
                </div>
                <div class="meet-ai-team__thread">
                  <div class="meet-ai-team__msg meet-ai-team__me meet-ai-team__me--guest meet-ai-team__reveal" :class="{ 'is-on': step >= 1 }">{{ guest.question }}</div>
                  <div class="meet-ai-team__msg meet-ai-team__ai meet-ai-team__reveal" :class="{ 'is-on': step >= 2 }" style="--d:.1s">{{ guest.answer }}</div>
                  <div class="meet-ai-team__msg meet-ai-team__me meet-ai-team__me--guest meet-ai-team__reveal" :class="{ 'is-on': step >= 2 }" style="--d:.5s">{{ guest.reply }}</div>
                  <div class="meet-ai-team__offer meet-ai-team__reveal" :class="{ 'is-on': step >= 3 }">
                    <span class="meet-ai-team__grow"><span class="meet-ai-team__strong">{{ guest.offer.room }}</span><span class="meet-ai-team__sub">{{ guest.offer.plan }}</span></span>
                    <span class="meet-ai-team__strong meet-ai-team__price">{{ guest.offer.price }}</span>
                    <span class="meet-ai-team__book">{{ guest.offer.cta }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>