<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

import {
  directoryHeading,
  featureGroups,
  aiImage
} from './FeatureDirectoryData.js'

import './FeatureDirectory.css'

/* =========================================
   DATA
========================================= */

const root = ref(null)
const imageFailed = ref(false)

const getGroup = (id) =>
  featureGroups.find(group => group.id === id)

const operations = getGroup('operations')
const distribution = getGroup('distribution')
const revenue = getGroup('revenue')
const ai = getGroup('ai')
const administration = getGroup('administration')

/* =========================================
   SVG ICONS
========================================= */

const arrowPath = 'M7 17L17 7M7 7h10v10'

const revenueIcons = [
  'M3 17l6-6 4 4 8-10M15 5h6v6',

  'M3 8h18v13H3zM12 8v13M3 12h18M12 8C2 8 5-2 12 8M12 8C22 8 19-2 12 8',

  'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8M22 21v-2a4 4 0 0 0-3-4',

  'M3 5h18v14H3zM3 10h18M6 15h4',

  'M3 3v18h18M8 16v-4M13 16V8M18 16V5',

  'M5 3h4l2 5-3 2c2 4 4 6 8 8l2-3 4 2v4c-9 2-21-10-17-18z'
]

/* =========================================
   SCROLL ANIMATION
========================================= */

let observer = null

onMounted(() => {
  if (!root.value) return

  const elements = root.value.querySelectorAll(
    '[data-fd-reveal]'
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

  root.value.classList.add('fd--animated')

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle(
          'is-visible',
          entry.isIntersecting
        )
      })
    },
    {
      threshold: 0
    }
  )

  elements.forEach(element => {
    observer.observe(element)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    class="fd-section section"
    aria-labelledby="fd-title"
  >

    <div class="container">

      <div ref="root" class="fd">

        <!-- =====================================
             SECTION HEADING
        ====================================== -->

        <header
          class="fd__heading"
          data-fd-reveal
        >

          <h2 id="fd-title">
            {{ directoryHeading.title }}
          </h2>

          <p class="lead">
            {{ directoryHeading.description }}
          </p>

        </header>

        <div class="fd__grid">

          <!-- =====================================
               01 — OPERATIONS
          ====================================== -->

          <article
            class="fd-card fd-operations"
            data-fd-reveal
            style="--delay: 0ms"
          >

            <!-- Animated gradient -->

            <div
              class="fd-operations__blob fd-operations__blob--one"
              aria-hidden="true"
            ></div>

            <div
              class="fd-operations__blob fd-operations__blob--two"
              aria-hidden="true"
            ></div>

            <div
              class="fd-operations__blob fd-operations__blob--three"
              aria-hidden="true"
            ></div>

            <div class="fd-card__head">

              <div>

                <h3>{{ operations.title }}</h3>

                <p>Manage your daily hotel operations</p>

              </div>

              <span class="fd-pill fd-pill--glass">

                <span class="fd-dot"></span>

                Hotel operations

              </span>

            </div>

            <!-- Circular feature graphic -->

            <div class="fd-circle">

              <svg
                class="fd-circle__svg"
                viewBox="0 0 260 260"
                aria-hidden="true"
              >

                <circle
                  class="fd-circle__track"
                  cx="130"
                  cy="130"
                  r="115"
                />

                <circle
                  class="fd-circle__progress"
                  cx="130"
                  cy="130"
                  r="115"
                  pathLength="100"
                />

                <circle
                  class="fd-circle__inner"
                  cx="130"
                  cy="130"
                  r="87"
                />

                <g
                  v-for="n in 24"
                  :key="n"
                  :transform="`rotate(${n * 15} 130 130)`"
                >

                  <circle
                    cx="130"
                    cy="50"
                    r="1.2"
                    fill="white"
                    opacity=".25"
                  />

                </g>

              </svg>

              <div class="fd-circle__text">

                <span class="fd-circle__number">
                  {{ String(operations.features.length).padStart(2, '0') }}
                </span>

                <span class="fd-circle__label">
                  Connected features
                </span>

              </div>

            </div>

            <!-- Operations links -->

            <div class="fd-operations__links">

              <RouterLink
                v-for="(feature, index) in operations.features"
                :key="feature.href"
                :to="feature.href"
                class="fd-glass-link fd-stagger"
                :style="{ '--index': index }"
              >

                <span>{{ feature.name }}</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    :d="arrowPath"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

              </RouterLink>

            </div>

          </article>

          <!-- =====================================
               02 — DISTRIBUTION
          ====================================== -->

          <article
            class="fd-card fd-distribution"
            data-fd-reveal
            style="--delay: 100ms"
          >

            <div class="fd-card__head">

              <div>

                <h3>{{ distribution.title }}</h3>

                <p>Connect, distribute and sell directly</p>

              </div>

              <span class="fd-pill">

                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>

                All channels

              </span>

            </div>

            <!-- Animated distribution chart -->

            <div class="fd-chart" aria-hidden="true">

              <div class="fd-chart__grid">

                <div
                  v-for="n in 7"
                  :key="n"
                  class="fd-chart__line"
                ></div>

              </div>

              <div
                v-for="(feature, index) in distribution.features"
                :key="feature.href"
                class="fd-chart__row"
                :style="{ '--index': index }"
              >

                <span class="fd-chart__label">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <div class="fd-chart__track">

                  <div class="fd-chart__bar">
                    <span class="fd-chart__dot"></span>
                  </div>

                  <div class="fd-chart__extension"></div>

                </div>

              </div>

            </div>

            <div
              class="fd-chart__axis"
              aria-hidden="true"
            >

              <span>Connect</span>
              <span>Manage</span>
              <span>Distribute</span>
              <span>Grow</span>

            </div>

            <!-- Distribution links -->

            <div class="fd-distribution__links">

              <RouterLink
                v-for="(feature, index) in distribution.features"
                :key="feature.href"
                :to="feature.href"
                class="fd-channel-link fd-stagger"
                :style="{ '--index': index }"
              >

                <span
                  class="fd-channel-link__dot"
                  :class="`fd-channel-link__dot--${index}`"
                ></span>

                <span>{{ feature.name }}</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >

                  <path
                    :d="arrowPath"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                </svg>

              </RouterLink>

            </div>

          </article>

          <!-- =====================================
               03 — AI WITH IMAGE
          ====================================== -->

          <article
            class="fd-card fd-ai"
            data-fd-reveal
            style="--delay: 0ms"
          >

            <div class="fd-ai__visual">

              <div class="fd-ai__glow"></div>

              <div class="fd-ai__image-wrap">

                <img
                  v-if="!imageFailed"
                  :src="aiImage.src"
                  :alt="aiImage.alt"
                  class="fd-ai__image"
                  loading="lazy"
                  decoding="async"
                  @error="imageFailed = true"
                />

                <!-- Fallback image -->

                <svg
                  v-else
                  class="fd-ai__fallback"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >

                  <path
                    d="M50 10L60 40L90 50L60 60L50 90L40 60L10 50L40 40Z"
                    fill="white"
                  />

                </svg>

              </div>

            </div>

            <div class="fd-ai__body">

              <h3>{{ ai.title }}</h3>

              <div class="fd-ai__links">

                <RouterLink
                  v-for="(feature, index) in ai.features"
                  :key="feature.href"
                  :to="feature.href"
                  class="fd-stagger"
                  :style="{ '--index': index }"
                >

                  <span>{{ feature.name }}</span>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >

                    <path
                      :d="arrowPath"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                  </svg>

                </RouterLink>

              </div>

            </div>

          </article>

          <!-- =====================================
               04 — ADMINISTRATION
          ====================================== -->

          <article
            class="fd-card fd-admin"
            data-fd-reveal
            style="--delay: 100ms"
          >

            <div class="fd-admin__head">

              <div>

                <h3>{{ administration.title }}</h3>

                <div class="fd-admin__number">

                  {{ String(administration.features.length).padStart(2, '0') }}

                  <span>Settings</span>

                </div>

              </div>

              <div
                class="fd-admin__visual"
                aria-hidden="true"
              >

                <div class="fd-admin__bars">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>

            </div>

            <div class="fd-admin__links">

              <RouterLink
                v-for="(feature, index) in administration.features"
                :key="feature.href"
                :to="feature.href"
                class="fd-stagger"
                :style="{ '--index': index }"
              >

                {{ feature.name }}

              </RouterLink>

            </div>

          </article>

          <!-- =====================================
               05 — REVENUE & GUESTS
          ====================================== -->

          <article
            class="fd-card fd-revenue"
            data-fd-reveal
            style="--delay: 100ms"
          >

            <div class="fd-card__head">

              <h3>{{ revenue.title }}</h3>

              <span class="fd-pill">
                {{ revenue.features.length }} features
              </span>

            </div>

            <div class="fd-revenue__list">

              <RouterLink
                v-for="(feature, index) in revenue.features"
                :key="feature.href"
                :to="feature.href"
                class="fd-revenue__row fd-stagger"
                :style="{ '--index': index }"
              >

                <span class="fd-revenue__index">

                  {{ String(index + 1).padStart(2, '0') }}

                </span>

                <span
                  class="fd-revenue__icon"
                  :class="`fd-revenue__icon--${index}`"
                >

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >

                    <path :d="revenueIcons[index]"/>

                  </svg>

                </span>

                <span class="fd-revenue__name">

                  {{ feature.name }}

                </span>

                <span class="fd-revenue__arrow">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >

                    <path
                      :d="arrowPath"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                  </svg>

                </span>

              </RouterLink>

            </div>

          </article>

        </div>

      </div>

    </div>

  </section>
</template>