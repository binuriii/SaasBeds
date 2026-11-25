<script setup>
import InnerHero from '../../../components/InnerPages/InnerHero.vue'
import CurvedSection from '../../../components/InnerPages/CurvedSection.vue'
import AppShowcase from '../../../components/AppShowcase/AppShowcase.vue'
import FAQ from '../../../components/FAQ/FAQ.vue'

import {
  hero,
  overview,
  areas,
  images,
  featuresHeading,
  features,
  gallery,
  experience,
  editorial,
  platformFaq
} from './PlatformOverview.js'
</script>

<template>
  <div class="sbp">
    <!-- Keep the original global inner-page hero and its rotating words. -->
    <InnerHero v-bind="hero" />

    <!-- 01 | SaaSBeds platform image + connected areas -->
    <CurvedSection id="platform-areas" tone="white">
      <div class="sbp__section-intro sbp__section-intro--split">
        <div>
          <span class="sbp__eyebrow">{{ overview.eyebrow }}</span>
          <h2>{{ overview.titleFirst }} <span>{{ overview.titleSecond }}</span></h2>
        </div>
        <p>{{ overview.description }}</p>
      </div>

      <div class="sbp__overview-panel">
        <div class="sbp__overview-copy">
          <span class="sbp__eyebrow sbp__eyebrow--muted">{{ overview.visualEyebrow }}</span>
          <h3>{{ overview.visualTitle }}</h3>
          <p>{{ overview.visualText }}</p>
          <div class="sbp__pills">
            <span v-for="tag in overview.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="sbp__overview-image">
          <img
            v-if="images.dashboard"
            :src="images.dashboard"
            :alt="overview.imageAlt"
            loading="lazy"
          />
          <div v-else class="sbp__dashboard-fallback" aria-hidden="true">
            <div class="sbp__dashboard-bar"><strong>SaaSBeds</strong><span>Dashboard</span></div>
            <div class="sbp__dashboard-stat"><i/><i/><i/></div>
            <div class="sbp__dashboard-graph"><i/><i/><i/><i/><i/><i/><i/><i/></div>
          </div>
        </div>
      </div>

      <div class="sbp__area-grid">
        <article
          v-for="area in areas"
          :key="area.number"
          class="sbp__area-card"
          :class="[`sbp__area-card--${area.tone}`, { 'sbp__area-card--wide': area.wide }]"
        >
          <div class="sbp__area-content">
            <span class="sbp__area-number">{{ area.number }}</span>
            <h3>{{ area.title }}</h3>
            <p>{{ area.text }}</p>
          </div>
          <div v-if="area.image" class="sbp__area-image">
            <img :src="area.image" :alt="area.imageAlt" loading="lazy" />
          </div>
        </article>
      </div>
    </CurvedSection>

    <!-- 02 | Image-first SaaSBeds product features -->
    <CurvedSection id="platform-features" tone="mist">
      <div class="sbp__section-intro sbp__section-intro--center">
        <span class="sbp__eyebrow">{{ featuresHeading.eyebrow }}</span>
        <h2>{{ featuresHeading.titleFirst }} <span>{{ featuresHeading.titleSecond }}</span></h2>
        <p>{{ featuresHeading.description }}</p>
      </div>

      <div class="sbp__feature-stack">
        <article
          v-for="feature in features"
          :key="feature.number"
          class="sbp__feature"
          :class="`sbp__feature--${feature.tone}`"
        >
          <div class="sbp__feature-media">
            <img
              v-if="feature.image"
              :src="feature.image"
              :alt="feature.imageAlt"
              :class="{ 'sbp__fit-contain': feature.fit === 'contain' }"
              loading="lazy"
            />
            <div v-else class="sbp__feature-fallback">SaaSBeds</div>
            <span class="sbp__image-label">{{ feature.photoLabel }}</span>
          </div>
          <div class="sbp__feature-text">
            <span class="sbp__eyebrow">{{ feature.number }} / {{ feature.tag }}</span>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
            <div class="sbp__feature-pills">
              <span v-for="chip in feature.chips" :key="chip">{{ chip }}</span>
            </div>
          </div>
        </article>
      </div>
    </CurvedSection>

    <!-- 03 | Unsplash photography gallery -->
    <CurvedSection id="platform-stays" tone="white">
      <div class="sbp__section-intro sbp__section-intro--split">
        <div>
          <span class="sbp__eyebrow">{{ gallery.eyebrow }}</span>
          <h2>{{ gallery.titleFirst }} <span>{{ gallery.titleSecond }}</span></h2>
        </div>
        <p>{{ gallery.description }}</p>
      </div>
      <div class="sbp__gallery">
        <figure
          v-for="(stay, index) in gallery.stays"
          :key="stay.title"
          class="sbp__gallery-item"
          :class="{ 'sbp__gallery-item--large': index === 0 }"
        >
          <div class="sbp__gallery-photo">
            <img :src="stay.image" :alt="stay.alt" loading="lazy" />
          </div>
          <figcaption>
            <strong>{{ stay.title }}</strong>
            <span>{{ stay.subtitle }}</span>
          </figcaption>
        </figure>
      </div>
    </CurvedSection>

    <!-- 04 | Photo-led guest experience story -->
    <CurvedSection id="platform-guest-experience" tone="mist">
      <div class="sbp__experience">
        <div class="sbp__experience-visual">
          <div class="sbp__experience-photo">
            <img :src="experience.mainImage" :alt="experience.mainAlt" loading="lazy" />
          </div>
          <div class="sbp__experience-inset">
            <img :src="experience.insetImage" :alt="experience.insetAlt" loading="lazy" />
          </div>
          <span class="sbp__experience-caption">{{ experience.miniLabel }}</span>
        </div>

        <div class="sbp__experience-copy">
          <span class="sbp__eyebrow">{{ experience.eyebrow }}</span>
          <h2>{{ experience.titleFirst }} <span>{{ experience.titleSecond }}</span></h2>
          <p class="sbp__experience-lead">{{ experience.description }}</p>
          <div class="sbp__experience-points">
            <div v-for="point in experience.points" :key="point.number" class="sbp__experience-point">
              <span class="sbp__point-number">{{ point.number }}</span>
              <div>
                <h3>{{ point.title }}</h3>
                <p>{{ point.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CurvedSection>

    <!-- 05 | Immersive editorial section -->
    <CurvedSection id="platform-hospitality" tone="white">
      <div class="sbp__editorial">
        <img class="sbp__editorial-photo" :src="editorial.image" :alt="editorial.imageAlt" loading="lazy" />
        <div class="sbp__editorial-shade" aria-hidden="true"></div>
        <div class="sbp__editorial-copy">
          <span class="sbp__eyebrow sbp__eyebrow--white">{{ editorial.eyebrow }}</span>
          <h2>{{ editorial.titleFirst }} <em>{{ editorial.titleSecond }}</em></h2>
          <p>{{ editorial.description }}</p>
          <span class="sbp__editorial-note">{{ editorial.note }}</span>
        </div>
      </div>
      <div class="sbp__editorial-highlights">
        <article v-for="(highlight, index) in editorial.highlights" :key="highlight.title">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ highlight.title }}</h3>
          <p>{{ highlight.text }}</p>
        </article>
      </div>
    </CurvedSection>

    <!-- Global original components: no edits to their files or design. -->
    <AppShowcase />
    <FAQ v-bind="platformFaq" />
  </div>
</template>

<style scoped src="./PlatformOverview.css"></style>
