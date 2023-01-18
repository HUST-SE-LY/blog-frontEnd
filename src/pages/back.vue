<template>
  <div ref="container" class="back_container">
    <canvas ref="mainCanvas" class="canvas"></canvas>
    <div class="left">
      <setSelf></setSelf>
      <music></music>
    </div>
    <div class="center">
      <chart></chart>
    </div>
    <div class="right">
      <setTag></setTag>
      <setLink></setLink>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import setSelf from '../components/setSelf.vue';
import music from '../components/music.vue';
import chart from '../components/chart.vue';
import setTag from '../components/setTag.vue';
import setLink from '../components/setLink.vue';
const container = ref(null);
const mainCanvas = ref(null);

function initCanvas() {
  mainCanvas.value.width = container.value.offsetWidth;
  mainCanvas.value.height = container.value.offsetHeight;
}

onMounted(() => {
  initCanvas();
  bubbly({
    colorStart: "#ffffff",
    colorStop: "#ffffff",
    blur: 1,
    compose: "source-over",
    bubbles: 30,
    bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`,
    canvas: document.getElementById("main_canvas"), // default is created and attached// default is 4 + Math.random() * width / 25
  });
  window.addEventListener('resize', () => {
    initCanvas();
  })
})
</script>

<style scoped>
.back_container {
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  margin-top: 100px;
  position: relative;
  box-sizing: border-box;
  padding: 10px 50px;
  gap: 20px;
}

.canvas {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -10000;
}
</style>