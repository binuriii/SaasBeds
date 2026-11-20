<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import QRCode from 'qrcode'
import { section, mobileApp, qr } from './AppShowcaseData.js'
import phones from '/Users/naduniameesha/SaasBeds/src/assets/saasbeds/image copy 2.png'

const banner = ref(null)
const entered = ref(false)
const qrSrc = ref('')

const hasLink = url => !!url?.trim() && url.trim() !== '#'
const appUrl = [qr.url, ...mobileApp.buttons.map(button => button.href)].find(hasLink)

let observer

onMounted(async () => {
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        entered.value = true
        observer.disconnect()
      }
    })
    observer.observe(banner.value)
  } else {
    entered.value = true
  }

  try {
    const target = new URL(appUrl || '/', window.location.href)
    qrSrc.value = await QRCode.toDataURL(target.href, { width: 320, margin: 4 })
  } catch {
    qrSrc.value = ''
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section
    id="app-showcase"
    class="section app-showcase"
    aria-labelledby="app-showcase-title"
  >
    <div class="container">
      <div ref="banner" class="banner" :class="{ entered }">
        <div class="hero">
          <div class="copy">
            <p class="tag rise">{{ section.tag }}</p>

            <h2 id="app-showcase-title" class="rise" style="--i: 1">
              {{ section.title1 }}<br>{{ section.title2 }}
            </h2>

            <p class="description rise" style="--i: 2">{{ section.text }}</p>

            <div class="downloads rise" style="--i: 3">
              <div class="stores">
                <component
                  :is="hasLink(b.href) ? 'a' : 'span'"
                  v-for="b in mobileApp.buttons"
                  :key="b.store"
                  :href="hasLink(b.href) ? b.href : undefined"
                  class="store"
                >
                  <svg v-if="b.store === 'apple'" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M17.1 12.6c0-2.2 1.8-3.4 1.9-3.5-1-1.5-2.6-1.8-3.1-1.8-1.4-.2-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.6 0-3.1.9-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.7 2.4 3 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8 2.2-1.2 3-2.4c.9-1.3 1.3-2.6 1.3-2.7-.1 0-3.3-1.2-3.3-4.1zM15.4 5.8c.7-.9 1.2-2.1 1.1-3.3-1 .1-2.3.7-3 1.6-.7.7-1.3 2-1.1 3.2 1.1.1 2.3-.6 3-1.5z"
                    />
                  </svg>

                  <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#54c4ff" d="M3 2l10 10L3 22z" />
                    <path fill="#4bd796" d="M3 2l14 8-4 2z" />
                    <path fill="#ffd34e" d="M17 10l4 2-4 2-4-2z" />
                    <path fill="#ff7779" d="M13 12l4 2-14 8z" />
                  </svg>

                  <span>
                    <small>{{ b.small }}</small>
                    <strong>{{ b.label }}</strong>
                  </span>
                </component>
              </div>

              <figure v-if="qrSrc">
                <img
                  :src="qrSrc"
                  width="104"
                  height="104"
                  :alt="appUrl ? 'App download QR code' : 'Website QR code'"
                >
                <figcaption>
                  {{ appUrl ? qr.label : 'Scan to visit our site' }}
                </figcaption>
              </figure>
            </div>
          </div>

          <div class="stage rise" style="--i: 4">
            <img
              :src="phones"
              alt="SaaSBeds mobile dashboard and bookings list on two overlapping phones"
              width="1024"
              height="1536"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./AppShowcase.css"></style>