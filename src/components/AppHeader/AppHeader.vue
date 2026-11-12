<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { logo, announcement, languages, ctas, utilityLinks, navItems, platform, solutions, resources } from './AppHeaderData.js'

const open = ref(null)       // which mega menu is open
const drawer = ref(false)    // mobile drawer
const sub = ref(null)
const lang = ref('EN')
const langOpen = ref(false)
const links = utilityLinks.filter((u) => u !== 'Search')

const lbl = (i) => (typeof i === 'string' ? i : i.label)
const onKey = (e) => { if (e.key === 'Escape') { open.value = null; drawer.value = false; langOpen.value = false } }
const toggle = (k) => { open.value = open.value === k ? null : k }
const closeAll = () => { open.value = null; langOpen.value = false }
const pick = (l) => { lang.value = l; langOpen.value = false }
const logoFailed = ref(false)
const flat = (k) => {
  if (k === 'platform') return platform.cols.flat().flatMap((b) => b.groups.flatMap((g) => g.items.map(lbl)))
  return (k === 'solutions' ? solutions : resources).cols.flatMap((c) => c.items)
}

onMounted(() => { window.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey) })
</script>

<template>
<div class="mh">
  <!-- icon sprite -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <symbol id="mh-globe" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18"/></g></symbol>
    <symbol id="mh-search" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/></g></symbol>
    <symbol id="mh-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="mh-arrow" viewBox="0 0 24 24"><path d="M4 12h16M14 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  </svg>

  <!-- 1. announcement bar (#153C94) -->
  <a class="mh-ann" :href="announcement.href">
    <span class="mh-in mh-ann__in">
      <i class="mh-mark">S</i>
      <b>{{ announcement.tag }}</b><span>• {{ announcement.text }}</span>
      <svg class="mh-ic"><use href="#mh-arrow" /></svg>
    </span>
  </a>

  <!-- 2. utility row -->
  <div class="mh-util">
    <div class="mh-in mh-util__in">
      <div class="mh-lang" @mouseenter="langOpen = true" @mouseleave="langOpen = false">
        <button class="mh-util__item" type="button" :aria-expanded="langOpen" @click="langOpen = !langOpen">
          <svg class="mh-ic"><use href="#mh-globe" /></svg>{{ lang }}<svg class="mh-ic mh-ic--sm"><use href="#mh-chev" /></svg>
        </button>
        <ul v-if="langOpen" class="mh-lang__list">
          <li v-for="l in languages" :key="l"><button type="button" :class="{ on: l === lang }" @click="pick(l)">{{ l }}</button></li>
        </ul>
      </div>
      <a class="mh-util__item" href="#"><svg class="mh-ic"><use href="#mh-search" /></svg>Search</a>
      <a v-for="u in links" :key="u" class="mh-util__item" href="#">{{ u }}</a>
    </div>
  </div>

  <!-- 3. black line -->
  <div class="mh-line"></div>

  <!-- sticky part: only the white main bar sticks, so the coloured top bar scrolls away like Mews -->
  <header class="mh-sticky" @mouseleave="closeAll">

  <!-- 4. main bar -->
  <nav class="mh-in mh-bar" aria-label="Main">
    <a href="#" class="mh-logo" aria-label="SaaSBeds home">
  <img v-if="!logoFailed" :src="logo.src" :alt="logo.alt" @error="logoFailed = true" />
  <span v-else>SaasBeds</span>
</a>
    <ul class="mh-nav">
      <li v-for="n in navItems" :key="n.label" @mouseenter="open = n.menu || null">
        <a v-if="n.menu" href="#" role="button" class="mh-link" :class="{ on: open === n.menu }" :aria-expanded="open === n.menu" @click.prevent="toggle(n.menu)">{{ n.label }}</a>
        <a v-else href="#" class="mh-link">{{ n.label }}</a>
      </li>
    </ul>
    <div class="mh-actions">

      <a href="#" class="mh-btn mh-btn--solid">{{ ctas.primary }}</a>
    </div>
    <button class="mh-burger" type="button" :aria-expanded="drawer" aria-label="Menu" @click="drawer = !drawer">{{ drawer ? '✕' : '☰' }}</button>
  </nav>

  <!-- mega menus -->
  <div v-if="open" class="mh-mega">
    <div v-if="open === 'platform'" class="mh-m mh-platform">
      <aside class="mh-cards">
        <a v-for="c in platform.cards" :key="c.title" href="#" class="mh-card">
          <img :src="c.image" :alt="c.title" /><strong>{{ c.title }}</strong><small>{{ c.text }}</small>
        </a>
      </aside>
      <div v-for="(col, i) in platform.cols" :key="i" class="mh-col">
        <section v-for="(b, j) in col" :key="j">
          <h4 v-if="b.title">{{ b.title }}</h4><p v-if="b.sub">{{ b.sub }}</p>
          <div v-for="(g, k) in b.groups" :key="k" class="mh-grp">
            <h5 v-if="g.label">{{ g.label }}</h5>
            <a v-for="it in g.items" :key="lbl(it)" href="#" class="mh-it">{{ lbl(it) }}<img v-if="it.badge" :src="it.badge" :alt="it.badgeAlt" /></a>
          </div>
        </section>
      </div>
    </div>

    <div v-else-if="open === 'solutions'" class="mh-m mh-solutions">
      <div v-for="c in solutions.cols" :key="c.label" class="mh-col"><h5>{{ c.label }}</h5><a v-for="it in c.items" :key="it" href="#" class="mh-it">{{ it }}</a></div>
      <a href="#" class="mh-col mh-art">
        <div class="mh-meta"><span class="mh-tag"><u></u>{{ solutions.article.tag }}</span><em>{{ solutions.article.meta }}</em></div>
        <strong>{{ solutions.article.title }}</strong><img :src="solutions.article.image" alt="" />
      </a>
      <a href="#" class="mh-col"><img class="mh-full" :src="solutions.stat.image" :alt="solutions.stat.alt" /></a>
    </div>

    <div v-else class="mh-m mh-resources">
      <a href="#" class="mh-feature"><img :src="resources.feature.image" :alt="resources.feature.alt" /></a>
      <div v-for="c in resources.cols" :key="c.label" class="mh-col mh-col--nb"><h5>{{ c.label }}</h5><a v-for="it in c.items" :key="it" href="#" class="mh-it">{{ it }}</a></div>
      <a href="#" class="mh-col mh-art">
        <span class="mh-tag"><u></u>{{ resources.article.tag }}</span>
        <strong>{{ resources.article.title }}</strong><img :src="resources.article.image" alt="" />
      </a>
    </div>
  </div>

  <!-- mobile drawer -->
  <div v-if="drawer" class="mh-drawer">
    <template v-for="n in navItems" :key="n.label">
      <button v-if="n.menu" type="button" class="mh-row" @click="sub = sub === n.menu ? null : n.menu">{{ n.label }}<span>{{ sub === n.menu ? '−' : '+' }}</span></button>
      <a v-else href="#" class="mh-row">{{ n.label }}</a>
      <div v-if="n.menu && sub === n.menu" class="mh-subs"><a v-for="it in flat(n.menu)" :key="it" href="#">{{ it }}</a></div>
    </template>
    <div class="mh-actions mh-actions--drawer">
      <a href="#" class="mh-btn mh-btn--ghost">{{ ctas.secondary }}</a>
      <a href="#" class="mh-btn mh-btn--solid">{{ ctas.primary }}</a>
    </div>
  </div>
</header>
</div>
<div v-if="open" class="mh-dim" @click="open = null"></div>
</template>

<style scoped src="./AppHeader.css"></style>
