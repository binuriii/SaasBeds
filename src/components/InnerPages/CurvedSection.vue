<script setup>
defineProps({
  tone: {
    type: String,
    default: 'white'
  }
})
</script>

<template>
  <section class="sb-curved" :class="`sb-curved--${tone}`">
    <div class="sb-curved__container">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.sb-curved {
  position: relative;
  isolation: isolate;

  margin-top: -68px;

  padding:
    var(--section-padding-top)
    var(--section-padding-x)
    var(--section-padding-bottom);

  border-radius:
    clamp(36px, 6.4vw, 88px)
    clamp(36px, 6.4vw, 88px)
    0 0;

  background: #fff;
  color: #20242c;

  font-family: var(--font-primary, 'Outfit', sans-serif);
}

/* Background colours */

.sb-curved--white {
  background: var(--color-white, #ffffff);
}

.sb-curved--mist {
  background: #f3f8fc;
}

.sb-curved--blue {
  background: var(--color-blue-light, #D3F4FF);
}

.sb-curved--dark {
  background: var(--color-blue-dark, #153C94);
  color: #fff;
}

/* Container */

.sb-curved__container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
}

/* Mobile */

@media (max-width: 700px) {
  .sb-curved {
    margin-top: -43px;
    border-radius: 42px 42px 0 0;
  }
}
</style>