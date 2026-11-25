<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Existing global components — DO NOT change them or import the site header/footer here.
import InnerHero from '../../../../components/InnerPages/InnerHero.vue'
import CurvedSection from '../../../../components/InnerPages/CurvedSection.vue'
import AppShowcase from '../../../../components/AppShowcase/AppShowcase.vue'
import FAQ from '../../../../components/FAQ/FAQ.vue'

// All editable PMS-specific marketing copy and imagery is in this JS file.
import {
  seo,
  images,
  hero,
  heroExtra,
  introduction,
  featuresIntro,
  features,
  calendar,
  workflow,
  proof,
  related,
  closing,
  pmsFaq
} from './PropertyManagementSystem.js'

const router = useRouter()

// Related feature links become clickable when their own routes are registered.
// This prevents an unbuilt feature from silently redirecting to Home.
function hasRegisteredRoute(href) {
  const path = href.replace(/\/+$/, '') || '/'
  return router.getRoutes().some(record => record.path === path)
}

function routedHref(href) {
  return router.resolve(href).href
}

// Page-only SEO metadata. Restore the previous page metadata on navigation.
let previousTitle = ''
let previousDescription = ''
let descriptionMeta = null
let createdDescription = false

onMounted(() => {
  previousTitle = document.title
  document.title = seo.title

  descriptionMeta = document.querySelector('meta[name="description"]')
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta')
    descriptionMeta.setAttribute('name', 'description')
    document.head.appendChild(descriptionMeta)
    createdDescription = true
  } else {
    previousDescription = descriptionMeta.getAttribute('content') || ''
  }
  descriptionMeta.setAttribute('content', seo.description)
})

onBeforeUnmount(() => {
  document.title = previousTitle
  if (!descriptionMeta) return
  if (createdDescription) descriptionMeta.remove()
  else descriptionMeta.setAttribute('content', previousDescription)
})
</script>

<template>
  <main class="pms-page">
    <!-- 01 | The unchanged global InnerHero: H1 + supplied source description. -->
    <InnerHero v-bind="hero" />

    <!-- The shared InnerHero has one primary button. Add the requested second CTA
         here, without modifying InnerHero.vue or breaking the other pages. -->
    <div class="pms__hero-pricing">
      <a class="btn btn-outline pms__pricing-button" :href="heroExtra.href">
        {{ heroExtra.text }}
      </a>
    </div>

    <!-- 02 | Value intro + three benefits, supplied wording unchanged. -->
    <CurvedSection id="pms-introduction" tone="white">
      <header class="pms__section-head pms__section-head--split">
        <div>
          <span class="eyebrow pms__eyebrow">{{ introduction.eyebrow }}</span>
          <h2>{{ introduction.title }}</h2>
        </div>
        <span class="pms__head-rule" aria-hidden="true"></span>
      </header>

      <div class="pms__product-visual">
        <div class="pms__product-intro">
          <span class="pms__product-label">{{ introduction.productLabel }}</span>
          <h3>One live picture</h3>
          <p>{{ introduction.benefits[0].text }}</p>
        </div>
        <figure class="pms__product-image">
          <img
            v-if="images.dashboard"
            :src="images.dashboard"
            :alt="introduction.productAlt"
            loading="lazy"
          />
          <div v-else class="pms__product-fallback" role="img" aria-label="Illustrative PMS dashboard layout">
            <div class="pms__mock-top"><strong>SaaSBeds</strong><span>Dashboard</span></div>
            <div class="pms__mock-stats"><i></i><i></i><i></i></div>
            <div class="pms__mock-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>
          </div>
          <figcaption>{{ introduction.productNote }}</figcaption>
        </figure>
      </div>

      <div class="pms__benefits grid grid--3">
        <article
          v-for="benefit in introduction.benefits"
          :key="benefit.number"
          class="card pms__benefit"
          :class="`card--${benefit.tone}`"
        >
          <span class="pms__item-number">{{ benefit.number }}</span>
          <div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.text }}</p>
          </div>
        </article>
      </div>
    </CurvedSection>

    <!-- 03 | Six feature rows, including a real HTML/CSS illustration of the
         tape chart. The illustration is a mock-up, not connected to PMS data. -->
    <CurvedSection id="pms-features" tone="mist" class="pms-flat-section">
      <header class="pms__section-head pms__section-head--center">
        <span class="eyebrow pms__eyebrow">{{ featuresIntro.eyebrow }}</span>
        <h2>{{ featuresIntro.title }}</h2>
        <p class="lead">{{ featuresIntro.description }}</p>
      </header>

      <div class="pms__feature-rows">
        <article
          v-for="(feature, index) in features"
          :key="feature.number"
          class="pms__feature-row"
          :class="[`pms__feature-row--${feature.tone}`, { 'pms__feature-row--reverse': index % 2 === 1 }]"
        >
          <div class="pms__feature-copy">
            <span class="pms__feature-number">{{ feature.number }} / 06</span>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </div>

          <div class="pms__feature-media">
            <div v-if="feature.visual === 'calendar'" class="pms__calendar-shell">
              <div class="pms__calendar-top">
                <div class="pms__calendar-title">
                  <span class="pms__calendar-mark" aria-hidden="true">S</span>
                  <span>
                    <strong>{{ calendar.propertyName }}</strong>
                    <small>{{ calendar.label }}</small>
                  </span>
                </div>
                <span class="pms__calendar-badge">Preview</span>
              </div>
              <div class="pms__calendar-scroll" role="region" aria-label="Sample front desk room calendar" tabindex="0">
                <div class="pms__calendar-grid">
                  <div class="pms__calendar-day pms__calendar-corner">ROOM</div>
                  <div v-for="day in calendar.days" :key="day" class="pms__calendar-day">{{ day }}</div>
                  <template v-for="room in calendar.rooms" :key="room.name">
                    <div class="pms__calendar-room"><strong>{{ room.name }}</strong><small>{{ room.type }}</small></div>
                    <div class="pms__calendar-track">
                      <span v-for="day in calendar.days" :key="day" class="pms__calendar-cell" aria-hidden="true"></span>
                      <span
                        v-for="(booking, bookingIndex) in room.bookings"
                        :key="`${room.name}-${bookingIndex}`"
                        class="pms__calendar-booking"
                        :class="`pms__calendar-booking--${booking.tone}`"
                        :style="{ gridColumn: `${booking.start} / span ${booking.span}` }"
                      >{{ booking.text }}</span>
                    </div>
                  </template>
                </div>
              </div>
              <div class="pms__calendar-bottom">
                <div class="pms__calendar-legend">
                  <span v-for="item in calendar.legend" :key="item.label">
                    <i :class="`pms__legend--${item.tone}`" aria-hidden="true"></i>{{ item.label }}
                  </span>
                </div>
                <small>{{ calendar.previewLabel }}</small>
              </div>
            </div>

            <figure v-else class="pms__photo-frame" :class="{ 'pms__photo-frame--contain': feature.imageFit === 'contain' }">
              <img :src="feature.image" :alt="feature.imageAlt" loading="lazy" />
              <figcaption>{{ feature.visualLabel }}</figcaption>
            </figure>
          </div>
        </article>
      </div>
      <p class="pms__visual-note">Hotel photographs are editorial illustrations; the tape chart is an illustrative preview.</p>
    </CurvedSection>

    <!-- 04 | Exact three-step workflow. -->
    <CurvedSection id="pms-how-it-works" tone="white" class="pms-flat-section">
      <header class="pms__section-head pms__section-head--center">
        <span class="eyebrow pms__eyebrow">{{ workflow.eyebrow }}</span>
        <h2>{{ workflow.title }}</h2>
      </header>
      <div class="pms__steps grid grid--3">
        <article v-for="step in workflow.steps" :key="step.number" class="card pms__step">
          <span class="pms__step-number">{{ step.number }}</span>
          <div class="pms__step-divider" aria-hidden="true"></div>
          <h3>{{ step.title }}</h3>
        </article>
      </div>
    </CurvedSection>

    <!-- 05 | The source includes a placeholder, not a published client quote. -->
    <CurvedSection id="pms-proof" tone="mist" class="pms-flat-section">
      <div class="pms__proof">
        <div class="pms__proof-left">
          <span class="eyebrow pms__eyebrow">{{ proof.eyebrow }}</span>
          <h2>{{ proof.title }}</h2>
        </div>
        <figure class="pms__quote" :class="{ 'pms__quote--draft': !proof.verified }">
          <span v-if="!proof.verified" class="pms__draft-label">Draft placeholder · Not verified</span>
          <blockquote>“{{ proof.quote }}”</blockquote>
          <figcaption>— {{ proof.attribution }}</figcaption>
          <p v-if="!proof.verified" class="pms__draft-note">{{ proof.placeholderNote }}</p>
        </figure>
      </div>
    </CurvedSection>

    <!-- 06 | The three related modules specified in the original content. -->
    <CurvedSection id="pms-related" tone="white" class="pms-flat-section">
      <header class="pms__section-head pms__section-head--center">
        <span class="eyebrow pms__eyebrow">{{ related.eyebrow }}</span>
        <h2>{{ related.title }}</h2>
      </header>
      <div class="pms__related-grid grid grid--3">
        <article v-for="(item, i) in related.items" :key="item.title" class="card pms__related-card" :class="`pms__related-card--${i + 1}`">
          <span class="pms__related-count">{{ String(i + 1).padStart(2, '0') }}</span>
          <template v-if="hasRegisteredRoute(item.href)">
            <a :href="routedHref(item.href)" class="pms__related-link">
              <h3>{{ item.title }}</h3>
              <span aria-hidden="true">↗</span>
            </a>
          </template>
          <template v-else>
            <div class="pms__related-link pms__related-link--inactive">
              <h3>{{ item.title }}</h3>
              <span class="pms__unpublished">Page not linked yet</span>
            </div>
          </template>
        </article>
      </div>
    </CurvedSection>

    <!-- 07 | Exactly the requested closing CTA text. -->
    <CurvedSection id="pms-demo" tone="white" class="pms-flat-section">
      <div class="pms__closing">
        <span class="eyebrow pms__eyebrow pms__eyebrow--light">{{ closing.eyebrow }}</span>
        <h2>{{ closing.title }}</h2>
        <a :href="closing.buttonHref" class="btn btn-primary pms__closing-button">{{ closing.buttonText }}</a>
      </div>
    </CurvedSection>
  </main>

  <!-- Keep original Home AppShowcase component entirely outside PMS styles. -->
  <AppShowcase />

  <!-- 08 | Existing global FAQ, with all ten exact page-specific questions. -->
  <div class="pms-faq-scope">
    <FAQ v-bind="pmsFaq" />
  </div>
</template>

<style scoped src="./PropertyManagementSystem.css"></style>
