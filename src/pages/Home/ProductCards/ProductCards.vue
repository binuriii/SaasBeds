<script setup>
import { productCardsHeading, rooms, stays } from './ProductCardsData.js'
</script>

<template>
  <section class="section pc">
    <div class="container">
      <!-- heading -->
      <div class="pc__head stack reveal">
        <h2>{{ productCardsHeading.title1 }}<br>
          {{ productCardsHeading.title2 }}
        </h2>
        <p class="lead text-muted">{{ productCardsHeading.description }}</p>
      </div>

      <!-- cards -->
      <div class="pc__grid">
        <article class="pc__card pc__card--sky reveal">
          <span class="badge pc__badge">Front desk</span>
          <h3>Run your property your way</h3>
          <p class="lead">
            Simplify everything from booking to check-out with a cloud-based system designed for daily hotel operations.
          </p>
          <a href="#" class="more">Explore front desk →</a>

          <div class="pc__cal" aria-hidden="true">
            <div v-for="r in rooms" :key="r.no" class="pc__row">
              <em>{{ r.no }}</em>
              <b :style="{ gridColumn: `${r.start + 1} / span ${r.span}` }">{{ r.name }}</b>
            </div>
          </div>
        </article>

        <article class="pc__card pc__card--deep reveal">
          <span class="badge pc__badge">Booking engine</span>
          <h3>Turn visitors into direct bookings</h3>
          <p class="lead">
            A fast booking widget for your own website, with live availability and no commission.
          </p>
          <a href="#" class="more">Explore booking engine →</a>

          <div class="pc__phone" aria-hidden="true">
            <div v-for="s in stays" :key="s.name" class="pc__stay">
              <strong>{{ s.name }}</strong>
              <small class="text-muted">{{ s.meta }}</small>
            </div>
            <span class="btn btn-cta">Book now</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="./ProductCards.css"></style>