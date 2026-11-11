<script setup>
import { cta } from './CtaBannerData.js'
</script>
<template>
<section class="wrap"><div class="cta">
<h2 class="h2">{{ cta.title }}</h2><p>{{ cta.text }}</p>
<div><a class="btn dark" href="#">{{ cta.primary }}</a><a class="btn" href="#">{{ cta.secondary }}</a></div></div></section>
</template>
<style scoped src="./CtaBanner.css"></style>
