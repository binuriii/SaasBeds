<script setup>
import InnerHero from '../../../components/InnerPages/InnerHero.vue'
import TestimonialsSection from '../../../components/InnerPages/TestimonialsSection.vue'
import FAQ from '../../../components/FAQ/FAQ.vue'

import { hero, allFeaturesFaq } from './AllFeatures.js'
</script>

<template>
  <div class="all-features">

    <InnerHero v-bind="hero" />

    <TestimonialsSection/>

    <FAQ v-bind="allFeaturesFaq" />

  </div>
</template>