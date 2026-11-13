<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { featureHeading, features } from './FeatureScrollData.js'

const active = ref(0)
const cards = []
let io = null

// the card crossing the middle of the screen becomes active
onMounted(() => {
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) active.value = Number(e.target.dataset.i)
    })
  }, { rootMargin: '-45% 0px -45% 0px' })
  cards.forEach((el) => el && io.observe(el))
})
onBeforeUnmount(() => io && io.disconnect())

const goTo = (i) => cards[i] && cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' })
</script>

<template>
  <section class="section feat">
    <div class="container">
      <!-- heading (centered) -->
      <div class="feat__head stack reveal">
        <h2>{{ featureHeading.title }}</h2>
        <p class="lead text-muted">{{ featureHeading.description }}</p>
      </div>

      <div class="feat__grid">
        <!-- left: cards that scroll -->
        <div class="feat__cards">
          <div v-for="(f, i) in features" :key="f.id" class="feat__item">
            <article
              :ref="(el) => (cards[i] = el)"
              :data-i="i"
              class="feat__card"
              :class="[`feat__card--${f.tone}`, { 'is-active': active === i }]"
            >
              <img v-if="f.src" :src="f.src" :alt="f.alt" class="feat__bg" loading="lazy" />

              <div class="feat__panel" aria-hidden="true">
                <span class="label feat__eyebrow">{{ f.mock.label }}</span>
                <div class="feat__mini">
                  <div v-for="c in f.mock.cards" :key="c.t + c.m" class="feat__minicard">
                    <strong>{{ c.t }}</strong>
                    <small class="text-muted">{{ c.m }}</small>
                  </div>
                </div>
                <div class="feat__foot">
                  <div>
                    <strong>{{ f.mock.foot }}</strong>
                    <small class="text-muted">{{ f.mock.meta }}</small>
                  </div>
                  <span class="btn btn-outline feat__cta">{{ f.mock.cta }}</span>
                </div>
              </div>
            </article>

            <!-- mobile only: text under each card -->
            <div class="feat__cap">
              <h3><span>{{ f.no }}</span> {{ f.title }}</h3>
              <p class="text-muted">{{ f.text }}</p>
              <ul class="feat__points">
                <li v-for="p in f.points" :key="p">{{ p }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- right: sticky list -->
        <div class="feat__list" role="list">
          <div
            v-for="(f, i) in features"
            :key="f.id"
            class="feat__row"
            :class="{ 'is-active': active === i }"
            role="listitem"
          >
            <button type="button" class="feat__title" :aria-expanded="active === i" @click="goTo(i)">
              <span class="feat__no">{{ f.no }}</span>
              <span>{{ f.title }}</span>
            </button>

            <div class="feat__body">
              <div>
                <p class="feat__text">{{ f.text }}</p>
                <ul class="feat__points">
                  <li v-for="(p, j) in f.points" :key="p" :style="{ '--j': j }">{{ p }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./FeatureScroll.css"></style>