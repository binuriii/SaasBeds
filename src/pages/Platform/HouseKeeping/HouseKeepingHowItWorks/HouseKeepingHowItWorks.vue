<script setup>
import './HouseKeepingHowItWorks.css'
import { hiw, steps } from './HouseKeepingHowItWorks.js'

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <section class="section hhw" aria-labelledby="hhw-title">
    <div class="container">

      <!-- heading + paragraph -->
      <div class="hhw__head stack reveal">
        <h2 id="hhw-title">{{ hiw.title }}</h2>
        <p class="lead text-muted">{{ hiw.description }}</p>
      </div>

      <!-- cards (swipe / scroll on small screens, no arrow buttons) -->
      <div class="hhw-track" role="list" tabindex="0" aria-label="How it works steps">

        <article
          v-for="(s, i) in steps"
          :key="s.title"
          class="hhw-card"
          :class="[`hhw-card--${s.tone}`, { 'has-img': s.image }]"
          role="listitem"
        >
          <!-- background image -->
          <template v-if="s.image">
            <img :src="s.image" :alt="s.imageAlt" class="hhw-card__bg" loading="lazy" decoding="async" draggable="false" />
            <div class="hhw-card__shade"></div>
          </template>

          <div class="hhw-card__inner">

            <!-- mini UI -->
            <div class="hhw-widget" aria-hidden="true">
              <div class="hhw-widget__top">
                <span class="hhw-widget__status"><i></i>{{ s.widget.title }}</span>
                <span class="hhw-widget__pill">{{ s.widget.pill }}</span>
              </div>

              <ul class="hhw-rows">
                <li
                  v-for="(r, ri) in s.widget.rows"
                  :key="r.name"
                  class="hhw-row"
                  :style="{ '--i': ri }"
                >
                  <span class="hhw-row__main">
                    <strong>{{ r.name }}</strong>
                    <small>{{ r.meta }}</small>
                  </span>

                  <b class="hhw-tag" :class="`hhw-tag--${s.tone}`">
                    <svg v-if="s.tone === 'green'" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {{ r.tag }}
                  </b>
                </li>
              </ul>

              <span v-if="s.widget.cta" class="hhw-btn">{{ s.widget.cta }}</span>
            </div>

            <!-- text -->
            <div class="hhw-body">
              <span class="hhw-num">{{ pad(i + 1) }}</span>
              <h3>{{ s.title }}</h3>
              <p v-if="s.text">{{ s.text }}</p>
            </div>

          </div>
        </article>

      </div>

    </div>
  </section>
</template>