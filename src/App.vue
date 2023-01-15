<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import chart from './components/chart.vue';
import l2d from './components/l2d.vue';
import music from './components/music.vue';
import useAxios from './composables/useAxios';

const axios = useAxios();

onMounted(async () => {
  
})
</script>

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
