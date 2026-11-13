<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { solutionTabsHeading, solutions } from './SolutionTabsData.js'

const active = ref(solutions[1].id)
const current = computed(() => solutions.find((s) => s.id === active.value))

const root = ref(null)
const entered = ref(false)
let io = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    entered.value = true
    return
  }
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      entered.value = true
      io.disconnect()
    }
  }, { threshold: 0.2 })
  io.observe(root.value)
})

onBeforeUnmount(() => io && io.disconnect())
</script>

<template>
  <section ref="root" class="section sol" :class="{ 'is-in': entered }">
    <div class="container">
      <!-- heading (centered) -->
      <div class="sol__head stack reveal">
        <h2>{{ solutionTabsHeading.title }}</h2>
        <p class="lead text-muted">{{ solutionTabsHeading.description }}</p>
      </div>

      <!-- tabs: pop in one by one -->
      <div class="sol__tabs" role="tablist" aria-label="Property types">
        <button
          v-for="(s, i) in solutions"
          :key="s.id"
          type="button"
          role="tab"
          class="btn sol__tab"
          :class="active === s.id ? 'btn-dark' : 'btn-outline'"
          :style="{ '--t': i }"
          :aria-selected="active === s.id"
          @click="active = s.id"
        >
          {{ s.label }}
        </button>
      </div>

      <!-- card: replays when the tab changes -->
      <div class="sol__stage">
        <article :key="current.id" class="sol__card" :class="`sol__card--${current.tone}`" role="tabpanel">
          <div class="sol__body">
            <h3 class="sol__in" style="--i: 0">{{ current.title }}</h3>
            <a :href="current.href" class="btn btn-outline sol__cta sol__in" style="--i: 1">Explore solution</a>

            <div class="sol__foot">
              <span class="label sol__in" style="--i: 2">Features used</span>
              <ul class="sol__chips">
                <li
                  v-for="(f, i) in current.features"
                  :key="f"
                  class="sol__chip sol__in"
                  :style="{ '--i': i + 3 }"
                >{{ f }}</li>
              </ul>
            </div>
          </div>

          <div class="sol__media media">
            <img v-if="current.src" :src="current.src" :alt="current.alt" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="./SolutionTabs.css"></style>