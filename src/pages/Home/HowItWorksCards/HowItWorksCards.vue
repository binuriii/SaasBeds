<script setup>
import './HowItWorksCards.css'
import { hiw, steps } from './HowItWorksCardsData.js'

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <section class="section hws" aria-labelledby="hws-title">
    <div class="container">

      <!-- heading + paragraph -->
      <div class="hws__head stack reveal">
        <h2 id="hws-title">{{ hiw.title }}</h2>
        <p class="lead text-muted">{{ hiw.description }}</p>
      </div>

      <!-- cards (swipe / scroll on small screens, no arrow buttons) -->
      <div class="hws-track" role="list" tabindex="0" aria-label="How it works steps">

        <article
          v-for="(s, i) in steps"
          :key="s.title"
          class="hws-card"
          :class="[`hws-card--${s.kind}`, { 'has-img': s.image }]"
          role="listitem"
        >

          <!-- ============ 01 photo card ============ -->
          <template v-if="s.kind === 'photo'">
            <img v-if="s.image" :src="s.image" :alt="s.imageAlt" class="hws-card__bg" loading="lazy" decoding="async" draggable="false" />
            <div class="hws-card__shade"></div>

            <div class="hws-card__inner">
              <span class="hws-num">{{ pad(i + 1) }}</span>
              <div class="hws-body">
                <h3>{{ s.title }}</h3>
                <p>{{ s.text }}</p>
              </div>
            </div>
          </template>

          <!-- ============ 02 glass widget card ============ -->
          <template v-else-if="s.kind === 'glass'">
            <template v-if="s.image">
              <img :src="s.image" :alt="s.imageAlt" class="hws-card__bg" loading="lazy" decoding="async" draggable="false" />
              <div class="hws-card__shade hws-card__shade--bottom"></div>
            </template>
            <template v-else>
              <span class="hws-blob hws-blob--a" aria-hidden="true"></span>
              <span class="hws-blob hws-blob--b" aria-hidden="true"></span>
            </template>

            <div class="hws-card__inner">
              <div class="hws-widget" aria-hidden="true">
                <div class="hws-widget__top">
                  <span class="hws-widget__status"><i></i>{{ s.widget.title }}</span>
                  <span class="hws-widget__pill">{{ s.widget.pill }}</span>
                </div>

                <ul class="hws-rows">
                  <li v-for="r in s.widget.rows" :key="r.name">
                    <span>{{ r.name }}</span>
                    <b>{{ r.tag }}</b>
                  </li>
                </ul>

                <div class="hws-cal">
                  <span class="hws-cal__label">{{ s.widget.calendarLabel }}</span>

                  <div class="hws-cal__box">
                    <div class="hws-cal__days">
                      <span v-for="(d, di) in s.widget.days" :key="d" :class="{ hl: di === s.widget.highlight }">{{ d }}</span>
                    </div>

                    <div class="hws-cal__grid">
                      <span class="hws-cal__hl" :style="{ '--c': s.widget.highlight }"></span>
                      <span
                        v-for="(b, bi) in s.widget.bookings"
                        :key="bi"
                        class="hws-bar"
                        :class="`hws-bar--${b.type}`"
                        :style="{ '--r': b.row, '--l': b.from, '--w': b.to - b.from, '--i': bi }"
                      >{{ b.label }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="hws-body">
                <span class="hws-num">{{ pad(i + 1) }}</span>
                <h3>{{ s.title }}</h3>
                <p>{{ s.text }}</p>
              </div>
            </div>
          </template>

          <!-- ============ 03 white card with tilted panel ============ -->
          <template v-else>
            <div class="hws-card__inner">
              <div class="hws-body hws-body--top">
                <span class="hws-num">{{ pad(i + 1) }}</span>
                <h3>{{ s.title }}</h3>
                <p>{{ s.text }}</p>

                <div class="hws-list">
                  <span class="hws-list__title">{{ s.panel.title }}</span>
                  <ul>
                    <li v-for="it in s.panel.items" :key="it">
                      <span class="hws-tick" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                      </span>
                      {{ it }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- picture bottom right, tilted (same position as the reference) -->
            <img v-if="s.image" :src="s.image" :alt="s.imageAlt" class="hws-plant" loading="lazy" decoding="async" draggable="false" />
            <div v-else class="hws-panel" aria-hidden="true"></div>
          </template>

        </article>
      </div>

    </div>
  </section>
</template>