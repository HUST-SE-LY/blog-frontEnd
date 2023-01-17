<template>
  <div class="home_container" @scroll="handleScroll">
    <headTag></headTag>
    <div class="background">
      <img src="../assets/homeBack.jpg" alt="background" class="back_pic">
      <div class="wrap"></div>
      <div class="title">Coisíní's Blog</div>
      <typing word="縱有疾風起，人生不言棄" class="sub_title"></typing>
    </div>
    <div class="home_main" id="main" ref="main">
      <canvas id="main_canvas" ref="mainCanvas"></canvas>
      <tagList></tagList>
      <blogList></blogList>
      <div class="right_container">
        <self></self>
        <linkList></linkList>
        <music></music>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import headTag from '../components/headTag.vue';
import typing from '../components/typing.vue';
import tagList from '../components/tagList.vue';
import blogList from '../components/blogList.vue';
import self from '../components/self.vue';
import linkList from '../components/linkList.vue';
import music from '../components/music.vue';

const mainCanvas = ref(null);
const main = ref(null)
const width = ref("");
const height = ref("")
const movingY = ref('0px')

function initCanvas() {
  mainCanvas.value.width = main.value.offsetWidth;
  mainCanvas.value.height = main.value.offsetHeight;
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





function handleScroll(e) {
  if (e.srcElement.scrollTop + e.srcElement.offsetHeight >= e.srcElement.scrollHeight - 5) {
    return
  }
  movingY.value = -e.srcElement.scrollTop + 'px';
}
</script>

<style scoped>
@keyframes movein {
  0% {
    opacity: 0;
    top: 55%;
  }

  100% {
    opacity: 1;
    top: 47%;
  }

}

.home_container {
  height: 100vh;
  overflow-y: scroll;
  position: relative;
  background-color: black;
}

#main_canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1000;

}

.background {
  width: 100%;
  height: fit-content;
  position: relative;
}

.back_pic {
  width: 100%;
}

.home_main {
  height: 90vh;
  position: relative;
  width: 100%;
  margin-top: v-bind(movingY);
  background: white;
  z-index: 1000;
  box-sizing: border-box;
  min-height: 800px;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  padding: 50px;
  gap: 50px;

}


.wrap {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.title {
  width: 100%;
  text-align: center;
  background: linear-gradient(to right, purple 50%, white, white);
  background-size: 300%;
  background-position: 90%;
  -webkit-background-clip: text;
  color: transparent;
  position: absolute;
  top: 47%;
  font-size: 56px;
  font-weight: 600;
  transition: all 0.3s;
  letter-spacing: 2px;
  animation: movein 0.75s ease-out forwards;
}

.title:hover {
  background-position: 75%;
}

.sub_title {
  position: absolute;
  top: 35%;
  font-size: 24px;
}
</style>