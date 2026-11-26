<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import CurvedSection from '../../../../components/InnerPages/CurvedSection.vue'

import {
  valueIntro,
  portrait,
  card
} from './ValueIntro.js'

import './ValueIntro.css'

const root = ref(null)
const visible = ref(false)
const ready = ref(false)

let observer = null

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

  ready.value = true

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
      class="vi"
      :class="{
        'vi--js': ready,
        'vi--visible': visible
      }"
    >

      <div class="vi__grid">

        <!-- =====================================
             LEFT CONTENT
        ====================================== -->

        <div class="vi__left vi-reveal">

          <div class="vi__heading">

            <h2>
              {{ valueIntro.title }}
            </h2>

            <p class="lead">
              {{ valueIntro.description }}
            </p>

            <ul class="vi__tags">

              <li
                v-for="(tag, index) in valueIntro.tags"
                :key="tag"
                class="vi__tag"
                :style="{ '--index': index }"
              >

                <span
                  class="vi__tag-dot"
                  aria-hidden="true"
                ></span>

                {{ tag }}

              </li>

            </ul>

          </div>

        </div>

        <article class="vi__portrait vi-reveal">

          <img
            :src="portrait.image"
            :alt="portrait.alt"
            class="vi__portrait-image"
            loading="lazy"
            decoding="async"
          />

          <div class="vi__portrait-overlay"></div>

          <!-- Icon -->

          <span
            class="vi__badge"
            aria-hidden="true"
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 3 3 5-6" />
            </svg>

          </span>

          <!-- Portrait content -->

          <div class="vi__portrait-top">

            <h3>
              {{ portrait.title }}
            </h3>

            <p>
              {{ portrait.description }}
            </p>

          </div>

          <!-- Bottom labels -->

          <ul class="vi__pills vi__pills--glass">

            <li
              v-for="item in portrait.pills"
              :key="item"
            >
              {{ item }}
            </li>

          </ul>

        </article>

        <article class="vi__card vi-reveal">

          <span
            class="vi__card-icon"
            aria-hidden="true"
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 21h18M5 21V8l7-5 7 5v13" />
              <path d="M9 21v-6h6v6" />
            </svg>

          </span>

          <div class="vi__card-heading">

            <h3>
              {{ card.title }}
            </h3>

            <p>
              {{ card.description }}
            </p>

          </div>

          <!-- Landscape image -->

          <div class="vi__card-media">

            <img
              :src="card.image"
              :alt="card.alt"
              loading="lazy"
              decoding="async"
            />

          </div>

          <!-- Decorative curves -->

          <div
            class="vi__decoration"
            aria-hidden="true"
          >

            <svg
              viewBox="0 0 320 200"
              fill="none"
            >

              <path
                v-for="n in 12"
                :key="n"
                :d="`
                  M ${160 - n * 12} 210
                  Q ${160 - n * 18} ${110 - n * 12},
                    160 ${30 - n * 8}
                  Q ${160 + n * 18} ${110 - n * 12},
                    ${160 + n * 12} 210
                `"
                stroke="currentColor"
                stroke-width="2"
              />

            </svg>

          </div>

          <!-- Bottom labels -->

          <ul class="vi__pills">

            <li
              v-for="item in card.pills"
              :key="item"
            >
              {{ item }}
            </li>

          </ul>

        </article>

      </div>

    </div>

  </CurvedSection>
</template>