<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { getFaqContent } from './FAQ.js'

const props = defineProps({
  pageKey: {
    type: String,
    default: 'home'
  },

  title: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  },

  items: {
    type: Array,
    default: () => []
  }
})

const faqContent = computed(() => getFaqContent(props.pageKey))
const faqTitle = computed(() => props.title || faqContent.value.title)
const faqDescription = computed(() => props.description || faqContent.value.description)
const faqItems = computed(() => (props.items.length ? props.items : faqContent.value.items))

/* the first question is open by default */
const openId = ref(faqItems.value[0]?.id ?? null)

/* if the page or the items change, open the first question again */
watch(faqItems, (items) => {
  openId.value = items[0]?.id ?? null
})

const columns = computed(() => {
  const middle = Math.ceil(faqItems.value.length / 2)
  return [faqItems.value.slice(0, middle), faqItems.value.slice(middle)]
})

const toggleFaq = (id) => {
  openId.value = openId.value === id ? null : id
}

/* questions fade up when the section scrolls into view */
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
  }, { threshold: 0.15 })
  io.observe(root.value)
})

onBeforeUnmount(() => io && io.disconnect())
</script>

<template>
  <section id="faq" ref="root" class="section faq" :class="{ 'is-in': entered }" aria-labelledby="faq-title">
    <div class="container">
      <!-- heading (centered) -->
      <div class="faq__head stack reveal">
        <h2 id="faq-title">{{ faqTitle }}</h2>
        <p class="lead text-muted">{{ faqDescription }}</p>
      </div>

      <div class="faq__list">
        <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="faq__column">
          <article
            v-for="(item, i) in column"
            :key="item.id"
            class="faq__item"
            :class="{ 'is-open': openId === item.id }"
            :style="{ '--i': i + columnIndex }"
          >
            <!-- question -->
            <h3 class="faq__q">
              <button
                class="faq__btn"
                type="button"
                :aria-expanded="openId === item.id"
                :aria-controls="`faq-panel-${item.id}`"
                @click="toggleFaq(item.id)"
              >
                <span class="faq__question">{{ item.question }}</span>

                <span class="faq__icon" aria-hidden="true">
                  <span class="faq__plus">+</span>
                  <span class="faq__close">×</span>
                </span>
              </button>
            </h3>

            <!-- answer -->
            <div
              :id="`faq-panel-${item.id}`"
              class="faq__a"
              :aria-hidden="openId !== item.id"
              :inert="openId !== item.id"
            >
              <div class="faq__a-inner">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./FAQ.css"></style>