<template>
  <login v-if="store.state.showLoginBox"></login>
  <div class="loading"></div>
  <canvas ref="mainCanvas" class="canvas"></canvas>
  <div class="container" ref="container">
    <div class="left" @scroll="changeLoading">
      <titleHead>正文</titleHead>
      <div v-html="content" class="main" ref="main"></div>
    </div>
    <div class="right">
      <titleHead>目录</titleHead>
      <a target="" v-for="title in menu" :href="`#${title.id}`" :class="title.style">{{ title.value }}</a>
    </div>
  </div>
  <l2d></l2d>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import l2d from '../components/l2d.vue'
import useAxios from '../composables/useAxios';
import titleHead from '../components/titleHead.vue';
import login from '../components/login.vue';
import { useStore } from 'vuex';

const store = useStore();
const axios = useAxios();
const routes = useRoute()
const content = ref("");
const loadingWidth = ref(0);
const mainCanvas = ref(null);
const container = ref(null);
const main = ref(null);
const menu = ref([]);
const tags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
onMounted(async () => {
  const id = routes.params.id;
  const result = await axios.post('get/blogById', {
    id: id,
  })
  content.value = result.data.html;
  initCanvas();
  bubbly({
    colorStart: "#ffffff",
    colorStop: "#ffffff",
    blur: 1,
    compose: "source-over",
    bubbles: 30,
    bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`,
    canvas: document.getElementById("canvas"), // default is created and attached// default is 4 + Math.random() * width / 25
  });
  window.addEventListener('resize', () => {
    initCanvas();
  });
  await nextTick();
  const doms = main.value.children;
  createTree(doms)
})

function createTree(doms) {
  for (let i = 0; i < doms.length; i++) {
    if (tags.includes(doms[i].tagName)) {
      menu.value.push({
        value: doms[i].innerText,
        style: doms[i].tagName,
        id: doms[i].id,
      })
    }
  }
}

function initCanvas() {
  mainCanvas.value.width = container.value.offsetWidth;
  mainCanvas.value.height = container.value.offsetHeight;
}



function changeLoading(e) {
  const width = (e.srcElement.scrollTop / (e.srcElement.scrollHeight - e.srcElement.clientHeight)) * 100;
  loadingWidth.value = width + "%"
}



onBeforeRouteLeave((to,from,next) => {
  if(to.path === '/back') {
    if(store.state.isLogin) {
      next()
    } else {
      store.commit('showLogin')
    }
  } else {
    next();
  }
})

</script>

<style scoped>
@font-face {
  font-family: Consolas;
  src: url(../font/consolas.ttf);
}

@keyframes movein {
  from {
    opacity: 0;
    transform: translateY(10px);
  } to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes wordin {
  form {
    scale: 0.1;
    opacity: 0;
  } to {
    scale: 1;
    opacity: 1;
  }
  
}


* {
  font-family: 'Consolas';
  line-height: 30px;
}

a {
  display: block;
  text-decoration: none;
  color: black;
  transition: all 0.3s;
  position: relative;
  width: fit-content;
  height: 50px;
  border-left: 1px solid rgba(130, 170, 255);
  padding-left: 10px;
  line-height: 50px;
  white-space: nowrap;
}

a::before {
  width: 0;
  position: absolute;
  bottom: 0px;
  height: 1px;
  background-color: rgba(130, 170, 255);
  content: "";
  transition: all 0.3s;
  box-sizing: border-box;
}

a:hover::before {
  width: 100%;
}


a:hover {
  color: rgba(130, 170, 255);
  border-width: 3px;
}



.H1 {
  font-size: 20px;
  font-weight: 800;
}

.H2 {
  font-size: 20px;
}

.H3 {
  font-size: 18px;
  margin-left: 12px;
}

.H4 {
  font-size: 16px;
  margin-left: 24px;
}

.H5 {
  font-size: 14px;
  margin-left: 36px;
}

.H6 {
  font-size: 14px;
  margin-left: 48px;
  color: gray;
}


.container {
  display: grid;
  grid-template-columns: 4fr 1fr;
  margin-top: 50px;
  padding: 20px;
  gap: 20px;
  scale: 1;

}

.canvas {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -10000;
}

.left {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
  max-height: 800px;
  overflow: scroll;
  position: relative;
  animation: movein 1s forwards ease-out;
}

.right {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
  overflow: scroll;
  max-height: 400px;
  animation: movein 1s forwards ease-out;
}

.right::-webkit-scrollbar {
  display: none;
}

.loading {
  width: v-bind(loadingWidth);
  height: 5px;
  background-color: rgba(130, 170, 255);
  position: fixed;
  top: 50px;
  left: 0;
  content: "";
  z-index: 1000000;
}

.left::-webkit-scrollbar {
  display: none;
}

.left:hover {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
}


.main:deep(pre) {
  padding: 10px;
  border-radius: 10px;
  background-color: #f6f8fa;
  line-height: normal;
  overflow-x: scroll;
  margin-top: 20px;
  margin-bottom: 20px;
}

.main:deep(pre)::-webkit-scrollbar {
  display: none;
}

.main:deep(code) {
  padding: 2px;
  background: #f6f8fa;
  color: palevioletred;
  font-family: 'Consolas';
}

.main:deep(pre) code {
  background: transparent;
  color: black;
  font-family: 'Consolas';
  line-height: 24px;
  font-size: 16px;
}

.main:deep(li) {
  margin-left: 30px;
}

.main:deep(p) {
  margin: 10px 0;
}

.main:deep(h1) {
  font-size: 36px;
  line-height: 70px;

}

.main:deep(h2) {
  font-size: 32px;
  line-height: 66px;
}

.main:deep(h3) {
  font-size: 28px;
  line-height: 62px;
}

.main:deep(h4) {
  font-size: 24px;
  line-height: 58px;
}

.main:deep(h5) {
  font-size: 20px;
  line-height: 54px;
}

.main:deep(h6) {
  font-size: 16px;
  line-height: 50px;
}

@media screen and (max-width:800px) {
  .right {
    display: none;
  }
}
</style>