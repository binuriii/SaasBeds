
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
    clamp(106px, 10vw, 152px)
    0
    clamp(132px, 12vw, 174px);
  border-radius:
    clamp(36px, 6.4vw, 88px)
    clamp(36px, 6.4vw, 88px)
    0 0;
  background: #fff;
  color: #20242c;
  font-family: var(--font-primary, 'Outfit', sans-serif);
}

.sb-curved--white {
  background: #fff;
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

.sb-curved__container {
  width: min(
    1220px,
    calc(100% - 2 * clamp(22px, 5vw, 86px))
  );
  margin-inline: auto;
}

@media (max-width: 700px) {
  .sb-curved {
    margin-top: -43px;
    padding: 88px 0 126px;
    border-radius: 42px 42px 0 0;
  }
}
</style>
