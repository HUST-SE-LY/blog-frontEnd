<template>
  <login v-if="store.state.showLoginBox"></login>
  <div class="container" ref="container">
    <canvas ref="mainCanvas" class="canvas"></canvas>
    <div :class="`left ${store.state.darkMode ? 'dark_background' : ''}`" ref="left">
      <titleHead :class="`${store.state.darkMode ? 'dark' : ''}`">正文</titleHead>
      <loading v-if="isLoading"></loading>
      <div v-html="content" :class="`main ${store.state.darkMode ? 'dark' : ''}`" ref="main"></div>
    </div>
    <div :class="`right ${store.state.darkMode ? 'dark_background' : ''}`">
      <titleHead :class="`${store.state.darkMode ? 'dark' : ''}`">目录</titleHead>
      <a target="" v-for="title in menu" :href="`#${title.id}`" :class="title.style">{{ title.value }}</a>
    </div>
  </div>
  <l2d class="l2d"></l2d>
</template>

<script setup>
import { nextTick, onActivated, onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import l2d from '../components/l2d.vue'
import useAxios from '../composables/useAxios';
import titleHead from '../components/titleHead.vue';
import loading from '../components/loading.vue';
import login from '../components/login.vue';
import { useStore } from 'vuex';
import router from '../router';


const left = ref(null);
const scrollTop = ref(0);
const currentId = ref(0);
const isLoading = ref(false);
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
  isLoading.value = true;
  const id = routes.params.id;
  currentId.value = id;
  const result = await axios.post('get/blogById', {
    id: id,
  })
  content.value = result.data.html;
  isLoading.value = false;
  initCanvas();
  window.addEventListener('resize', () => {
    initCanvas();
  });
  await nextTick();
  const doms = main.value.children;
  createTree(doms)
})

function createTree(doms) {
  menu.value = [];
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

onBeforeRouteLeave(() => {
  currentId.value = routes.params.id;
  scrollTop.value = left.value.scrollTop;
})

onActivated(async () => {
  if (routes.params.id === currentId.value) {
    left.value.scrollTop = scrollTop.value;
  } else {
    const id = routes.params.id;
    currentId.value = id;
    const result = await axios.post('get/blogById', {
      id: id,
    })
    content.value = result.data.html;
    isLoading.value = false;
    await nextTick();
    const doms = main.value.children;
    createTree(doms);
  }

})

watch(() => store.state.darkMode, () => {
  initCanvas()
})


function initCanvas() {
  mainCanvas.value.width = container.value.offsetWidth;
  mainCanvas.value.height = container.value.offsetHeight;
  bubbly({
    colorStart: `${store.state.darkMode ? '#000000' : '#ffffff'}`,
    colorStop: `${store.state.darkMode ? '#000000' : '#ffffff'}`,
    blur: 1,
    compose: "source-over",
    bubbles: 30,
    bubbleFunc: () => `hsla(${Math.random() * 50 + (store.state.darkMode ? 190 : 0)}, 100%, 50%, .3)`,
    canvas: mainCanvas.value, // default is created and attached// default is 4 + Math.random() * width / 25
  });
}



onBeforeRouteLeave((to, from, next) => {
  if (to.path === '/back') {
    if (store.state.isLogin) {
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
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes wordin {
  form {
    scale: 0.1;
    opacity: 0;
  }

  to {
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
  color: v-bind(store.state.darkMode ? 'white' : 'black');
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
  padding: 70px;
  gap: 20px;
  scale: 1;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}

.canvas {
  position: fixed;
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
  max-height: calc(100vh - 100px);
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


.left::-webkit-scrollbar {
  display: none;
}

.left:hover {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
}


.main:deep(pre) {
  padding: 10px;
  border-radius: 10px;
  background-color: v-bind(store.state.darkMode ? '#242424' : '#f6f8fa');
  line-height: normal;
  overflow-x: scroll;
  margin-top: 20px;
  margin-bottom: 20px;
}


.main:deep(.hljs-keyword),
.main:deep(.hljs-built_in),
.main:deep(.hljs-name),
.main:deep(.hljs-selector-tag),
.main:deep(.hljs-tag) {
  color: v-bind(store.state.darkMode ? '#89ddff' : '#00f');
}

.main:deep(.hljs-addition),
.main:deep(.hljs-attribute),
.main:deep(.hljs-literal),
.main:deep(.hljs-section),
.main:deep(.hljs-string),
.main:deep(.hljs-template-tag),
.main:deep(.hljs-template-variable),
.main:deep(.hljs-title),
.main:deep(.hljs-type) {
  color: v-bind(store.state.darkMode ? '#f07178' : '#a31515');
}

.main:deep(.hljs-attr) {
  color: v-bind(store.state.darkMode ? '#f07178' : '#a31515');
}

.main:deep(.hljs-comment),
.main:deep(.hljs-quote),
.main:deep(.hljs-variable) {
  color: v-bind(store.state.darkMode ? '#c3e88d' : 'green');
}



.main:deep(pre)::-webkit-scrollbar {
  display: none;
}

.main:deep(code) {
  padding: 2px;
  background-color: v-bind(store.state.darkMode ? '#242424' : '#f6f8fa');
  color: palevioletred;
  font-family: 'Consolas';
}

.main:deep(pre) code {
  background: transparent;
  color: v-bind(store.state.darkMode ? '#676e95' : 'black');
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

.main:deep(img) {
  display: block;
  width: 100%;
  margin: 20px auto;
  border-radius: 25px;
  transition: all 0.3s;
}

.main:deep(img):hover {
  border-radius: 0px;
}

@media screen and (max-width:800px) {

  .right {
    display: none;
  }

  .container {
    grid-template-columns: 1fr;
    padding: 70px 20px 70px 20px;
  }

  .l2d {
    display: none;
  }
}
</style>