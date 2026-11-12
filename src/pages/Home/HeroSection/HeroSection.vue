<script setup>
import { computed } from 'vue'
import {
  UiIcon, useTimeline, POOL_IMAGE, GUEST_PHOTO, brand, searchPlaceholder, searchTyped, cursorPath,
  dates, groups, reservations, newReservation, reservation as r,
} from './HeroSectionData.js'

/* calendar layout */
const rooms = groups.flatMap((g) => g.rooms)
const rowOf = (no) => rooms.findIndex((x) => x.no === no) + 2
let offset = 0
const groupRows = groups.map((g) => {
  const start = offset + 2
  offset += g.rooms.length
  return { name: g.name, row: `${start} / span ${g.rooms.length}` }
})
const activeCol = dates.findIndex((d) => d.active) + 3

/* timeline (drives the whole "video") */
const { step } = useTimeline()

const cards = computed(() =>
  [...reservations, newReservation].map((x, i) => ({
    ...x,
    style: { gridRow: rowOf(x.room), gridColumn: `${x.from + 2} / ${x.to + 2}`, '--i': i },
    hidden: x.isNew && step.value < 7,
    selected: x.selected && step.value >= 2,
    done: x.selected && step.value >= 6,
  }))
)

const typed = computed(() => step.value >= 1 && step.value < 8)
const ready = computed(() => step.value >= 2)
const tab = computed(() => (step.value === 3 ? 1 : 0))
const notesOpen = computed(() => step.value >= 4 && step.value < 8)
const pressed = computed(() => step.value === 6)
const checkedIn = computed(() => step.value >= 6)
const cursor = computed(() => ({
  left: `${cursorPath[step.value][0]}%`,
  top: `${cursorPath[step.value][1]}%`,
}))
</script>

<template>
  <section class="section hero">
    <div class="stack">
      <h1 class="hero__title">Simple, yet Powerful Hotel Booking</h1>
      <p class="lead">
        Streamline operations, increase revenue and elevate every guest experience with one powerful hotel PMS platform.
      </p>
      <div class="hero__actions">
        <a href="#demo" class="btn btn-cta">Book a demo</a>
        <a href="#demo-video" class="btn-secondary">See it in action</a>
      </div>
    </div>

    <div class="showcase media">
      <img :src="POOL_IMAGE" alt="Resort swimming pool with umbrellas and sun loungers" />

      <div class="dash" role="img" aria-label="Animated hotel PMS dashboard preview" inert>
        <div class="dash__main">
          <!-- top navigation -->
          <header class="dnav">
            <UiIcon name="menu" :size="20" />
            <strong class="dnav__brand">{{ brand }}</strong>
            <div class="dnav__search fake-field">
              <UiIcon name="search" :size="14" />
              <span v-if="!typed" class="text-muted">{{ searchPlaceholder }}</span>
              <span v-else class="typed">{{ searchTyped }}</span>
            </div>
            <div class="dnav__tools">
              <span class="bell" :class="{ 'is-ring': step === 6 }">
                <UiIcon name="bell" :size="18" /><i v-if="checkedIn" class="bell__dot"></i>
              </span>
              <span class="dnav__avatar">CI</span>
            </div>
          </header>

          <!-- booking calendar -->
          <div class="cal">
            <div class="cal__toolbar">
              <span class="btn-text"><UiIcon name="left" :size="14" /> Today <UiIcon name="right" :size="14" /></span>
              <span class="fake-field">Select date <UiIcon name="down" :size="14" /></span>
              <span class="fake-field">Select space <UiIcon name="down" :size="14" /></span>
            </div>

            <div class="cal__scroll">
              <div class="cal__grid" :style="{ '--rows': rooms.length }">
                <div v-for="(d, i) in dates" :key="d.label" class="cal__date" :class="{ 'is-active': d.active }" :style="{ gridColumn: i + 3 }">
                  <span class="label">{{ d.day }}</span><strong>{{ d.label }}</strong>
                </div>

                <div v-for="g in groupRows" :key="g.name" class="cal__group" :style="{ gridRow: g.row }"><span class="label">{{ g.name }}</span></div>

                <template v-for="(room, i) in rooms" :key="room.no">
                  <div class="cal__room" :style="{ gridRow: i + 2 }"><i class="dot" :class="`dot--${room.status}`"></i><strong>{{ room.no }}</strong></div>
                  <div class="cal__row" :style="{ gridRow: i + 2 }"></div>
                </template>

                <div class="cal__today-col" :style="{ gridColumn: activeCol }"></div>

                <div v-for="c in cards" :key="c.id" class="res" :style="c.style"
                     :class="[`res--${c.tone}`, { 'is-hidden': c.hidden, 'is-selected': c.selected, 'is-done': c.done }]">
                  <UiIcon v-if="c.outOfOrder" name="cross" :size="16" />
                  <UiIcon v-else-if="c.done" name="check" :size="14" />
                  <UiIcon v-else-if="c.locked" name="lock" :size="14" />
                  <strong>{{ c.name }}</strong>
                  <span v-if="c.icons" class="res__icons"><UiIcon v-for="ic in c.icons" :key="ic" :name="ic" :size="13" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- reservation details panel -->
        <aside class="panel">
          <div class="panel__head">
            <UiIcon name="back" :size="18" />
            <h4>{{ r.guest }}</h4>
            <UiIcon name="sync" :size="14" /><UiIcon name="group" :size="14" />
            <span class="panel__end"><UiIcon name="user" :size="16" /><UiIcon name="coin" :size="16" /></span>
          </div>

          <nav class="panel__tabs">
            <span v-for="(t, i) in r.tabs" :key="t" class="panel__tab" :class="{ 'is-active': tab === i }">{{ t }}</span>
          </nav>

          <div class="panel__body" :class="{ 'is-ready': ready }">
            <section class="card">
              <div class="panel__dates">
                <strong>{{ r.from }}</strong><UiIcon name="arrow" :size="14" /><strong>{{ r.to }}</strong>
                <span class="badge" :class="checkedIn ? 'badge--green' : 'badge--blue'">
                  {{ checkedIn ? r.statusDone : r.status }}
                </span>
              </div>
              <p class="text-muted">{{ r.meta }}</p>
              <p>{{ r.code }}</p>
              <div class="accordion-item" :class="{ 'is-open': notesOpen }">
                <div class="accordion-trigger">
                  <span>Notes <span class="badge badge--dark">{{ r.notesCount }}</span></span>
                  <UiIcon name="down" :size="16" class="chev" />
                </div>
                <div class="accordion-panel">
                  <ul class="panel__notes"><li v-for="n in r.notes" :key="n" class="text-muted">{{ n }}</li></ul>
                </div>
              </div>
            </section>

            <section class="card">
              <div class="guest">
                <div class="media"><img :src="GUEST_PHOTO" alt="" width="48" height="48" /></div>
                <div><strong>{{ r.guest }}</strong><p>{{ r.role }} <span class="text-muted">{{ r.party }}</span></p></div>
              </div>
              <div class="tip card card--blue" :class="{ 'is-in': step >= 4 }">
                <span class="label"><UiIcon name="bulb" :size="14" /> Smart tip</span>
                <p>{{ r.tip }}</p>
                <small class="text-muted">{{ r.tipFooter }}</small>
              </div>
              <div class="panel__actions">
                <span class="btn" :class="[checkedIn ? 'btn-primary' : 'btn-dark', { 'is-press': pressed }]">
                  <UiIcon v-if="checkedIn" name="check" :size="14" />{{ checkedIn ? 'Checked in' : 'Check in' }}
                </span>
                <span class="btn btn-outline"><UiIcon name="dots" /></span>
                <span class="btn btn-outline"><UiIcon name="print" /></span>
              </div>
            </section>
          </div>
        </aside>

        <!-- toast + fake cursor -->
        <div class="toast card card--green" :class="{ 'is-in': step >= 6 && step < 8 }">
          <UiIcon name="check" :size="14" /><strong>{{ r.guest }} checked in</strong>
        </div>
        <svg class="cursor" :class="{ 'is-press': pressed }" :style="cursor" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3l14 7-6 2-2 6z" fill="var(--color-black)" stroke="var(--color-white)" stroke-width="1.5" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped src="./HeroSection.css"></style>