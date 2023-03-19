<template>
  <div ref="container" class="back_container">
    <div class="left" v-if="store.state.isLogin">
      <setSelf></setSelf>
      <manageFriend></manageFriend>
      <music class="music"></music>
    </div>
    <div class="center" v-if="store.state.isLogin">
      <chart :key="key"></chart>
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
  <l2d :key="key"></l2d>
</template>

<script setup>
import { ref, onMounted, watch, onActivated } from 'vue';
import setSelf from '../components/setSelf.vue';
import login from '../components/login.vue';
import music from '../components/music.vue';
import chart from '../components/chart.vue';
import setTag from '../components/setTag.vue';
import setLink from '../components/setLink.vue';
import uploadBlog from '../components/uploadBlog.vue';
import manageBlog from '../components/manageBlog.vue';
import manageFriend from '../components/manageFriend.vue';
import l2d from '../components/l2d.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const container = ref(null);
const mainCanvas = ref(null);
const router = useRouter();
const store = useStore();
let key = 0;

onActivated(() => {
  key++;
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
  background: v-bind(store.state.darkMode?'#000000':'#f6f6f6');
}

.music:hover {
  scale: 1;
}

.canvas {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
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