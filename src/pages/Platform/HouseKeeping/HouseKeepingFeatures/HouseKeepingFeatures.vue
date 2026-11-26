<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  heading,
  roomBoard,
  cleaners,
  priorities,
  maintenance,
  reports
} from './HouseKeepingFeatures.js'

import './HouseKeepingFeatures.css'


/* =========================================
   DATA
========================================= */

const root = ref(null)

const activeRooms = ref(
  roomBoard.rooms.map(room => ({ ...room }))
)

const highlightedRoom = ref(null)

let observer = null
let roomTimer = null
let highlightTimer = null
let roomIndex = 0


/* =========================================
   HELPERS
========================================= */

const progress = cleaner =>
  Math.round(
    (cleaner.completed / cleaner.assigned) * 100
  )

const statusLabel = tone =>
  roomBoard.statuses.find(
    status => status.tone === tone
  )?.label || ''

/* Live counts per status (used by summary bar + legend) */

const statusCounts = computed(() =>
  roomBoard.statuses.map(status => ({
    ...status,
    count: activeRooms.value.filter(
      room => room.status === status.tone
    ).length
  }))
)


/* =========================================
   ROOM STATUS ANIMATION
========================================= */

const animateRooms = () => {

  if (roomTimer !== null) return

  roomTimer = setInterval(() => {

    const availableRooms = activeRooms.value.filter(
      room => room.status !== 'lime'
    )

    if (!availableRooms.length) return

    const room =
      availableRooms[roomIndex % availableRooms.length]

    const sequence = ['pink', 'blue', 'green']

    const current = sequence.indexOf(room.status)

    room.status =
      sequence[(current + 1) % sequence.length]

    highlightedRoom.value = room.number

    clearTimeout(highlightTimer)

    highlightTimer = setTimeout(() => {
      highlightedRoom.value = null
    }, 650)

    roomIndex++

  }, 1800)

}


const stopRooms = () => {

  clearInterval(roomTimer)
  clearTimeout(highlightTimer)

  roomTimer = null
  highlightTimer = null
  highlightedRoom.value = null

}


/* =========================================
   SCROLL ANIMATION
========================================= */

onMounted(() => {

  if (!root.value) return

  const elements = root.value.querySelectorAll(
    '[data-hkf-reveal]'
  )

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {

    elements.forEach(element => {
      element.classList.add('is-visible')
    })

    return

  }

  root.value.classList.add('hkf--animated')

  observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        entry.target.classList.toggle(
          'is-visible',
          entry.isIntersecting
        )

        if (entry.target.classList.contains('hkf-board')) {

          if (entry.isIntersecting) {
            animateRooms()
          } else {
            stopRooms()
          }

        }

      })

    },
    { threshold: 0 }
  )

  elements.forEach(element => {
    observer.observe(element)
  })

})


onBeforeUnmount(() => {

  observer?.disconnect()

  stopRooms()

})
</script>


<template>

  <section
    class="hkf-section section"
    aria-labelledby="hkf-title"
  >

    <div class="container">

      <div ref="root" class="hkf">


        <!-- SECTION HEADING -->

        <header
          class="hkf__heading"
          data-hkf-reveal
        >

          <h2 id="hkf-title">{{ heading.title }}</h2>

          <p class="lead">{{ heading.description }}</p>

        </header>


        <!-- BENTO GRID -->

        <div class="hkf__grid">


          <!-- ===================================
               01 — ROOM STATUS BOARD (clean)
          ==================================== -->

          <article
            class="hkf-card hkf-board"
            data-hkf-reveal
            style="--delay: 0ms"
          >

            <div class="hkf-card__head">

              <div>

                <h3>{{ roomBoard.title }}</h3>

                <p>{{ roomBoard.description }}</p>

              </div>

              <span class="hkf-pill hkf-pill--soft">

                <i class="hkf-live-dot"></i>

                Live board

              </span>

            </div>


            <!-- Segmented filters -->

            <div class="hkf-board__filters">

              <span
                v-for="(filter, index) in roomBoard.filters"
                :key="filter"
                class="hkf-board__filter hkf-stagger"
                :class="{ 'is-active': index === 0 }"
                :style="{ '--index': index }"
              >

                {{ filter }}

              </span>

            </div>


            <!-- Summary bar + counts -->

            <div class="hkf-board__summary">

              <div class="hkf-board__bar" aria-hidden="true">

                <template
                  v-for="item in statusCounts"
                  :key="item.tone"
                >

                  <span
                    v-if="item.count"
                    :class="`hkf-tone--${item.tone}`"
                    :style="{ flexGrow: item.count }"
                  ></span>

                </template>

              </div>

              <div class="hkf-board__legend">

                <span
                  v-for="item in statusCounts"
                  :key="item.tone"
                >

                  <i :class="`hkf-dot--${item.tone}`"></i>

                  {{ item.label }}

                  <b>{{ item.count }}</b>

                </span>

              </div>

            </div>


            <!-- Room tiles -->

            <div class="hkf-board__rooms">

              <div
                v-for="(room, index) in activeRooms"
                :key="room.number"
                class="hkf-room hkf-stagger"
                :class="[
                  `hkf-room--${room.status}`,
                  { 'is-changing': highlightedRoom === room.number }
                ]"
                :style="{ '--index': index }"
              >

                <div class="hkf-room__top">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >

                    <path d="M3 18v-8M21 18v-8M3 15h18" />

                    <path d="M5 15V7h14v8M5 11h14M12 7v4" />

                  </svg>

                  <i class="hkf-room__dot"></i>

                </div>

                <div class="hkf-room__info">

                  <strong>{{ room.number }}</strong>

                  <small>{{ statusLabel(room.status) }}</small>

                </div>

              </div>

            </div>

          </article>


          <!-- ===================================
               02 — CLEANER ASSIGNMENT
          ==================================== -->

          <article
            class="hkf-card hkf-cleaners"
            data-hkf-reveal
            style="--delay: 100ms"
          >

            <div class="hkf-card__head">

              <div>

                <h3>{{ cleaners.title }}</h3>

                <p>{{ cleaners.description }}</p>

              </div>

            </div>


            <div class="hkf-cleaners__list">

              <div
                v-for="(cleaner, index) in cleaners.team"
                :key="cleaner.name"
                class="hkf-cleaner hkf-stagger"
                :style="{ '--index': index }"
              >

                <div class="hkf-cleaner__top">

                  <span
                    class="hkf-cleaner__avatar"
                    :class="`hkf-tone--${cleaner.tone}`"
                  >

                    {{ cleaner.initials }}

                  </span>

                  <div class="hkf-cleaner__name">

                    <strong>{{ cleaner.name }}</strong>

                    <small>
                      {{ cleaner.completed }} /
                      {{ cleaner.assigned }} rooms
                    </small>

                  </div>

                  <span class="hkf-cleaner__percent">
                    {{ progress(cleaner) }}%
                  </span>

                </div>


                <div
                  class="hkf-progress"
                  role="progressbar"
                  :aria-label="`${cleaner.name} room progress`"
                  :aria-valuenow="progress(cleaner)"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >

                  <span
                    :style="{
                      '--progress': `${progress(cleaner)}%`,
                      '--index': index
                    }"
                  ></span>

                </div>

              </div>

            </div>


            <div class="hkf-cleaners__footer">

              <span class="hkf-pill">

                <i class="hkf-status-dot"></i>

                Assigned rooms

              </span>

              <span class="hkf-pill">Team progress</span>

            </div>

          </article>


          <!-- ===================================
               03 — PRIORITIES
          ==================================== -->

          <article
            class="hkf-card hkf-priorities"
            data-hkf-reveal
            style="--delay: 0ms"
          >

            <div class="hkf-card__head">

              <div>

                <h3>{{ priorities.title }}</h3>

                <p>{{ priorities.description }}</p>

              </div>

            </div>


            <div class="hkf-priorities__list">

              <div
                v-for="(room, index) in priorities.rooms"
                :key="room.number"
                class="hkf-priority hkf-stagger"
                :style="{ '--index': index }"
              >

                <span
                  class="hkf-priority__number"
                  :class="`hkf-tone--${room.tone}`"
                >

                  {{ String(index + 1).padStart(2, '0') }}

                </span>

                <div class="hkf-priority__info">

                  <strong>{{ room.number }}</strong>

                  <small>{{ room.label }}</small>

                </div>

                <span class="hkf-priority__time">{{ room.time }}</span>

              </div>

            </div>

          </article>


          <!-- ===================================
               04 — MAINTENANCE
          ==================================== -->

          <article
            class="hkf-card hkf-maintenance"
            data-hkf-reveal
            style="--delay: 100ms"
          >

            <div class="hkf-card__head">

              <div>

                <h3>{{ maintenance.title }}</h3>

                <p>{{ maintenance.description }}</p>

              </div>

            </div>


            <div class="hkf-maintenance__visual">

              <div
                class="hkf-maintenance__orbit"
                aria-hidden="true"
              ></div>

              <div class="hkf-maintenance__room">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >

                  <path d="M5 21V3h14v18M3 21h18" />

                  <circle cx="15" cy="12" r="1" />

                </svg>

                <strong>{{ maintenance.room }}</strong>

                <small>{{ maintenance.status }}</small>

              </div>

              <span class="hkf-maintenance__issue">
                {{ maintenance.issue }}
              </span>

            </div>


            <div class="hkf-maintenance__steps">

              <div
                v-for="(step, index) in maintenance.steps"
                :key="step"
                class="hkf-maintenance__step hkf-stagger"
                :class="{
                  'is-complete': index === 0,
                  'is-current': index === 1
                }"
                :style="{ '--index': index }"
              >

                <span class="hkf-step-dot"></span>

                {{ step }}

              </div>

            </div>

          </article>


          <!-- ===================================
               05 — HOUSEKEEPING REPORTS
          ==================================== -->

          <article
            class="hkf-card hkf-reports"
            data-hkf-reveal
            style="--delay: 200ms"
          >

            <div class="hkf-card__head">

              <div>

                <h3>{{ reports.title }}</h3>

                <p>{{ reports.description }}</p>

              </div>

            </div>


            <div class="hkf-reports__metrics">

              <div
                v-for="(metric, index) in reports.metrics"
                :key="metric.label"
                class="hkf-metric hkf-stagger"
                :style="{ '--index': index }"
              >

                <span>{{ metric.label }}</span>

                <strong>{{ metric.value }}</strong>

              </div>

            </div>


            <div
              class="hkf-chart"
              role="img"
              aria-label="Illustrative weekly housekeeping activity chart"
            >

              <div class="hkf-chart__lines">

                <span v-for="n in 4" :key="n"></span>

              </div>

              <div
                v-for="(day, index) in reports.days"
                :key="day.label"
                class="hkf-chart__column"
              >

                <div class="hkf-chart__bars">

                  <span
                    class="hkf-chart__bar hkf-chart__bar--completed"
                    :style="{
                      '--height': `${day.completed}%`,
                      '--index': index
                    }"
                  ></span>

                  <span
                    class="hkf-chart__bar hkf-chart__bar--pending"
                    :style="{
                      '--height': `${day.pending}%`,
                      '--index': index
                    }"
                  ></span>

                </div>

                <small>{{ day.label }}</small>

              </div>

            </div>


            <div class="hkf-reports__legend">

              <span><i></i>Completed</span>

              <span><i></i>Outstanding</span>

            </div>

          </article>

        </div>

      </div>

    </div>

  </section>

</template>