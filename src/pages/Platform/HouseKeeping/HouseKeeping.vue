<script setup>
import InnerHero from '../../../components/InnerPages/InnerHero.vue'
import TestimonialsSection from '../../../components/InnerPages/TestimonialsSection.vue'
import FAQ from '../../../components/FAQ/FAQ.vue'

import { hero, houseKeepingFaq } from './HouseKeeping.js'

import AppShowcase from '../../../components/AppShowcase/AppShowcase.vue'
import ValueIntro from './ValueIntro/ValueIntro.vue'
import HouseKeepingFeatures from './HouseKeepingFeatures/HouseKeepingFeatures.vue'
import HouseKeepingHowItWorks from './HouseKeepingHowItWorks/HouseKeepingHowItWorks.vue'

</script>

<template>
  <div class="all-features">

    <InnerHero v-bind="hero" />
    <ValueIntro/>
    <HouseKeepingFeatures/>
    <HouseKeepingHowItWorks/>
    <TestimonialsSection/>
    <AppShowcase/>
    <FAQ v-bind="houseKeepingFaq" />

  </div>
</template>