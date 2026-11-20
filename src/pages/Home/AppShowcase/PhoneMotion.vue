<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import opening from '../../../assets/saasbeds/phone-ui/opening.webp'
import palm from '../../../assets/saasbeds/phone-ui/palm.webp'
import riverside from '../../../assets/saasbeds/phone-ui/riverside.webp'
import map from '../../../assets/saasbeds/phone-ui/map.webp'
import portrait from '../../../assets/saasbeds/phone-ui/agent.webp'

import neighborhood from '../../../assets/saasbeds/phone-ui/neighborhood.webp?url'
import sunset from '../../../assets/saasbeds/phone-ui/sunset.webp?url'

defineProps({ src: { type: String, required: true } })

const homes = [
  { name: 'Palm Grove Villa', location: 'Miami, FL', price: '$850,000', beds: 5, area: '3,200', photo: palm },
  { name: 'Riverside Apartment', location: 'Austin, TX', price: '$420,000', beds: 3, area: '1,180', photo: riverside }
]
const pages = ['Explore', 'Saved homes', 'Compare', 'Map search', 'Neighborhood', 'Book a tour', 'Tour details', 'Messages', 'Agent profile']
const viewport = ref(null)
const current = ref(0)
const selected = ref(0)
const home = computed(() => homes[selected.value])
const saved = ref([0, 1])
const day = ref(0)
const time = ref('14:30')
const tour = ref(null)
const draft = ref('')
const conversation = ref([])
const chatList = ref(null)
const dates = Array.from({ length: 3 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() + i + 1)
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
})
const manual = ref(false)
let visible = false
let observer
let preference
let frame = 0
let elapsed = 0
let previousTime = 0
let travel = 0
let resizeObserver
const legSeconds = 32

function stopDemo() {
  manual.value = true
  refresh()
}
function measure() {
  const node = viewport.value
  if (node) travel = Math.max(0, node.scrollHeight - node.clientHeight)
}
function animate(time) {
  const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.1) : 0
  previousTime = time
  elapsed = (elapsed + dt) % (2 * legSeconds)
  // The cosine reaches zero velocity at both ends for a gentle, continuous reversal.
  const fraction = (1 - Math.cos(Math.PI * elapsed / legSeconds)) / 2
  viewport.value.scrollTop = fraction * travel
  frame = requestAnimationFrame(animate)
}
function refresh() {
  cancelAnimationFrame(frame)
  frame = 0
  previousTime = 0
  if (visible && !manual.value && !document.hidden && !preference?.matches) {
    measure()
    frame = requestAnimationFrame(animate)
  }
}
function resume() {
  measure()
  const fraction = travel ? Math.min(1, Math.max(0, viewport.value.scrollTop / travel)) : 0
  const phase = Math.acos(1 - 2 * fraction) * legSeconds / Math.PI
  elapsed = elapsed > legSeconds ? 2 * legSeconds - phase : phase
  manual.value = false
  refresh()
}
function go(index) {
  stopDemo()
  const section = viewport.value?.children[index]
  if (section) viewport.value.scrollTo({ top: section.offsetTop, behavior: preference?.matches ? 'instant' : 'smooth' })
}
function track() {
  const node = viewport.value
  if (!node) return
  const position = node.scrollTop + node.clientHeight * 0.35
  current.value = Array.from(node.children).reduce((last, page, i) => page.offsetTop <= position ? i : last, 0)
}
function toggleSaved(index) {
  saved.value = saved.value.includes(index) ? saved.value.filter(n => n !== index) : [...saved.value, index]
}
function book() {
  tour.value = { name: home.value.name, date: dates[day.value], time: time.value }
  go(6)
}
function send() {
  const message = draft.value.trim()
  if (!message) return
  conversation.value.push(message)
  draft.value = ''
  nextTick(() => { if (chatList.value) chatList.value.scrollTop = chatList.value.scrollHeight })
}
onMounted(() => {
  preference = matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', refresh)
  document.addEventListener('visibilitychange', refresh)
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(viewport.value)
    for (const page of viewport.value.children) resizeObserver.observe(page)
  }
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; refresh() })
    observer.observe(viewport.value)
  } else { visible = true; refresh() }
})
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
  resizeObserver?.disconnect()
  preference?.removeEventListener('change', refresh)
  document.removeEventListener('visibilitychange', refresh)
})
</script>

<template>
  <div class="phone-motion" @pointerdown="stopDemo" @wheel.passive="stopDemo" @focusin="stopDemo">
    <img class="handsets" :src="src" width="1122" height="1402" alt="Two overlapping property app phones">
    <div ref="viewport" class="viewport" role="region" aria-label="Interactive property app. Scroll to explore." tabindex="0"
         @scroll.passive="track" @keydown.down.self.prevent="go(Math.min(current + 1, 8))"
         @keydown.up.self.prevent="go(Math.max(current - 1, 0))">
      <section class="page opening">
        <button aria-label="Explore saved homes" @click="go(1)"><img :src="opening" alt="Made for You. Explore Properties."></button>
      </section>
      <section class="page">
        <h3>Saved homes</h3>
        <p class="caption">{{ saved.length }} saved properties</p>
        <div v-for="(property, i) in homes" :key="property.name" class="listing">
          <img :src="property.photo" :alt="property.name">
          <button class="heart" :aria-label="'Save ' + property.name" :aria-pressed="saved.includes(i)" @click="toggleSaved(i)">{{ saved.includes(i) ? '♥' : '♡' }}</button>
          <div class="line"><strong>{{ property.name }}</strong><small>{{ property.location }}</small></div>
        </div>
        <button class="action" @click="go(2)">Compare properties →</button>
      </section>
      <section class="page">
        <h3>Compare homes</h3>
        <div class="pair"><div v-for="property in homes" :key="property.name">
          <img :src="property.photo" :alt="property.name"><strong>{{ property.name }}</strong>
        </div></div>
        <dl class="facts"><div v-for="[label, a, b] in [['Price',homes[0].price,homes[1].price],['Beds',5,3],['Area (sq ft)','3,200','1,180']]" :key="label">
          <dt>{{ label }}</dt><dd>{{ a }}</dd><dd>{{ b }}</dd>
        </div></dl>
        <button class="action" @click="go(3)">Explore the map →</button>
      </section>
      <section class="page">
        <h3>Map search</h3>
        <img class="map" :src="map" alt="Illustrated property map">
        <div class="choices"><button v-for="(item,i) in homes" :key="item.name" :aria-pressed="selected === i" @click="selected = i">{{ item.location }}</button></div>
        <div class="line"><strong>{{ home.name }}</strong><small>{{ home.price }}</small></div>
        <button class="action" @click="go(4)">View neighborhood →</button>
      </section>
      <section class="page">
        <h3>Neighborhood</h3><p class="caption">{{ home.location }}</p>
        <img class="wide" :src="neighborhood" alt="Neighborhood map with nearby parks, cafés and transit">
        <dl class="facts"><div v-for="[label, value] in (selected === 0 ? [['Park','0.6 mi'],['Café','0.3 mi'],['Transit','0.4 mi']] : [['Park','0.4 mi'],['Café','0.2 mi'],['Transit','0.5 mi']])" :key="label"><dt>{{ label }}</dt><dd>{{ value }}</dd></div></dl>
        <button class="action" @click="go(5)">Book a tour →</button>
      </section>
      <section class="page">
        <h3>Book a tour</h3><p class="caption">{{ home.name }}</p>
        <img class="wide" :src="selected === 0 ? sunset : home.photo" :alt="home.name">
        <h4>Choose a day</h4><div class="choices"><button v-for="(date,i) in dates" :key="date" :aria-pressed="day === i" @click="day=i">{{ date }}</button></div>
        <h4>Available times</h4><div class="choices"><button v-for="slot in ['10:00','14:30','16:00']" :key="slot" :aria-pressed="time === slot" @click="time=slot">{{ slot }}</button></div>
        <button class="action" @click="book">Confirm demo tour</button>
      </section>
      <section class="page">
        <h3>{{ tour ? 'Tour confirmed' : 'Tour details' }}</h3><p class="caption">{{ tour ? 'Saved in this preview' : 'Your selected visit' }}</p>
        <div class="ticket"><span class="seal">{{ tour ? '✓' : '◷' }}</span><strong>{{ tour?.name || home.name }}</strong><span>{{ tour?.date || dates[day] }} · {{ tour?.time || time }}</span></div>
        <button class="action" @click="go(5)">{{ tour ? 'Change visit' : 'Choose a time' }}</button>
      </section>
      <section class="page chat">
        <h3>Messages</h3>
        <button class="contact" @click="go(8)"><img :src="portrait" alt=""><span><strong>Jayson Roy</strong><small>View agent profile →</small></span></button>
        <div ref="chatList" class="thread" aria-live="polite"><p>Hi! Which property would you like to visit?</p><p v-for="(msg,i) in conversation" :key="i" class="mine">{{ msg }}</p></div>
        <form @submit.prevent="send"><input v-model="draft" aria-label="Demo message" placeholder="Write a message" maxlength="200"><button aria-label="Send demo message" :disabled="!draft.trim()">↑</button></form>
      </section>
      <section class="page">
        <h3>Agent profile</h3>
        <div class="profile"><img :src="portrait" alt="Jayson Roy"><strong>Jayson Roy</strong><span>Property agent</span></div>
        <dl class="facts"><div><dt>Guest rating</dt><dd>★ 4.8</dd></div><div><dt>Specialty</dt><dd>Villas & apartments</dd></div></dl>
        <button class="action" @click="go(7)">Message Jayson</button>
      </section>
    </div>
    <button v-if="manual" type="button" class="resume" @click="resume">Resume scroll</button>
    <nav class="dock" aria-label="Phone navigation">
      <button v-for="([label,index]) in [['Home',0],['Map',3],['Saved',1],['Tours',5],['Messages',7]]" :key="label" :aria-label="label" @click="go(index)"></button>
    </nav>
  </div>
</template>

<style scoped>
.phone-motion { position: relative; color: #19201d; }
.handsets { display: block; width: 100%; height: auto; }
.viewport {
  position: absolute; left: 7.30838%; top: 27.10414%; width: 42.24599%; height: 55.92011%;
  overflow-y: auto; overflow-x: hidden; scroll-behavior: auto; overflow-anchor: none;
  container-type: inline-size; scrollbar-width: none; background: #f9faf2;
}
.viewport::-webkit-scrollbar { display: none; }
.viewport .page {
  box-sizing: border-box; padding: 4cqw 4.4cqw 5cqw;
  display: flex; flex-direction: column; gap: 3cqw; overflow: hidden;
  font: 4.1cqw/1.32 var(--font-primary, 'Outfit', Arial, sans-serif);
  background: linear-gradient(110deg,#f9faf7,#f1f5de);
}
.viewport .opening { height: 100%; padding: 0; }
.opening button,.opening img { width: 100%; height: 100%; display: block; }
.phone-motion button,.phone-motion input { font: inherit; color: inherit; }
.phone-motion button { border: 0; padding: 0; background: transparent; cursor: pointer; }
.phone-motion button:focus-visible,.viewport:focus-visible,.phone-motion input:focus-visible { outline: 2px solid #63812c; outline-offset: -2px; }
.viewport h3,.viewport h4,.viewport p,.viewport dl,.viewport dd { margin: 0; }
.viewport h3 { font-size: 8cqw; font-weight: 650; line-height: 1.06; letter-spacing: -.045em; color: #18201a; }
.viewport h4,.viewport strong { font-weight: 600; }
.viewport h4 { font-size: 4.4cqw; }
.viewport small,.caption,.profile span { font-size: 3.6cqw; color: #56604e; }
.listing,.pair > div,.ticket,.profile,.facts { background: #fff; border-radius: 4cqw; }
.listing { position: relative; }
.listing > img,.pair img,.wide,.map { display: block; width: 100%; object-fit: cover; border-radius: 3.6cqw; }
.listing > img { height: 32cqw; }
.viewport .heart { position: absolute; right: 2cqw; top: 2cqw; background: #fff; width: 10cqw; height: 10cqw; border-radius: 50%; font-size: 6cqw; }
.viewport .heart[aria-pressed=true] { background: #f1f675; }
.line,.contact span,.profile,.ticket { display: grid; gap: .8cqw; }
.line { padding: 2cqw 3cqw; }
.viewport .action { margin-top: 1cqw; background: #edf463; font-weight: 600; border-radius: 8cqw; padding: 3.2cqw; }
.pair,.choices,.facts div,.contact,.chat form { display: flex; gap: 2cqw; }
.pair > div { flex: 1; min-width: 0; overflow: hidden; }
.pair img { height: 36cqw; }
.pair strong { display: block; padding: 2.4cqw; }
.facts { padding: 1cqw 3cqw; }
.facts div { padding: 3.8cqw 0; align-items: center; }
.facts div + div { border-top: 1px solid #e8eadf; }
.facts dt { margin-right: auto; color: #51594c; }
.facts dd { text-align: right; font-variant-numeric: tabular-nums; }
.facts dd + dd { min-width: 22cqw; }
.wide { height: 35cqw; }
.map { height: 62cqw; }
.choices button { background: white; padding: 2.4cqw; flex: 1; border-radius: 4cqw; }
.choices [aria-pressed=true] { background: #eef58d; box-shadow: inset 0 0 0 1px #bfcc63; }
.ticket,.profile { text-align: center; justify-items: center; padding: 8cqw 3cqw; gap: 2cqw; }
.seal,.chat form button { border-radius: 50%; background: #edf463; }
.seal { padding: 2cqw 5cqw; font-size: 9cqw; }
.contact { text-align: left; align-items: center; }
.contact img,.profile img { width: 13cqw; height: 13cqw; border-radius: 50%; object-fit: cover; }
.profile img { width: 24cqw; height: 24cqw; }
.thread { max-height: 54cqw; overflow: auto; }
.thread p { background: white; padding: 3cqw; border-radius: 3cqw; max-width: 80%; margin: 2cqw 0; overflow-wrap: anywhere; }
.thread .mine { background: #f3f59f; margin-left: auto; }
.chat input { min-width: 0; flex: 1; border: 1px solid #dae0d2; background: white; border-radius: 5cqw; padding: 2cqw; }
.chat form button { width: 10cqw; height: 10cqw; }
.dock { position: absolute; left: 9%; top: 83%; width: 39%; height: 6.7%; display: flex; }
.dock button { flex: 1; border-radius: 50%; }
@media (prefers-reduced-motion: reduce) { .viewport { scroll-behavior: auto; } }
.resume { position: absolute; right: 7%; bottom: 6%; font: 600 12px/1.3 Arial,sans-serif !important; padding: 7px 12px !important; background: #f5f7dc !important; border-radius: 999px; }
.viewport .page + .page { border-top: 1px solid #e5e8d7; }
.viewport .opening + .page { border-top: 0; }
.viewport .listing { box-shadow: 0 1cqw 3cqw #1620000b; overflow: hidden; }
@media (prefers-reduced-motion: reduce) { .resume { display: none; } }
</style>
