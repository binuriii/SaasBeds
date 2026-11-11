<script setup>
import { ref } from 'vue'
import { faq } from './FaqSectionData.js'
const open = ref(0)
</script>
<template>
<section class="sec wrap"><h2 class="h2">Got a question?</h2>
<ul><li v-for="(f,i) in faq" :key="f[0]"><button :aria-expanded="open===i" @click="open=open===i?-1:i"><span>{{f[0]}}</span><i>{{open===i?'−':'+'}}</i></button><p v-show="open===i">{{f[1]}}</p></li></ul></section>
</template>
<style scoped src="./FaqSection.css"></style>
