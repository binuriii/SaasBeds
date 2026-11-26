<script setup>
import InnerHero from '../../../components/InnerPages/InnerHero.vue'
import TestimonialsSection from '../../../components/InnerPages/TestimonialsSection.vue'
import FAQ from '../../../components/FAQ/FAQ.vue'

import { hero, housekeepingFaq } from './HouseKeeping.js'

import AppShowcase from '../../../components/AppShowcase/AppShowcase.vue'

</script>

<template>
  <div class="all-features">

    <InnerHero v-bind="hero" />

    <TestimonialsSection/>
    <AppShowcase/>
    <FAQ v-bind="allFeaturesFaq" />

  </div>
</template>