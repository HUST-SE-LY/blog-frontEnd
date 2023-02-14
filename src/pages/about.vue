<template>
  <div ref="container" :class="`container`">
    <canvas ref="mainCanvas" id="main_canvas"></canvas>
    <div class="box">
      <h1 :class="`${store.state.darkMode?'dark':''}`">技术栈</h1>
      <div class="link_box has_back">
        <a href="https://vuejs.org/" target="_blank"><img src="../assets/Vue.svg" alt="vue3/vuex/vue-router"></a>
        <a href="https://cn.vitejs.dev/" target="_blank"><img src="../assets/vite-logo.svg" alt="vite"></a>
        <a href="https://www.nginx.com/"><img src="../assets/nginx.svg" alt="node"></a>
        <a href="https://www.mysql.com/"><img src="../assets/mysql.svg" alt="mysql"></a>
        <a href="https://koajs.com/"><img src="../assets/koa.svg" alt="koa"></a>
      </div>
      <h1 :class="`${store.state.darkMode?'dark':''}`">引用</h1>
      <div class="link_box">
        <a href="https://github.com/imuncle/live2d" target="_blank" :class="`${store.state.darkMode?'dark':''}`">live2d看板</a>
        <a href="https://github.com/tipsy/bubbly-bg" target="_blank" :class="`${store.state.darkMode?'dark':''}`">背景动态气泡</a>
        <a href="https://neteasecloudmusicapi.vercel.app/#/" :class="`${store.state.darkMode?'dark':''}`">音乐接口提供</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const container = ref(null);
const mainCanvas = ref(null);
const store = useStore();



</script>

<style scoped>

.container {
  height: 100vh;
  padding-top: 100px;
  box-sizing: border-box;
  background: v-bind(store.state.darkMode?'#000000':'#f6f6f6');
}
.link_box {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  
}

img {
  height: 50px;
  width: auto;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  margin-top: 100px;
}

a {
  text-decoration: none;
  color: black;
  transition: all 0.3s;
}

a:hover {
  color: rgba(130, 170, 255);
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1000; 
}

.has_back {
  background-color: rgba(255,255,255,0.7);
  width: fit-content;
  margin: 0 auto;
  padding: 25px;
  border-radius: 15px;
}
</style>