<script setup>
import InnerHero from '../../../components/InnerPages/InnerHero.vue'
import TestimonialsSection from '../../../components/InnerPages/TestimonialsSection.vue'
import FAQ from '../../../components/FAQ/FAQ.vue'

import { hero, allFeaturesFaq } from './AllFeatures.js'
import FeatureDirectory from './FeatureDirectory/FeatureDirectory.vue';
import FeaturesShowcase from './FeaturesShowcase/FeaturesShowcase.vue';
</script>

<template>
  <div class="all-features">

    <InnerHero v-bind="hero" />
    <FeaturesShowcase/>
    <FeatureDirectory/>
    <TestimonialsSection/>
    <FAQ v-bind="allFeaturesFaq" />

  </div>
</template>