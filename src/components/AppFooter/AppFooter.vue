<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
 brandName, banner, featureGroups, products, corporateSolutions,
 companyLinks, contactLinks, contactDescription, legalLinks
} from './AppFooterData.js'
import { logo } from '../AppHeader/AppHeaderData.js'   // swap for your own logo import if needed


import SilkBackground from './SilkBackground.vue'
import './AppFooter.css'


const base = import.meta.env.BASE_URL
const year = new Date().getFullYear()
const logoFailed = ref(false)   // text fallback when the logo file is missing


const resolveHref = (href) => {
 if (href === '/') return base
 if (href.startsWith('#')) return `${base}${href}`
 return href
}
</script>


<template>
 <footer class="site-footer">
   <section class="footer-banner" aria-labelledby="footer-banner-title">
     <!-- Animated blue silk background -->
     <SilkBackground class="footer-silk" color="#153C94":speed="0.65" :scale="1.2" :noise-intensity="0.8" :rotation="0.12" :light-mode="true" />


     <!-- Soft blue overlays -->
     <div class="footer-banner-overlay" aria-hidden="true"></div>


     <div class="footer-banner-content">
       <h2 id="footer-banner-title">{{ banner.title }}</h2>


       <div class="footer-banner-actions">
         <a :href="resolveHref(banner.primary.href)" class="footer-button footer-button-white">{{ banner.primary.label }}</a>
         <a :href="resolveHref(banner.secondary.href)" class="footer-button footer-button-dark">{{ banner.secondary.label }}</a>
       </div>
     </div>
   </section>


   <div class="footer-panel">
     <div class="footer-inner">
       <div class="footer-heading-row">
         <RouterLink to="/" class="footer-logo" :aria-label="`${brandName} home`">
           <img v-if="!logoFailed" :src="logo.src" :alt="brandName" loading="lazy" @error="logoFailed = true" />
           <span v-else class="footer-logo-text">{{ brandName }}</span>
         </RouterLink>
       </div>


       <nav class="footer-feature-grid" aria-label="Restaurant features">
         <section v-for="group in featureGroups" :key="group.title" class="footer-column">
           <h3>{{ group.title }}</h3>
           <ul>
             <li v-for="item in group.items" :key="item.label">
               <a :href="resolveHref(item.href)" class="footer-text-link">
                 <span>{{ item.label }}</span>
                 <span v-if="item.badge" class="footer-badge">{{ item.badge }}</span>
               </a>
             </li>
           </ul>
         </section>
       </nav>


       <nav class="footer-secondary-grid" aria-label="Company and product links">
         <section class="footer-column">
           <h3>Products</h3>
           <ul>
             <li v-for="product in products" :key="product.id">
               <a :href="resolveHref(product.href)" class="footer-text-link">{{ product.title }}</a>
             </li>
           </ul>
         </section>


         <section class="footer-column">
           <h3>Corporate Solutions</h3>
           <ul>
             <li v-for="solution in corporateSolutions" :key="solution.id">
               <a :href="resolveHref(solution.href)" class="footer-text-link">{{ solution.title }}</a>
             </li>
           </ul>
         </section>


         <section class="footer-column">
           <h3>Company</h3>
           <ul>
             <li v-for="link in companyLinks" :key="link.label">
               <a :href="resolveHref(link.href)" class="footer-text-link">{{ link.label }}</a>
             </li>
           </ul>
         </section>


         <section class="footer-column">
           <h3>Let’s talk</h3>
           <ul>
             <li v-for="link in contactLinks" :key="link.label">
               <a :href="resolveHref(link.href)" class="footer-text-link">{{ link.label }}</a>
             </li>
           </ul>
           <p class="footer-contact-description">{{ contactDescription }}</p>
         </section>
       </nav>


       <div class="footer-bottom">
         <div class="footer-copyright">
           <p>© {{ year }} {{ brandName }}. All rights reserved.</p>


           <p class="footer-credit">
             <span>Designed and developed by</span>
             <RouterLink to="/" class="footer-credit-logo" :aria-label="`${brandName} home`">
               <img v-if="!logoFailed" :src="logo.src" :alt="brandName" loading="lazy" @error="logoFailed = true" />
               <span v-else class="footer-logo-text footer-logo-text--sm">{{ brandName }}</span>
             </RouterLink>
           </p>
         </div>


         <nav class="footer-legal" aria-label="Legal information">
           <a v-for="link in legalLinks" :key="link.label" :href="resolveHref(link.href)">{{ link.label }}</a>
         </nav>
       </div>
     </div>
   </div>
 </footer>
</template>




