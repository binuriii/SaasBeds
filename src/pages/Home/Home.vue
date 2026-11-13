<script setup>
import { onMounted } from 'vue'
import { homeMeta } from './Home.js'
import DashboardPreview from './DashboardPreview/DashboardPreview.vue'
import ProductCards from './ProductCards/ProductCards.vue'
import ImpactStats from './ImpactStats/ImpactStats.vue'
import FaqSection from './FaqSection/FaqSection.vue'
import CtaBanner from './CtaBanner/CtaBanner.vue'
import HeroSection from './HeroSection/HeroSection.vue'
import SolutionTabs from './SolutionTabs/SolutionTabs.vue'
import BrandOrbit from './BrandOrbit/BrandOrbit.vue'
import FeatureScroll from './FeatureScroll/FeatureScroll.vue'
onMounted(() => { document.title = homeMeta.title })
</script>
<template>
  <div class="home">
    <HeroSection/>
    <ProductCards />
    <FeatureScroll/>
    <ImpactStats />
    <SolutionTabs/>
    <DashboardPreview />
    <CtaBanner />
  </div>
</template>
<style src="./Home.css"></style>
