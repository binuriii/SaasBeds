<script setup>
import { computed, nextTick, ref } from 'vue'
import { cards, solutionTabsHeading } from './SolutionShowcaseData.js'

const track = ref(null)
const activeIndex = ref(0)
const total = cards.length

const activeCard = computed(() => cards[activeIndex.value])
const pad = (n) => String(n).padStart(2, '0')

const scrollToCard = async (index) => {
  const safeIndex = Math.max(0, Math.min(index, total - 1))
  activeIndex.value = safeIndex

  await nextTick()

  const container = track.value
  if (!container) return

  const target = container.querySelectorAll('.showcase__card')[safeIndex]
  if (!target) return

  const left =
    container.scrollLeft +
    target.getBoundingClientRect().left -
    container.getBoundingClientRect().left

  container.scrollTo({ left, behavior: 'smooth' })
}

const previousCard = () =>
  scrollToCard(activeIndex.value <= 0 ? total - 1 : activeIndex.value - 1)

const nextCard = () =>
  scrollToCard(activeIndex.value >= total - 1 ? 0 : activeIndex.value + 1)

const handleScroll = () => {
  const container = track.value
  if (!container) return

  const items = [...container.querySelectorAll('.showcase__card')]
  if (!items.length) return

  // at the very end the last card can't reach the left edge
  if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 4) {
    activeIndex.value = items.length - 1
    return
  }

  const containerLeft = container.getBoundingClientRect().left
  let closestIndex = 0
  let closestDistance = Infinity

  items.forEach((item, index) => {
    const distance = Math.abs(item.getBoundingClientRect().left - containerLeft)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  activeIndex.value = closestIndex
}
</script>

<template>
  <section id="solutions" class="section showcase">
    <div class="container">
      <!-- heading (centered) -->
      <div class="showcase__head stack reveal">
        <h2>{{ solutionTabsHeading.title }}</h2>
        <p class="lead text-muted">{{ solutionTabsHeading.description }}</p>
      </div>

      <div class="showcase__layout">
        <!-- left info -->
        <aside class="showcase__info">
          <div>
            <div class="showcase__counter">
              <span class="showcase__current">{{ pad(activeIndex + 1) }}</span>
              <span class="showcase__total">/{{ pad(total) }}</span>
            </div>

            <p class="showcase__desc">{{ activeCard.description }}</p>
          </div>

          <div class="showcase__arrows">
            <button type="button" class="showcase__arrow" aria-label="Previous solution" @click="previousCard">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 7l-5 5 5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 12h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </button>

            <button type="button" class="showcase__arrow showcase__arrow--dark" aria-label="Next solution" @click="nextCard">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 12H7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </aside>

        <!-- carousel -->
        <div class="showcase__carousel">
          <div ref="track" class="showcase__track" @scroll.passive="handleScroll">
            <article
              v-for="(card, index) in cards"
              :key="card.id"
              class="showcase__card"
              :class="{ 'showcase__card--active': activeIndex === index }"
              @click="scrollToCard(index)"
            >
              <div class="showcase__media">
                <img
                  v-if="card.image"
                  :src="card.image"
                  :alt="card.alt"
                  loading="lazy"
                  draggable="false"
                  class="showcase__img"
                />
              </div>

              <div class="showcase__overlay"></div>
              <div class="showcase__tint"></div>

              <div class="showcase__top">
                <span class="showcase__num">{{ pad(index + 1) }}</span>
              </div>

              <div class="showcase__content">
                <h3>{{ card.title }}</h3>
                <p>{{ card.text }}</p>
                <p v-if="card.note" class="showcase__note">{{ card.note }}</p>
                <a :href="card.href" class="showcase__link" @click.stop>Explore solution</a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./SolutionShowcase.css"></style>