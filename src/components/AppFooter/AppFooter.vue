<script setup>
import { cols } from './AppFooterData.js'
</script>
<template>
<footer class="ft"><div class="wrap">
<div class="cols"><div v-for="(l,k) in cols" :key="k"><h4>{{k}}</h4><a v-for="i in l" :key="i" href="#">{{i}}</a></div></div>
<div class="bot"><span>© SaaSBeds 2026</span><span><a href="#">Privacy Policy</a> | <a href="#">Website Terms</a> | <a href="#">Preferences</a></span><span class="badge">GDPR · SSL secured</span></div>
</div></footer>
</template>
<style scoped src="./AppFooter.css"></style>
