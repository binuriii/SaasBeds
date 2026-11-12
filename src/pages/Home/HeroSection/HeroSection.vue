<script setup>
import { computed, ref } from 'vue'
import {
  UiIcon, useLiveActivity, POOL_IMAGE, GUEST_PHOTO, brand, searchPlaceholder,
  dates, groups, reservations, reservation as r,
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
const cards = computed(() =>
  reservations.map((x, i) => ({
    ...x,
    style: { gridRow: rowOf(x.room), gridColumn: `${x.from + 2} / ${x.to + 2}`, '--i': i },
  }))
)
const { liveId } = useLiveActivity(reservations.filter((x) => !x.outOfOrder).map((x) => x.id))

/* panel state */
const tab = ref(0)
const notesOpen = ref(false)
</script>

<template>
  <section class="section hero">
    <div class="stack">
      <h1 class="hero__title">Simple, yet Powerful
Hotel Booking</h1>
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

      <div class="dash" role="img" aria-label="Animated hotel PMS dashboard preview">
        <div class="dash__main">
          <!-- top navigation -->
          <header class="dnav">
            <UiIcon name="menu" :size="20" />
            <strong class="dnav__brand">{{ brand }}</strong>
            <input class="dnav__search" type="search" :placeholder="searchPlaceholder" aria-label="Search" readonly tabindex="-1" />
            <div class="dnav__tools"><UiIcon name="bell" :size="18" /><span class="dnav__avatar">CI</span></div>
          </header>

          <!-- booking calendar -->
          <div class="cal">
            <div class="cal__toolbar">
              <button class="btn-text" tabindex="-1"><UiIcon name="left" :size="14" /> Today <UiIcon name="right" :size="14" /></button>
              <select aria-label="Select date" tabindex="-1">
                <option>Select date</option>
                <option v-for="d in dates" :key="d.label">{{ d.day }} {{ d.label }}</option>
              </select>
              <select aria-label="Select space" tabindex="-1">
                <option>Select space</option>
                <option v-for="g in groups" :key="g.name">{{ g.name }}</option>
              </select>
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
                     :class="[`res--${c.tone}`, { 'is-live': liveId === c.id }]">
                  <UiIcon v-if="c.outOfOrder" name="cross" :size="16" />
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

          <nav class="panel__tabs" role="tablist">
            <button v-for="(t, i) in r.tabs" :key="t" role="tab" :aria-selected="tab === i" @click="tab = i">{{ t }}</button>
          </nav>

          <div class="panel__body">
            <section class="card">
              <div class="panel__dates">
                <strong>{{ r.from }}</strong><UiIcon name="arrow" :size="14" /><strong>{{ r.to }}</strong>
                <span class="badge badge--green">{{ r.status }}</span>
              </div>
              <p class="text-muted">{{ r.meta }}</p>
              <p>{{ r.code }}</p>
              <div class="accordion-item" :class="{ 'is-open': notesOpen }">
                <button class="accordion-trigger" @click="notesOpen = !notesOpen" :aria-expanded="notesOpen">
                  <span>Notes <span class="badge badge--dark">{{ r.notesCount }}</span></span>
                  <UiIcon name="down" :size="16" />
                </button>
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
              <div class="tip card card--blue">
                <span class="label"><UiIcon name="bulb" :size="14" /> Smart tip</span>
                <p>{{ r.tip }}</p>
                <small class="text-muted">{{ r.tipFooter }}</small>
              </div>
              <div class="panel__actions">
                <button class="btn btn-dark">Check in</button>
                <button class="btn btn-outline" aria-label="More"><UiIcon name="dots" /></button>
                <button class="btn btn-outline" aria-label="Print"><UiIcon name="print" /></button>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped src="./HeroSection.css"></style>