
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import heroBg from '../../assets/saasbeds/Soft Sky-Blue Luminous Gradient.png'

const props = defineProps({
  backgroundImage: {
  type: String,
  default: heroBg
},

  eyebrow: {
    type: String
  },

  firstLine: {
    type: String,
    required: true
  },

  secondLine: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  primaryText: {
    type: String,
    default: 'Book a demo'
  },

  primaryHref: {
    type: String,
    default: 'https://saasbeds.com/book-a-demo/'
  },

  secondaryText: {
    type: String,
    default: 'Explore features'
  },

  secondaryHref: {
    type: String,
    default: '#platform-features'
  },

  rotatingLines: {
    type: Array,
    default: () => []
  }
})

const activeLine = ref(0)
let wordTimer = null

onMounted(() => {
  if (props.rotatingLines.length < 2) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  wordTimer = setInterval(() => {
    activeLine.value =
      (activeLine.value + 1) % props.rotatingLines.length
  }, 2800)
})

onBeforeUnmount(() => {
  if (wordTimer) clearInterval(wordTimer)
})
</script>

<template>
  <section
    class="sb-inner-hero"
    aria-labelledby="sb-inner-hero-title"
    :style="backgroundImage
      ? { backgroundImage: `url('${backgroundImage}')` }
      : {}"
  >
    <span
      class="sb-inner-hero__glow sb-inner-hero__glow--left"
      aria-hidden="true"
    ></span>

    <span
      class="sb-inner-hero__glow sb-inner-hero__glow--right"
      aria-hidden="true"
    ></span>

    <div class="sb-inner-hero__content">

      <h1
        id="sb-inner-hero-title"
        class="sb-inner-hero__title"
      >
        <span>{{ firstLine }}</span>

        <span class="sb-inner-hero__soft">
          <Transition name="sb-word" mode="out-in">
            <span
              :key="activeLine"
              class="sb-inner-hero__word"
            >
              {{
                rotatingLines.length
                  ? rotatingLines[activeLine]
                  : secondLine
              }}
            </span>
          </Transition>
        </span>
      </h1>

      <p class="sb-inner-hero__description">
        {{ description }}
      </p>

      <div class="sb-inner-hero__actions">
        <a
          class="sb-inner-hero__button sb-inner-hero__button--primary"
          :href="primaryHref"
        >
          {{ primaryText }}
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
.sb-inner-hero {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  min-height: clamp(510px, 66vh, 680px);
  padding: clamp(85px, 9vw, 125px) 22px 166px;
  overflow: hidden;

  /* Default background */
  background: linear-gradient(
    145deg,
    var(--color-blue-light, #D3F4FF) 0%,
    #e8f7ff 100%
  );

  /* Background image settings */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: #1a202b;
  font-family: var(--font-primary, 'Outfit', sans-serif);
  text-align: center;
}

.sb-inner-hero__content {
  width: min(100%, 1080px);
  margin-inline: auto;
}

.sb-inner-hero__title {
  display: grid;
  justify-items: center;
  gap: 5px;
  margin: 0;
  font-size: clamp(29px, 4.9vw, 75px);
  font-weight: 550;
  line-height: 1.08;
  letter-spacing: -.055em;
  text-wrap: balance;
}

.sb-inner-hero__title > span {
  display: block;
}

.sb-inner-hero__soft {
  color: #153C94;
}

.sb-inner-hero__description {
  max-width: 670px;
  margin: 30px auto 0;
  font-size: clamp(15px, 1.2vw, 17px);
  line-height: 1.7;
  color: #4f6173;
}

.sb-inner-hero__actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

/* Animated changing hero words */
.sb-inner-hero__word {
  display: inline-block;
}

/* Smooth transitions */
.sb-word-enter-active,
.sb-word-leave-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.45s ease;
}

/* Next text enters from below */
.sb-word-enter-from {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(5px);
}

/* Previous text disappears upward */
.sb-word-leave-to {
  opacity: 0;
  transform: translateY(-15px);
  filter: blur(5px);
}

@media (prefers-reduced-motion: reduce) {
  .sb-word-enter-active,
  .sb-word-leave-active {
    transition: none;
  }
}

/* Hero buttons */
.sb-inner-hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
  min-height: 48px;
  padding: 13px 25px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .01em;
  text-transform: uppercase;
  transition:
    transform .2s ease,
    background .2s ease,
    border-color .2s ease;
}

.sb-inner-hero__button:hover {
  transform: translateY(-2px);
}

.sb-inner-hero__button--primary {
  background: #153C94;
  color: #fff;
}

.sb-inner-hero__button--primary:hover {
  background: var(--color-blue-dark, #0e2b6b);
}

.sb-inner-hero__button--outline {
  background: #ffffffbd;
  color: #1b2330;
  border-color: #ffffff;
}

.sb-inner-hero__button--outline:hover {
  border-color: #a8c5de;
}

/* Smooth animation for the second heading only */
.sb-inner-hero__animate {
  display: inline-block;
  opacity: 0;
  transform: translateY(25px);
  animation: heroTextReveal 1.2s
    cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
}

@keyframes heroTextReveal {
  0% {
    opacity: 0;
    transform: translateY(25px);
    filter: blur(5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sb-inner-hero__animate {
    animation: none;
    opacity: 1;
    transform: none;
    filter: none;
  }
}

/* Mobile responsive */
@media (max-width: 640px) {
  .sb-inner-hero {
    min-height: 530px;
    padding: 78px 20px 133px;
  }

  .sb-inner-hero__eyebrow {
    font-size: 10px;
    margin-bottom: 24px;
  }

  .sb-inner-hero__title {
    font-size: clamp(36px, 9vw, 52px);
    gap: 9px;
  }

  .sb-inner-hero__description {
    margin-top: 24px;
  }

  .sb-inner-hero__button {
    min-height: 45px;
    padding: 11px 19px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sb-inner-hero__button {
    transition: none;
  }
}
</style>
