<script setup>
import { testimonial } from './TestimonialData.js'
</script>
<template>
<section class="q"><blockquote class="wrap">
<span>“</span><p>{{ testimonial.quote }}</p>
<footer><b>{{ testimonial.name }}</b> · {{ testimonial.note }}</footer></blockquote></section>
</template>
<style scoped src="./Testimonial.css"></style>
