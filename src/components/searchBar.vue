<template>
  <div :class="`search_container ${store.state.darkMode?'dark_background':''}`">
    <titleHead>搜索</titleHead>
    <div class="input_box">
      <p :class="isFocus?'p_focus':(title?'':'p_origin')">搜索博客标题</p>
      <input type="text"  v-model="title" :class="isFocus?'input_focus':''" @focusin="isFocus = true" @focusout="isFocus = false" @keyup.enter="search">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import titleHead from './titleHead.vue';

const store = useStore();
const title = ref(store.state.searchWord);
const isFocus = ref(false);

function search() {
  if(title.value) {
    store.commit('deleteTag');
    store.commit('startSearch',{title: title.value});
  } else {
    store.commit('cancelSearch');
  }
}



</script>

<style scoped>

.search_container {
  border-radius: 15px;
  height: fit-content;
  z-index: -1;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  margin-top: 20px;
  margin-bottom: 20px;
}

.search_container:hover {
  scale: 1.05;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

input {
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  background-color: transparent;
  height: 24px;
  transition: all 0.3s;
  font-size: 14px;
}

p {
  font-size: 12px;
  transition: all 0.3s;
  pointer-events: none;
  height: 18px;
  line-height: 20px;
}

.p_origin {
  font-size: 14px;
  transform: translateY(20px);
}

.input_focus {
  border-bottom: 1px solid rgba(130, 170, 255);
}

.p_focus {
  color: rgba(130, 170, 255);
}



</style>