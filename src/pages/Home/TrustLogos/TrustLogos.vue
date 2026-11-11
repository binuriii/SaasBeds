<script setup>
import { names } from './TrustLogosData.js'
</script>
<template>
<section class="wrap trust"><p>Trusted by hotels and guest houses around the world. <a href="#" class="more">Meet our customers</a></p>
<ul><li v-for="n in names" :key="n">{{n}}</li></ul></section>
</template>
<style scoped src="./TrustLogos.css"></style>
