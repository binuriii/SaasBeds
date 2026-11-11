<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { announcement, utilityLinks, navItems, platform, solutions, resources } from './AppHeaderData.js'

const open = ref(null)
const drawer = ref(false)
const scrolled = ref(false)
const sub = ref(null)

const lbl = (i) => (typeof i === 'string' ? i : i.label)
const onScroll = () => { scrolled.value = window.scrollY > 40 }
const onKey = (e) => { if (e.key === 'Escape') { open.value = null; drawer.value = false } }
const toggle = (k) => { open.value = open.value === k ? null : k }
const flat = (k) => {
  if (k === 'platform') return platform.cols.flat().flatMap((b) => b.groups.flatMap((g) => g.items.map(lbl)))
  return (k === 'solutions' ? solutions : resources).cols.flatMap((c) => c.items)
}

onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey) })
</script>

<template>
<header class="hd" :class="{ scrolled }" @mouseleave="open = null">
  <a class="ann" :href="announcement.href"><span class="in"><i class="mark">S</i><b>{{ announcement.tag }}</b> - {{ announcement.text }} <em>→</em></span></a>
  <div class="util">
    <button class="lang" aria-label="Language">🌐 EN ▾</button>
    <a v-for="u in utilityLinks" :key="u" href="#">{{ u }}</a>
  </div>

  <nav class="bar" aria-label="Main">
    <a href="#" class="logo">SaasBeds</a>
    <ul class="nav">
      <li v-for="n in navItems" :key="n.label" @mouseenter="open = n.menu || null">
        <button v-if="n.menu" :class="{ on: open === n.menu }" :aria-expanded="open === n.menu" @click="toggle(n.menu)">{{ n.label }}</button>
        <a v-else href="#">{{ n.label }}</a>
      </li>
    </ul>
    <a href="#" class="demo">Book a demo</a>
    <button class="burger" :aria-expanded="drawer" aria-label="Menu" @click="drawer = !drawer">{{ drawer ? '✕' : '☰' }}</button>
  </nav>

  <div v-if="open" class="mega">
    <!-- PLATFORM -->
    <div v-if="open === 'platform'" class="m m-platform">
      <aside class="cards">
        <a v-for="c in platform.cards" :key="c.title" href="#" class="mc">
          <img :src="c.image" :alt="c.title" />
          <strong>{{ c.title }}</strong><small>{{ c.text }}</small>
        </a>
      </aside>
      <div v-for="(col, i) in platform.cols" :key="i" class="col">
        <section v-for="(b, j) in col" :key="j">
          <h4 v-if="b.title">{{ b.title }}</h4><p v-if="b.sub">{{ b.sub }}</p>
          <div v-for="(g, k) in b.groups" :key="k" class="grp">
            <h5 v-if="g.label">{{ g.label }}</h5>
            <a v-for="it in g.items" :key="lbl(it)" href="#" class="it">{{ lbl(it) }}<img v-if="it.badge" :src="it.badge" :alt="it.badgeAlt" /></a>
          </div>
        </section>
      </div>
    </div>

    <!-- SOLUTIONS -->
    <div v-else-if="open === 'solutions'" class="m m-solutions">
      <div v-for="c in solutions.cols" :key="c.label" class="col"><h5>{{ c.label }}</h5><a v-for="it in c.items" :key="it" href="#" class="it">{{ it }}</a></div>
      <a href="#" class="col art">
        <div class="meta"><span class="tag"><u></u>{{ solutions.article.tag }}</span><em>{{ solutions.article.meta }}</em></div>
        <strong>{{ solutions.article.title }}</strong>
        <img :src="solutions.article.image" alt="" />
      </a>
      <a href="#" class="col"><img class="full" :src="solutions.stat.image" :alt="solutions.stat.alt" /></a>
    </div>

    <!-- RESOURCES -->
    <div v-else class="m m-resources">
      <a href="#" class="feature"><img :src="resources.feature.image" :alt="resources.feature.alt" /></a>
      <div v-for="c in resources.cols" :key="c.label" class="col nb"><h5>{{ c.label }}</h5><a v-for="it in c.items" :key="it" href="#" class="it">{{ it }}</a></div>
      <a href="#" class="col art">
        <span class="tag"><u></u>{{ resources.article.tag }}</span>
        <strong>{{ resources.article.title }}</strong>
        <img :src="resources.article.image" alt="" />
      </a>
    </div>
  </div>

  <!-- MOBILE DRAWER -->
  <div v-if="drawer" class="drawer">
    <template v-for="n in navItems" :key="n.label">
      <button v-if="n.menu" class="row" @click="sub = sub === n.menu ? null : n.menu">{{ n.label }}<span>{{ sub === n.menu ? '−' : '+' }}</span></button>
      <a v-else href="#" class="row">{{ n.label }}</a>
      <div v-if="n.menu && sub === n.menu" class="subs"><a v-for="it in flat(n.menu)" :key="it" href="#">{{ it }}</a></div>
    </template>
    <a href="#" class="demo">Book a demo</a>
  </div>
</header>
<div v-if="open" class="dim" @click="open = null"></div>
</template>

<style scoped src="./AppHeader.css"></style>
