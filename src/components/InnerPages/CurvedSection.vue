
<script setup>
defineProps({
  tone: {
    type: String,
    default: 'white'
  },

  // true = rounded section
  // false = straight section
  curved: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <section
    class="sb-curved"
    :class="[
      `sb-curved--${tone}`,
      { 'sb-curved--flat': !curved }
    ]"
  >
    <div class="sb-curved__container">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.sb-curved {
  position: relative;
  isolation: isolate;

  /* Original curved overlap */
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

  font-family: var(
    --font-primary,
    'Outfit',
    sans-serif
  );
}

/* =====================================
   STRAIGHT SECTION — NO CURVE
===================================== */

.sb-curved--flat {
  margin-top: 0;
  border-radius: 0;

  padding:
    clamp(70px, 7vw, 110px)
    0
    clamp(80px, 8vw, 120px);
}

/* =====================================
   SECTION COLORS
===================================== */

.sb-curved--white {
  background: #fff;
}

.sb-curved--mist {
  background: #f3f8fc;
}

.sb-curved--blue {
  background: var(
    --color-blue-light,
    #D3F4FF
  );
}

.sb-curved--dark {
  background: var(
    --color-blue-dark,
    #153C94
  );
  color: #fff;
}

/* =====================================
   CONTAINER
===================================== */

.sb-curved__container {
  width: min(
    1220px,
    calc(100% - 2 * clamp(22px, 5vw, 86px))
  );

  margin-inline: auto;
}

/* =====================================
   RESPONSIVE
===================================== */

@media (max-width: 700px) {
  .sb-curved {
    margin-top: -43px;

    padding:
      88px
      0
      126px;

    border-radius: 42px 42px 0 0;
  }

  .sb-curved--flat {
    margin-top: 0;
    border-radius: 0;

    padding:
      65px
      0
      85px;
  }
}
</style>
