<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import { RouterLink } from 'vue-router'

import CurvedSection from '../../../../components/InnerPages/CurvedSection.vue'

import {
  showcase,
  teamImage,
  hotelImage,
  platformInfo,
  dashboard
} from './FeaturesShowcaseData.js'

import './FeaturesShowcase.css'

const root = ref(null)
const visible = ref(false)

let observer = null

/* =========================================
   SCROLL ANIMATION
========================================= */

onMounted(() => {
  if (!root.value) return

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      visible.value = entry.isIntersecting
    },
    {
      threshold: 0.08
    }
  )

  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <CurvedSection tone="white">

    <div
      ref="root"
      class="fsh"
      :class="{ 'fsh--visible': visible }"
    >

      <div class="fsh__grid">

        <!-- =====================================
             LEFT SIDE
        ====================================== -->

        <div class="fsh__left">

          <!-- Heading and paragraph -->

          <div class="fsh__heading fsh-reveal">

            <div class="fsh__heading-row">

              <h2>
                {{ showcase.title }}
              </h2>
 

            </div>

            <p class="lead">
              {{ showcase.description }}
            </p>

          </div>

          <!-- Feature tags -->

          <div class="fsh__tags">

            <span
              v-for="(feature, index) in showcase.features"
              :key="feature"
              class="fsh__tag"
              :style="{ '--index': index }"
            >
              {{ feature }}
            </span>

          </div>

          <!-- =====================================
               BOTTOM LEFT AREA
          ====================================== -->

          <div class="fsh__bottom">

            <!-- Small portrait image -->

            <article class="fsh__portrait fsh-reveal">

              <img
                :src="teamImage.src"
                :alt="teamImage.alt"
                class="fsh__portrait-image"
                loading="lazy"
                decoding="async"
              />

              <div class="fsh__portrait-overlay"></div>

              <div class="fsh__portrait-content">

                <span class="fsh__portrait-label">
                  {{ teamImage.label }}
                </span>

                <span class="fsh__portrait-caption">
                  {{ teamImage.caption }}
                </span>

                <!-- Decorative animated line -->

                <div
                  class="fsh__portrait-progress"
                  aria-hidden="true"
                >
                  <span></span>
                </div>

              </div>

            </article>

            <!-- Supporting content -->

            <article class="fsh__info fsh-reveal">

              <div class="fsh__info-top">

                <h3>
                  {{ platformInfo.title }}
                </h3>

                <p class="fsh__subtitle">
                  {{ platformInfo.subtitle }}
                </p>

                <div class="fsh__highlight">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9"/>
                    <path d="m8 12 3 3 5-6"/>
                  </svg>

                  <span>
                    {{ platformInfo.highlight }}
                  </span>

                </div>

              </div>

              <div class="fsh__info-bottom">

                <p class="fsh__info-description">
                  {{ platformInfo.description }}
                </p>

              </div>

            </article>

          </div>

        </div>

        <!-- =====================================
             RIGHT SIDE — LARGE HOTEL IMAGE
        ====================================== -->

        <article class="fsh__visual fsh-reveal">

          <img
            :src="hotelImage.src"
            :alt="hotelImage.alt"
            class="fsh__hotel-image"
            loading="lazy"
            decoding="async"
          />

          <div class="fsh__visual-overlay"></div>

          <!-- Floating dashboard -->

          <div class="fsh__dashboard">

            <div class="fsh__metrics">

              <div
                v-for="metric in dashboard.metrics"
                :key="metric.label"
                class="fsh__metric"
              >

                <span class="fsh__metric-label">
                  {{ metric.label }}
                </span>

                <div class="fsh__metric-main">

                  <span class="fsh__metric-value">
                    {{ metric.value }}
                  </span>

                  <span class="fsh__metric-unit">
                    {{ metric.unit }}
                  </span>

                </div>

              </div>

            </div>

            <!-- Dashboard bars -->

            <div class="fsh__chart">

              <div class="fsh__chart-header">

                <span>{{ dashboard.label }}</span>

                <span class="fsh__chart-status">
                  <i></i>
                  Connected
                </span>

              </div>

              <div
                class="fsh__bars"
                aria-hidden="true"
              >

                <span
                  v-for="n in dashboard.bars"
                  :key="n"
                  :class="{
                    'is-active': n <= dashboard.activeBars
                  }"
                  :style="{ '--index': n }"
                ></span>

              </div>

            </div>

          </div>

        </article>

      </div>

    </div>

  </CurvedSection>
</template>