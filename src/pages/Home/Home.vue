<script setup>
import { onMounted } from 'vue'
import { homeMeta } from './Home.js'
import DashboardPreview from './DashboardPreview/DashboardPreview.vue'
import TrustLogos from './TrustLogos/TrustLogos.vue'
import ProductCards from './ProductCards/ProductCards.vue'
import ChannelsReports from './ChannelsReports/ChannelsReports.vue'
import PropertyTypes from './PropertyTypes/PropertyTypes.vue'
import Integrations from './Integrations/Integrations.vue'
import ImpactStats from './ImpactStats/ImpactStats.vue'
import Testimonial from './Testimonial/Testimonial.vue'
import FaqSection from './FaqSection/FaqSection.vue'
import CtaBanner from './CtaBanner/CtaBanner.vue'
onMounted(() => { document.title = homeMeta.title })
</script>
<template>
  <div class="home">
    <DashboardPreview /><TrustLogos /><ProductCards /><ChannelsReports /><PropertyTypes />
    <Integrations /><ImpactStats /><Testimonial /><FaqSection /><CtaBanner />
  </div>
</template>
<style src="./Home.css"></style>
