<template>
  <section class="testimonials section" aria-labelledby="testimonials-title">
    <div class="container">
      <header class="testimonials__head">
        <div>
          <h2 id="testimonials-title" class="testimonials__title">What our Clients Say</h2>
        </div>

        <div class="testimonials__nav">
          <button
            type="button"
            class="btn btn-outline testimonials__btn"
            :disabled="atStart"
            aria-label="Previous testimonial"
            @click="scrollByCard(-1)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Previous
          </button>
          <button
            type="button"
            class="btn btn-outline testimonials__btn"
            :disabled="atEnd"
            aria-label="Next testimonial"
            @click="scrollByCard(1)"
          >
            Next
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </header>
    </div>

    <!-- track is the same width as the heading, so cards are never cut off -->
    <div class="testimonials__viewport">
      <ul
        ref="track"
        class="testimonials__track"
        tabindex="0"
        aria-label="Client testimonials"
        @scroll.passive="onScroll"
      >
        <li v-for="(t, i) in testimonials" :key="i" class="t-card">
          <div class="t-card__body">
            <blockquote class="t-card__quote">{{ t.quote }}</blockquote>
            <div class="t-card__who">
              <p class="t-card__role">{{ t.role }}</p>
              <p class="t-card__org">{{ t.org }}</p>
            </div>
          </div>
          <div class="t-card__media">
            <img :src="t.image" :alt="t.alt" loading="lazy" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Replace image URLs with your own assets.
const testimonials = [
  {
  quote:
    'From concept to opening day, the team handled everything. Our indoor play zone is now fully booked on weekends.',
  role: 'Marketing Head',
  org: 'Family Entertainment Centre',
  image: 'https://images.unsplash.com/photo-1795257816286-1424980d9aed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  alt: 'Indoor play zone'
},
{
  quote:
    'The team transformed our outdoor space into a vibrant and engaging playground that children absolutely love.',
  role: 'Managing Director',
  org: 'Kids Adventure Park',
  image: 'https://images.unsplash.com/photo-1792591872159-d433f7a5028d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  alt: 'Outdoor adventure playground'
},
{
  quote:
    'The entire process was seamless, from initial planning to installation. Our new recreation area has become a favourite among guests.',
  role: 'General Manager',
  org: 'Luxury Hotel & Resort',
  image: 'https://images.unsplash.com/photo-1795022450934-f5481936637e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  alt: 'Luxury resort recreation area'
},
{
  quote:
    'We wanted a safe, interactive, and modern play environment. The final result exceeded our expectations in every way.',
  role: 'School Principal',
  org: 'Early Learning Centre',
  image: 'https://images.unsplash.com/photo-1792936285074-845c4a4fa43f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  alt: 'Interactive children’s learning space'
},
{
  quote:
    'Their creative designs and attention to detail helped us deliver an unforgettable entertainment experience for our visitors.',
  role: 'Operations Manager',
  org: 'Indoor Entertainment Arena',
  image: 'https://images.unsplash.com/photo-1794840593434-3c3ee170203b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  alt: 'Indoor entertainment arena'
},
]

const track = ref(null)
const atStart = ref(true)
const atEnd = ref(false)

function onScroll() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 2
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
}

function scrollByCard(dir) {
  const el = track.value
  if (!el) return
  const card = el.querySelector('.t-card')
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0
  const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth
  el.scrollBy({ left: dir * step, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => window.removeEventListener('resize', onScroll))
</script>

<style scoped>
/* Relies on the global brand tokens/classes (:root vars, .container, .section, .btn, .btn-outline, h2) */
.testimonials {
  --t-bg: #ffffff;
  --t-accent: var(--color-lime);
  --t-card-h: clamp(300px, 36vw, 422px);
  background: var(--t-bg);
}

.testimonials__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-bottom: clamp(24px, 4vw, 56px);
}
.testimonials__title { margin: 0; }

/* nav buttons */
.testimonials__nav { display: flex; gap: 12px; }
.testimonials__btn {
  min-height: 52px;
  padding-inline: 20px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  background: var(--t-bg);
  border: 1.5px solid #a8a8f3;
  color: var(--color-black);
  border-radius: var(--radius-md);
}
.testimonials__btn:hover:not(:disabled) {
  background: var(--color-white);
  border-color: #6a6ee9;
}
.testimonials__btn:not(:disabled) { background: var(--color-white); border-color: #412fe1; }
.testimonials__btn:disabled { color: var(--color-text-muted); cursor: not-allowed; opacity: 0.8; transform: none; }
.testimonials__btn svg { width: 20px; height: 20px; }

/* slider: same width as the heading container */
.testimonials__viewport {
  width: min(100% - 2 * var(--section-padding-x), var(--container-max));
  margin-inline: auto;
}
.testimonials__track {
  display: flex;
  gap: var(--gap);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 0;
}
.testimonials__track::-webkit-scrollbar { display: none; }

.t-card {
  position: relative;
  flex: 0 0 calc((100% - var(--gap)) / 2);
  height: var(--t-card-h);
  display: grid;
  grid-template-columns: 1fr 56%;
  grid-template-rows: minmax(0, 1fr);   /* add this */
  background: #f5f5f5;
  border-radius: var(--radius-lg);
  overflow: hidden;
  scroll-snap-align: start;
}

.t-card__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(20px, 2.4vw, 34px);
  position: relative;
  z-index: 1;
}
.t-card__quote {
  font-size: clamp(14px, 1.2vw, 17px);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.01em;
  max-width: 28ch;
}
.t-card__role {
  font-size: clamp(17px, 1.6vw, 22px);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-black);
}
.t-card__org {
  margin-top: 4px;
  font-size: clamp(14px, 1.2vw, 17px);
  color: var(--color-text-muted);
}

.t-card__media {
  position: relative;
  min-height: 0;
  margin-left: -8%;
  clip-path: polygon(16% 0, 100% 0, 100% 100%, 0 100%);
  background: var(--color-green-light);
}
.t-card__media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .t-card { flex-basis: 100%; }
}
@media (max-width: 768px) {
  .t-card { grid-template-columns: 1fr 48%; height: 340px; }
  .t-card__quote { max-width: none; }
  .testimonials__btn { width: auto; min-height: 44px; }
}
@media (max-width: 480px) {
  .testimonials__nav { width: 100%; }
  .testimonials__btn { flex: 1; width: auto; }
  .t-card {
    grid-template-columns: 1fr;
    grid-template-rows: auto 160px;
    height: auto;
  }
  .t-card__media {
    margin: 0;
    height: 160px;
    clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 100%);
  }
}
</style>