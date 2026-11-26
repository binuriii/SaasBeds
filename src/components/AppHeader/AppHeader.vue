<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import './AppHeader.css'

import {
  logo,
  announcement,
  ctas,
  navItems,
  platform,
  aiAgents,
  solutions,
  resources,
  company
} from './AppHeaderData.js'

const router = useRouter()

// Registered pages use Vue Router; other links keep their original href.
function isInternalRoute(href) {
  if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) {
    return false
  }

  return router.resolve(href).matched.some(
    route => route.name && !route.redirect
  )
}

function linkProps(href) {
  return isInternalRoute(href) ? { to: href } : { href }
}


const headerRoot = ref(null)
const mobileToggle = ref(null)
const mobileHeaderHeight = ref(120)
const mobileViewportHeight = ref('100dvh')
let headerResizeObserver = null

// Account for the wrapped announcement and the mobile browser keyboard.
function measureMobileHeader() {
  if (window.innerWidth >= 1200 || !headerRoot.value) return
  const viewport = window.visualViewport
  const viewportBottom = (viewport?.offsetTop || 0) + (viewport?.height || window.innerHeight)
  mobileHeaderHeight.value = Math.max(0, headerRoot.value.getBoundingClientRect().bottom)
  mobileViewportHeight.value = `${viewportBottom}px`
}

const open = ref(null)
const drawer = ref(false)
const mobileSub = ref(null)
const searchOpen = ref(false)
const searchTerm = ref('')
const logoFailed = ref(false)
const searchField = ref(null)

const desktopItems = computed(() => navItems.filter(item => item.label !== 'Log in'))
const login = computed(() => navItems.find(item => item.label === 'Log in'))

function openMenu(menu) {
  if (window.matchMedia('(max-width: 1199px)').matches) return
  open.value = menu
  searchOpen.value = false
}

function toggleMenu(menu) {
  open.value = open.value === menu ? null : menu
  searchOpen.value = false
}

function closeAll() {
  open.value = null
  drawer.value = false
  mobileSub.value = null
  searchOpen.value = false
}

// Close the navigation whenever the current route changes.
watch(
  () => router.currentRoute.value.fullPath,
  () => closeAll()
)

function toggleDrawer() {
  measureMobileHeader()
  drawer.value = !drawer.value
  if (!drawer.value) mobileSub.value = null
  open.value = null
  searchOpen.value = false
}

function openMobileSearch() {
  drawer.value = false
  mobileSub.value = null
  open.value = null
  searchOpen.value = true
  requestAnimationFrame(() => searchField.value?.focus())
}

function toggleSearch() {
  open.value = null
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) requestAnimationFrame(() => searchField.value?.focus())
}

function onKeyboard(event) {
  if (event.key === 'Escape') {
    const restoreMobileFocus = window.innerWidth < 1200 && (drawer.value || searchOpen.value)
    closeAll()
    if (restoreMobileFocus) mobileToggle.value?.focus()
  }
}

function onViewportChange() {
  measureMobileHeader()
  if (window.innerWidth < 1200) open.value = null
  if (window.innerWidth >= 1200) {
    drawer.value = false
    mobileSub.value = null
  }
}

watch(drawer, isOpen => {
  // Prevent the page behind a mobile drawer from scrolling.
  document.body.classList.toggle('saasbeds-mobile-menu-open', isOpen)
})

onMounted(() => {
  window.addEventListener('keydown', onKeyboard)
  window.addEventListener('resize', onViewportChange)
  window.visualViewport?.addEventListener('resize', measureMobileHeader)
  window.visualViewport?.addEventListener('scroll', measureMobileHeader)
  if (typeof ResizeObserver !== 'undefined') {
    headerResizeObserver = new ResizeObserver(measureMobileHeader)
    headerResizeObserver.observe(headerRoot.value)
  }
  measureMobileHeader()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyboard)
  window.removeEventListener('resize', onViewportChange)
  window.visualViewport?.removeEventListener('resize', measureMobileHeader)
  window.visualViewport?.removeEventListener('scroll', measureMobileHeader)
  headerResizeObserver?.disconnect()
  document.body.classList.remove('saasbeds-mobile-menu-open')
})

// Preserve the original section labels within the mobile accordion.
function mobileGroups(menu) {
  if (menu === 'platform') return [
    { label: '', items: platform.cards.map(card => ({ label: card.title, href: card.href })) },
    ...platform.cols.flatMap(column => column.map(section => ({
      label: section.title,
      items: section.groups.flatMap(group => group.items)
    })))
  ]
  if (menu === 'ai-agents') return [{ label: '', items: aiAgents.items }]
  if (menu === 'solutions') return [
    ...solutions.cols.flatMap(column => column.sections),
    { label: '', items: [{ label: 'Solutions Overview', href: solutions.article.href }] }
  ]
  if (menu === 'resources') return resources.cols
  if (menu === 'company') return company.cols
  return []
}
</script>

<template>
  <!-- Full-width navy announcement: exactly one blue strip, like your screenshot. -->
  <div ref="headerRoot" class="sb-site-header" :style="{
    '--sb-mobile-header-height': `${mobileHeaderHeight}px`,
    '--sb-mobile-viewport': mobileViewportHeight
  }">
  <component class="sb-announcement" :is="isInternalRoute(announcement.href) ? RouterLink : 'a'" v-bind="linkProps(announcement.href)" aria-label="Discover our new SaaSBeds Channel Manager" @click="closeAll">
    <span class="sb-container sb-announcement-inner">
      <span class="sb-announcement-logo" aria-hidden="true">S</span>
      <strong class="sb-announcement-label">{{ announcement.tag }}</strong>
      <span class="sb-announcement-message">
        <span class="sb-announcement-dot" aria-hidden="true">·</span>
        <span class="sb-announcement-copy">{{ announcement.text }}</span>
      </span>
    </span>
  </component>

  <!-- All utility links, main navigation and mega menus are white. -->
  <div class="sb-header-root">
    <div v-if="open || searchOpen || drawer" class="sb-backdrop" @click="closeAll"></div>

    <!-- White utility row and white Mews-inspired main navigation. -->
    <header class="sb-header" @mouseleave="open = null">

      <!-- Compact Mews-style utility links. -->
      <div class="sb-utility">
        <div class="sb-container sb-utility-inner">
          <span class="sb-utility-link sb-utility-lang" aria-label="Language English">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>
            EN <span class="sb-chevron" aria-hidden="true"></span>
          </span>
          <button type="button" class="sb-utility-link" :aria-expanded="searchOpen" @click="toggleSearch">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="6.2"/><path d="m15.3 15.3 5.2 5.2"/></svg>
            Search
          </button>
          <component class="sb-utility-link" :is="isInternalRoute('/contact-us/') ? RouterLink : 'a'" v-bind="linkProps('/contact-us/')" @click="closeAll">Contact us</component>
          <component v-if="login" class="sb-utility-link" :is="isInternalRoute(login.href) ? RouterLink : 'a'" v-bind="linkProps(login.href)" @click="closeAll">{{ login.label }}</component>
        </div>
      </div>

      <div class="sb-mainbar">
        <nav class="sb-container sb-nav" aria-label="Main navigation">
          <component class="sb-brand" :is="isInternalRoute('/') ? RouterLink : 'a'" v-bind="linkProps('/')" aria-label="SaaSBeds home" @click="closeAll">
            <img v-if="logo.src && !logoFailed" :src="logo.src" :alt="logo.alt" @error="logoFailed = true" />
            <strong v-else>SaaSBeds<span>.</span></strong>
          </component>

          <ul class="sb-nav-list">
            <li v-for="item in desktopItems" :key="item.label" @mouseenter="openMenu(item.menu || null)">
              <component v-if="!item.menu" class="sb-nav-link" :is="isInternalRoute(item.href) ? RouterLink : 'a'" v-bind="linkProps(item.href)" @focus="open = null" @click="closeAll">{{ item.label }}</component>
              <button
                v-else
                class="sb-nav-link sb-nav-dropdown"
                type="button"
                :class="{ 'is-current': open === item.menu }"
                :aria-controls="`sb-menu-${item.menu}`"
                :aria-expanded="open === item.menu"
                @click="toggleMenu(item.menu)"
              >{{ item.label }}</button>
            </li>
          </ul>

          <!-- One CTA only: restore Book a Demo with blue background. -->
          <div class="sb-actions">
            <component class="sb-btn sb-btn-blue" :is="isInternalRoute(ctas.primaryHref) ? RouterLink : 'a'" v-bind="linkProps(ctas.primaryHref)" @click="closeAll">{{ ctas.primary }}</component>
          </div>

          <button ref="mobileToggle" class="sb-menu-toggle" type="button" aria-label="Toggle navigation" :aria-expanded="drawer" aria-controls="sb-mobile-drawer" @click="toggleDrawer">
            <svg v-if="!drawer" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>
          </button>
        </nav>
      </div>

      <!-- Search panel. The form uses a simple GET query; adapt it to your actual search route if needed. -->
      <div v-if="searchOpen" class="sb-search-panel">
        <form class="sb-container sb-search-inner" action="/" method="get" role="search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>
          <input ref="searchField" v-model="searchTerm" type="search" name="s" aria-label="Search SaaSBeds" placeholder="Search SaaSBeds..." required />
          <button class="sb-search-submit" type="submit">Search <span aria-hidden="true">↗</span></button>
        </form>
      </div>

      <!-- Desktop full-width mega menus, divided by thin vertical lines. -->
      <div v-if="open" :id="`sb-menu-${open}`" class="sb-mega" :aria-label="`${open} menu`">
        <div v-if="open === 'platform'" class="sb-container sb-mega-grid sb-mega-platform">
          <div class="sb-mega-column sb-promo-stack">
           
              <component
                v-for="card in platform.cards"
                :key="card.title"
                class="sb-promo-card"
                :is="isInternalRoute(card.href) ? RouterLink : 'a'" v-bind="linkProps(card.href)"
                @click="closeAll"
              >
                <span class="sb-promo-image">
                  <img
                    v-if="card.image"
                    :src="card.image"
                    :alt="card.title"
                    loading="lazy"
                  />
                  <span v-else class="sb-image-fallback"></span>
                </span>

                <strong>{{ card.title }}</strong>

                <span class="sb-promo-description">
                  {{ card.text }}
                </span>
              </component>

          </div>
          <div v-for="(column, i) in platform.cols" :key="i" class="sb-mega-column">
            <section v-for="section in column" :key="section.title" class="sb-link-section">
              <h2 class="sb-section-heading">{{ section.title }}</h2>
              <p class="sb-section-description">{{ section.sub }}</p>
              <div v-for="(group, gi) in section.groups" :key="gi">
                <span v-if="group.label" class="sb-eyebrow">{{ group.label }}</span>
                <component v-for="entry in group.items" :key="entry.label" class="sb-mega-link" :is="isInternalRoute(entry.href) ? RouterLink : 'a'" v-bind="linkProps(entry.href)" @click="closeAll">{{ entry.label }}</component>
              </div>
            </section>
          </div>
        </div>

        <div v-else-if="open === 'solutions'" class="sb-container sb-mega-grid sb-mega-solutions">
          <div v-for="(column, i) in solutions.cols" :key="i" class="sb-mega-column">
            <section v-for="section in column.sections" :key="section.label" class="sb-link-section sb-section-spaced">
              <h2 class="sb-eyebrow">{{ section.label }}</h2>
              <component v-for="entry in section.items" :key="entry.label" class="sb-mega-link" :is="isInternalRoute(entry.href) ? RouterLink : 'a'" v-bind="linkProps(entry.href)" @click="closeAll">{{ entry.label }}</component>
            </section>
          </div>
          <component class="sb-mega-column sb-editorial" :is="isInternalRoute(solutions.article.href) ? RouterLink : 'a'" v-bind="linkProps(solutions.article.href)" @click="closeAll">
            <span class="sb-pills"><span class="sb-pill sb-pill-highlight"><span class="sb-pink-dot"></span>{{ solutions.article.tag }}</span><span class="sb-editorial-type">{{ solutions.article.category }}</span></span>
            <strong class="sb-editorial-title">{{ solutions.article.title }}</strong>
            <img v-if="solutions.article.image" class="sb-editorial-image" :src="solutions.article.image" :alt="solutions.article.alt" loading="lazy" />
          </component>
          <component class="sb-mega-column sb-stat-column" :is="isInternalRoute(solutions.feature.href) ? RouterLink : 'a'" v-bind="linkProps(solutions.feature.href)" @click="closeAll">
            <span class="sb-stat-card"><img v-if="solutions.feature.image" :src="solutions.feature.image" :alt="solutions.feature.alt" loading="lazy" /><span class="sb-pill sb-stat-pill"><span class="sb-pink-dot"></span>{{ solutions.feature.tag }}</span></span>
          </component>
        </div>

        <div v-else-if="open === 'resources'" class="sb-container sb-mega-grid sb-mega-resources">
          <div class="sb-mega-column sb-resource-intro">
            <component :is="isInternalRoute(resources.feature.href) ? RouterLink : 'a'" v-bind="linkProps(resources.feature.href)" class="sb-resource-card" @click="closeAll">
              <span class="sb-resource-tag">{{ resources.feature.tag }}</span>
              <strong>Resource Center</strong>
              <span>A library of hospitality insights.</span>
            </component>
          </div>
          <div class="sb-mega-column">
            <section v-for="column in resources.cols.slice(0, 2)" :key="column.label" class="sb-link-section sb-section-spaced">
              <h2 class="sb-eyebrow">{{ column.label }}</h2>
              <component v-for="entry in column.items" :key="entry.label" class="sb-mega-link" :is="isInternalRoute(entry.href) ? RouterLink : 'a'" v-bind="linkProps(entry.href)" @click="closeAll">{{ entry.label }}</component>
            </section>
          </div>
          <div class="sb-mega-column">
            <section v-for="column in resources.cols.slice(2)" :key="column.label" class="sb-link-section sb-section-spaced">
              <h2 class="sb-eyebrow">{{ column.label }}</h2>
              <component v-for="entry in column.items" :key="entry.label" class="sb-mega-link" :is="isInternalRoute(entry.href) ? RouterLink : 'a'" v-bind="linkProps(entry.href)" @click="closeAll">{{ entry.label }}</component>
            </section>
          </div>
          <component class="sb-mega-column sb-editorial sb-resource-editorial" :is="isInternalRoute(resources.feature.href) ? RouterLink : 'a'" v-bind="linkProps(resources.feature.href)" @click="closeAll">
            <span class="sb-pill sb-pill-highlight"><span class="sb-pink-dot"></span>{{ resources.feature.tag }}</span>
            <strong class="sb-editorial-title">{{ resources.feature.title }}</strong>
            <img v-if="resources.feature.image" class="sb-editorial-image" :src="resources.feature.image" :alt="resources.feature.alt" loading="lazy" />
          </component>
        </div>

        <div v-else-if="open === 'company'" class="sb-container sb-mega-grid sb-mega-company">
          <div class="sb-mega-column sb-resource-intro">
            <component class="sb-resource-card sb-company-card" :is="isInternalRoute(company.feature.href) ? RouterLink : 'a'" v-bind="linkProps(company.feature.href)" @click="closeAll">
              <span class="sb-resource-tag">{{ company.feature.tag }}</span>
              <strong>{{ company.feature.title }}</strong>
              <span>Get to know the team behind SaaSBeds.</span>
              <img v-if="company.feature.image" :src="company.feature.image" :alt="company.feature.alt" loading="lazy" />
            </component>
          </div>
          <div v-for="column in company.cols" :key="column.label" class="sb-mega-column">
            <section class="sb-link-section">
              <h2 class="sb-eyebrow">{{ column.label }}</h2>
              <component v-for="entry in column.items" :key="entry.label" class="sb-mega-link" :is="isInternalRoute(entry.href) ? RouterLink : 'a'" v-bind="linkProps(entry.href)" @click="closeAll">{{ entry.label }}</component>
            </section>
          </div>
        </div>

        <div v-else-if="open === 'ai-agents'" class="sb-container sb-mega-grid sb-mega-ai">
          <div class="sb-mega-column sb-resource-intro">
            <component class="sb-resource-card sb-ai-card" :is="isInternalRoute(aiAgents.feature.href) ? RouterLink : 'a'" v-bind="linkProps(aiAgents.feature.href)" @click="closeAll">
              <span class="sb-resource-tag">{{ aiAgents.feature.tag }}</span>
              <strong>{{ aiAgents.feature.title }}</strong>
              <span class="sb-ai-card-description">{{ aiAgents.feature.text }}</span>
       
            </component>
          </div>
          <div class="sb-mega-column">
            <section class="sb-link-section">
              <h2 class="sb-eyebrow">AI Agents</h2>
              <component v-for="entry in aiAgents.items" :key="entry.label" class="sb-mega-link" :is="isInternalRoute(entry.href) ? RouterLink : 'a'" v-bind="linkProps(entry.href)" @click="closeAll">{{ entry.label }}</component>
            </section>
          </div>
          <component class="sb-mega-column sb-editorial sb-ai-editorial" :is="isInternalRoute(aiAgents.feature.href) ? RouterLink : 'a'" v-bind="linkProps(aiAgents.feature.href)" @click="closeAll">
            <span class="sb-pill sb-pill-highlight">
              <span class="sb-pink-dot" aria-hidden="true"></span>{{ aiAgents.feature.tag }}
            </span>
            <strong class="sb-editorial-title">{{ aiAgents.items[0].label }}</strong>
            <img v-if="aiAgents.feature.image" class="sb-editorial-image" :src="aiAgents.feature.image" :alt="aiAgents.feature.alt" loading="lazy" />
          </component>
        </div>
      </div>

      <!-- Mobile accordion: uses the same data and URLs as desktop. -->
      <div v-if="drawer" id="sb-mobile-drawer" class="sb-mobile-drawer">
        <div class="sb-mobile-scroll">
          <div class="sb-mobile-utilities">
            <button class="sb-mobile-utility" type="button" @click="openMobileSearch">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="6.2"/><path d="m15.3 15.3 5.2 5.2"/></svg>
              Search
            </button>
            <component class="sb-mobile-utility" :is="isInternalRoute('/contact-us/') ? RouterLink : 'a'" v-bind="linkProps('/contact-us/')" @click="closeAll">Contact us</component>
          </div>
          <template v-for="item in navItems" :key="item.label">
            <component v-if="!item.menu" class="sb-mobile-row" :is="isInternalRoute(item.href) ? RouterLink : 'a'" v-bind="linkProps(item.href)" @click="closeAll">{{ item.label }} <span aria-hidden="true">↗</span></component>
            <template v-else>
              <button type="button" class="sb-mobile-row" :aria-controls="`sb-mobile-${item.menu}`" :aria-expanded="mobileSub === item.menu" @click="mobileSub = mobileSub === item.menu ? null : item.menu">
                {{ item.label }} <span aria-hidden="true">{{ mobileSub === item.menu ? '−' : '+' }}</span>
              </button>
              <div v-if="mobileSub === item.menu" :id="`sb-mobile-${item.menu}`" class="sb-mobile-sub">
                <section v-for="(group, index) in mobileGroups(item.menu)" :key="index" class="sb-mobile-group">
                  <h2 v-if="group.label" class="sb-eyebrow">{{ group.label }}</h2>
                  
                    <component
                      v-for="link in group.items"
                      :key="`${link.href}-${link.label}`"
                      :is="isInternalRoute(link.href) ? RouterLink : 'a'" v-bind="linkProps(link.href)"
                      @click="closeAll"
                    >
                      {{ link.label }}
                    </component>

                </section>
              </div>
            </template>
          </template>
          <div class="sb-mobile-actions">
            <component class="sb-btn sb-btn-blue" :is="isInternalRoute(ctas.primaryHref) ? RouterLink : 'a'" v-bind="linkProps(ctas.primaryHref)" @click="closeAll">{{ ctas.primary }}</component>
          </div>
        </div>
      </div>
    </header>
  </div>
  </div>
</template>

