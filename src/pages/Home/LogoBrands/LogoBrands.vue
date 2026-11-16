<script setup>
import { brandsText, brandsDuration, logos, stats } from './LogoBrandsData.js'

// the list is rendered twice so the -50% scroll loops without a jump
const loop = [...logos, ...logos]
</script>

<template>
  <section class="brands" aria-label="Customers">
    <div class="container brands__inner">
      <p class="brands__text">{{ brandsText }}</p>

      <div class="brands__viewport">
        <ul class="brands__track" :style="{ '--dur': brandsDuration + 's' }">
          <li
            v-for="(l, i) in loop"
            :key="i"
            class="brands__item"
            :aria-hidden="i >= logos.length ? 'true' : null"
          >
            <component
              :is="l.href ? 'a' : 'span'"
              class="brands__link"
              :href="l.href || null"
              :target="l.href ? '_blank' : null"
              :rel="l.href ? 'noopener noreferrer' : null"
              :aria-label="l.href ? l.name : null"
              :tabindex="l.href && i >= logos.length ? -1 : null"
              :style="{ '--h': l.h }"
            >
              <img v-if="l.src" :src="l.src" :alt="l.name" loading="lazy" />
              <span v-else class="brands__word">{{ l.name }}</span>
            </component>
          </li>
        </ul>
      </div>
    </div>

    <!-- facts: one line under the logos -->
    <div class="container">
      <ul class="brands__facts">
        <li v-for="s in stats" :key="s.label">{{ s.value }} {{ s.label }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped src="./LogoBrands.css"></style>