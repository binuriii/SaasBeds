
<script setup>
import { computed, ref } from 'vue'
import './FAQ.css'
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

const openId = ref(null)

const faqContent = computed(() => getFaqContent(props.pageKey))

const faqTitle = computed(() => {
  return props.title || faqContent.value.title
})

const faqDescription = computed(() => {
  return props.description || faqContent.value.description
})

const faqItems = computed(() => {
  return props.items.length ? props.items : faqContent.value.items
})

const columns = computed(() => {
  const middle = Math.ceil(faqItems.value.length / 2)

  return [
    faqItems.value.slice(0, middle),
    faqItems.value.slice(middle)
  ]
})

const toggleFaq = (id) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section class="faq" aria-labelledby="faq-title">
    <div class="faq-box">

      <!-- FAQ HEADING -->
      <div class="faq-intro">
        <h2 id="faq-title" class="faq-title">
          {{ faqTitle }}
        </h2>

        <p class="faq-lead">
          {{ faqDescription }}
        </p>
      </div>

      <!-- FAQ QUESTIONS -->
      <div class="faq-list">

        <div
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          class="faq-column"
        >
          <article
            v-for="item in column"
            :key="item.id"
            class="faq-item"
            :class="{ 'is-open': openId === item.id }"
          >

            <!-- QUESTION -->
            <h3 class="faq-q">
              <button
                class="faq-btn"
                type="button"
                :aria-expanded="openId === item.id"
                :aria-controls="`faq-panel-${item.id}`"
                @click="toggleFaq(item.id)"
              >
                <span class="faq-question-text">
                  {{ item.question }}
                </span>

                <span class="faq-icon" aria-hidden="true">
                  <span class="faq-plus">+</span>
                  <span class="faq-close">×</span>
                </span>
              </button>
            </h3>

            <!-- ANSWER -->
            <div
              :id="`faq-panel-${item.id}`"
              class="faq-a"
              :aria-hidden="openId !== item.id"
              :inert="openId !== item.id"
            >
              <div class="faq-a-inner">
                <p>{{ item.answer }}</p>
              </div>
            </div>

          </article>
        </div>

      </div>
    </div>
  </section>
</template>
