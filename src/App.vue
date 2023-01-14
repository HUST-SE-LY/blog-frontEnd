<script setup>
import chart from './components/chart.vue';
import l2d from './components/l2d.vue';
</script>

<template>
  <chart></chart>
  <l2d></l2d>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
