<script setup>
import { onMounted } from 'vue'
import { homeMeta } from './Home.js'
import DashboardPreview from './DashboardPreview/DashboardPreview.vue'
import ProductCards from './ProductCards/ProductCards.vue'
import LogoBrands from './LogoBrands/LogoBrands.vue'
import ImpactStats from './ImpactStats/ImpactStats.vue'
import HeroSection from './HeroSection/HeroSection.vue'
import BrandOrbit from './BrandOrbit/BrandOrbit.vue'
import FeatureScroll from './FeatureScroll/FeatureScroll.vue'
import SwitchingToSaasBeds from './SwitchingToSaasBeds/SwitchingToSaasBeds.vue'
import FAQ from '../../components/FAQ/FAQ.vue'
import HowItWorksCards from './HowItWorksCards/HowItWorksCards.vue'
import SolutionShowcase from './SolutionShowcase/SolutionShowcase.vue'
import CustomerStories from './CustomerStories/CustomerStories.vue'
onMounted(() => { document.title = homeMeta.title })
</script>
<template>
  <div class="home">
    <HeroSection/>
    <LogoBrands/>
    <ProductCards />
    <FeatureScroll/>
    <ImpactStats />
    <HowItWorksCards/>
    <SwitchingToSaasBeds />
    <SolutionShowcase/>
    <DashboardPreview />
    <CustomerStories/> 
    <FAQ />
    
  </div>
</template>
<style src="./Home.css"></style>
