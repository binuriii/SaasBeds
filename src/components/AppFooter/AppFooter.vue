<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  brandName,
  banner,
  featureGroups,
  products,
  corporateSolutions,
  companyLinks,
  contactLinks,
  contactDescription,
  legalLinks,
  footerCredit
} from './AppFooterData.js'
import { logo } from '../AppHeader/AppHeaderData.js'
import SilkBackground from './SilkBackground.vue'
import './AppFooter.css'

const year = new Date().getFullYear()
const logoFailed = ref(false)

// Respect a Vite deployment under a subfolder without changing external/tel links.
const base = import.meta.env.BASE_URL ?? '/'
function resolveHref(href = '/') {
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href
  if (href.startsWith('#')) return `${base}${href}`
  if (href.startsWith('/')) {
    return base === '/' ? href : `${base.replace(/\/$/, '')}${href}`
  }
  return href
}
</script>

<template>
  <footer class="site-footer" aria-label="SaaSBeds website footer">
    <!-- Keep your original animated silk CTA banner -->
    <section class="footer-banner" aria-labelledby="footer-banner-title">
      <SilkBackground
        class="footer-silk"
        color="#153C94"
        :speed="0.65"
        :scale="1.2"
        :noise-intensity="0.8"
        :rotation="0.12"
        :light-mode="true"
      />
      <div class="footer-banner-overlay" aria-hidden="true"></div>
      <div class="footer-banner-content">
        <h2 id="footer-banner-title">{{ banner.title }}</h2>
        <div class="footer-banner-actions">
          <a :href="resolveHref(banner.primary.href)" class="footer-button footer-button-white">
            {{ banner.primary.label }}
          </a>
          <a :href="resolveHref(banner.secondary.href)" class="footer-button footer-button-dark">
            {{ banner.secondary.label }}
          </a>
        </div>
      </div>
    </section>

    <!-- Original rounded white footer panel -->
    <div class="footer-panel">
      <div class="footer-inner">
        <div class="footer-heading-row">
          <RouterLink to="/" class="footer-logo" :aria-label="`${brandName} home`">
            <img
              v-if="logo.src && !logoFailed"
              :src="logo.src"
              :alt="brandName"
              loading="lazy"
              @error="logoFailed = true"
            />
            <span v-else class="footer-logo-text">{{ brandName }}</span>
          </RouterLink>
        </div>

        <!-- Four platform / solutions groups -->
        <nav class="footer-feature-grid" aria-label="SaaSBeds features and solutions">
          <section v-for="group in featureGroups" :key="group.title" class="footer-column">
            <h3>{{ group.title }}</h3>
            <ul>
              <li v-for="item in group.items" :key="item.href">
                <a :href="resolveHref(item.href)" class="footer-text-link">
                  <span>{{ item.label }}</span>
                  <span v-if="item.badge" class="footer-badge">{{ item.badge }}</span>
                </a>
              </li>
            </ul>
          </section>
        </nav>

        <!-- Four supporting columns -->
        <nav class="footer-secondary-grid" aria-label="SaaSBeds resources, company, and contact">
          <section class="footer-column">
            <h3>Explore SaaSBeds</h3>
            <ul>
              <li v-for="item in products" :key="item.id">
                <a :href="resolveHref(item.href)" class="footer-text-link">{{ item.title }}</a>
              </li>
            </ul>
          </section>

          <section class="footer-column">
            <h3>Property solutions</h3>
            <ul>
              <li v-for="item in corporateSolutions" :key="item.id">
                <a :href="resolveHref(item.href)" class="footer-text-link">{{ item.title }}</a>
              </li>
            </ul>
          </section>

          <section class="footer-column">
            <h3>Company</h3>
            <ul>
              <li v-for="item in companyLinks" :key="item.href">
                <a :href="resolveHref(item.href)" class="footer-text-link">{{ item.label }}</a>
              </li>
            </ul>
          </section>

          <section class="footer-column footer-contact-column">
            <h3>Let's talk</h3>
            <ul>
              <li v-for="item in contactLinks" :key="item.href">
                <a :href="resolveHref(item.href)" class="footer-text-link">{{ item.label }}</a>
              </li>
            </ul>
            <p class="footer-contact-description">{{ contactDescription }}</p>
          </section>
        </nav>

        <div class="footer-bottom">
          <div class="footer-copyright">
            <p>© {{ year }} {{ brandName }}. All rights reserved.</p>
            <p class="footer-credit">
              <span>{{ footerCredit }}</span>
              <RouterLink to="/" class="footer-credit-logo" :aria-label="`${brandName} home`">
                <img
                  v-if="logo.src && !logoFailed"
                  :src="logo.src"
                  :alt="brandName"
                  loading="lazy"
                  @error="logoFailed = true"
                />
                <span v-else class="footer-logo-text footer-logo-text--sm">{{ brandName }}</span>
              </RouterLink>
            </p>
          </div>
          <nav class="footer-legal" aria-label="SaaSBeds legal information">
            <a v-for="item in legalLinks" :key="item.href" :href="resolveHref(item.href)">
              {{ item.label }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

