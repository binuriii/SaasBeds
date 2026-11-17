<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { dashboardHeading, mobileApp, support } from './DashboardPreview.js'

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
  }, { threshold: 0.3 })
  io.observe(root.value)
})

onBeforeUnmount(() => io && io.disconnect())
</script>

<template>
  <section id="dashboard-review" ref="root" class="section dp" :class="{ 'is-in': entered }">
    <div class="container">
      <!-- heading (left) -->
      <div class="dp__head stack reveal">
        <h2>{{ dashboardHeading.title1 }}<br>
        {{ dashboardHeading.title2 }}</h2>
        <p class="lead text-muted">{{ dashboardHeading.description }}</p>
      </div>

      <div class="dp__grid">
        <!-- left: mobile app -->
        <div class="dp__panel dp__app">
          <span class="dp__tag dp__item" style="--i: 0">{{ mobileApp.tag }}</span>
          <h3 class="dp__item" style="--i: 1">{{ mobileApp.title }}</h3>
          <p class="dp__item" style="--i: 2">{{ mobileApp.text }}</p>
          <div class="dp__actions dp__item" style="--i: 3">
            <a
              v-for="b in mobileApp.buttons"
              :key="b.label"
              :href="b.href"
              class="dp__btn"
              :aria-label="`${b.small} ${b.label}`"
            >
              <!-- apple -->
              <svg v-if="b.store === 'apple'" class="dp__btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              <!-- google play -->
              <svg v-else class="dp__btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#00c3ff" d="M3 1.5 13 12 3 22.5z" />
                <path fill="#32e36b" d="M3 1.5 17.2 9.78 13 12z" />
                <path fill="#ffd500" d="M17.2 9.78 21 12 17.2 14.22 13 12z" />
                <path fill="#ff3a44" d="M13 12 17.2 14.22 3 22.5z" />
              </svg>

              <span class="dp__btn-text">
                <small>{{ b.small }}</small>
                <strong>{{ b.label }}</strong>
              </span>
            </a>
          </div>
        </div>

        <!-- right: support -->
        <div class="dp__panel dp__support">
          <span class="dp__tag dp__item" style="--i: 0">{{ support.tag }}</span>
          <h3 class="dp__item" style="--i: 1">{{ support.title }}</h3>
          <p class="dp__item" style="--i: 2">
            {{ support.text }}
            <a :href="`tel:${support.tel}`" class="dp__phone">{{ support.phone }}</a>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./DashboardPreview.css"></style>