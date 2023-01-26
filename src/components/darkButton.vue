<template>
  <div class="ball_container" @click="move">
    <div :class="ball"><img src="../assets/dark.svg" alt="夜间模式"></div>
    <div :class="color_box"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const forword = ref(store.state.darkMode);
const ball = ref('ball');
const color_box = ref('color_box');

onMounted(() => {
  forword.value = store.state.darkMode;
  ball.value = `ball ${forword.value?'ball_forword':'ball_back'}`;
  color_box.value = `color_box ${forword.value? 'color_forword' : 'color_back'}`;
})

function move() {
  if (forword.value) {
    ball.value = 'ball ball_back';
    color_box.value = 'color_box color_back';
    forword.value = false;
  } else {
    ball.value = 'ball ball_forword';
    color_box.value = 'color_box color_forword';
    forword.value = true;
  }
  store.commit('changeColorStyle')
}
</script>

<style scoped>

.ball_container {
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: antiquewhite;
  box-sizing: border-box;
  position: relative;
  
}

.ball {
  height: 20px;
  width: 20px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
  position: relative;
}

.ball_forword {
  left: 20px;
}

.ball_back {
  left: 0px;
}

.color_forword {
  width: 40px;
}

.color_back {
  width: 20px;
}

.color_box {
  height: 20px;
  border-radius: 10px;
  background-color: aquamarine;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

img {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 1px;
  left: 2px;
}
</style>