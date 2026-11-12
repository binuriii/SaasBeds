<script setup>
import { ref, computed } from 'vue'
import { solutionTabsHeading, solutions } from './SolutionTabsData.js'

const active = ref(solutions[3].id)
const current = computed(() => solutions.find((s) => s.id === active.value))
</script>

<template>
  <section class="section sol">
    <div class="container">
      <!-- heading (centered) -->
      <div class="sol__head stack reveal">
        <h2>{{ solutionTabsHeading.title }}</h2>
        <p class="lead text-muted">{{ solutionTabsHeading.description }}</p>
      </div>

      <!-- tabs -->
      <div class="sol__tabs reveal" role="tablist" aria-label="Property types">
        <button
          v-for="s in solutions"
          :key="s.id"
          type="button"
          role="tab"
          class="btn sol__tab"
          :class="active === s.id ? 'btn-dark' : 'btn-outline'"
          :aria-selected="active === s.id"
          @click="active = s.id"
        >
          {{ s.label }}
        </button>
      </div>

      <!-- card (re-animates when the tab changes) -->
      <article :key="current.id" class="sol__card" :class="`sol__card--${current.tone}`" role="tabpanel">
        <div class="sol__body">
          <h3>{{ current.title }}</h3>
          <a :href="current.href" class="btn btn-outline sol__cta">Explore solution</a>

          <div class="sol__foot">
            <span class="label">Features used</span>
            <ul class="sol__chips">
              <li v-for="f in current.features" :key="f" class="sol__chip">{{ f }}</li>
            </ul>
          </div>
        </div>

        <div class="sol__media media">
          <img v-if="current.src" :src="current.src" :alt="current.alt" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped src="./SolutionTabs.css"></style>