<template>
  <div ref="container" class="back_container">
    <canvas ref="mainCanvas" class="canvas" id="main_canvas"></canvas>
    <div class="left" v-if="store.state.isLogin">
      <setSelf></setSelf>
      <music class="music"></music>
    </div>
    <div class="center" v-if="store.state.isLogin">
      <chart></chart>
      <div class="center_bottom">
        <uploadBlog></uploadBlog>
        <manageBlog></manageBlog>
      </div>
    </div>
    <div class="right" v-if="store.state.isLogin">
      <setTag></setTag>
      <setLink></setLink>
    </div>
  </div>
  <login v-if="!store.state.isLogin"></login>
  <l2d></l2d>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import setSelf from '../components/setSelf.vue';
import login from '../components/login.vue';
import music from '../components/music.vue';
import chart from '../components/chart.vue';
import setTag from '../components/setTag.vue';
import setLink from '../components/setLink.vue';
import uploadBlog from '../components/uploadBlog.vue';
import manageBlog from '../components/manageBlog.vue';
import l2d from '../components/l2d.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const container = ref(null);
const mainCanvas = ref(null);
const router = useRouter();
const store = useStore();

function initCanvas() {
  mainCanvas.value.width = container.value.offsetWidth;
  mainCanvas.value.height = container.value.offsetHeight;
  bubbly({
    colorStart: "#ffffff",
    colorStop: "#ffffff",
    blur: 1,
    compose: "source-over",
    bubbles: 30,
    bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`,
    canvas: mainCanvas.value, // default is created and attached// default is 4 + Math.random() * width / 25
  });
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

@keyframes movein {
  from {
    transform: translateY(100px);
    scale: 0.8;
    opacity: 0;
  } to {
    scale: 1;
    opacity: 1;
    transform: translateY(0px);
  }
}

.noLogin {
  padding: 50px 100px;
  width: fit-content;
  border-radius: 25px;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  margin: 200px auto;
}
.back_container {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  position: relative;
  box-sizing: border-box;
  padding: 100px 50px;
  gap: 20px;
  overflow: hidden;
}

.music:hover {
  scale: 1;
}

.canvas {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -100;
}

.center_bottom {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
}

.left,.center,.right {
  transition: all 0.3s;
  animation: movein 0.5s forwards ease-out;
}


</style>