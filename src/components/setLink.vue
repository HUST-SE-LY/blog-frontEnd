<template>
  <div class="set_link_container">
    <titleHead>编辑常用网址</titleHead>
    <div class="link_box">
      <a v-for="link in linkList" :href="link.url">{{link.name}}</a>
    </div>
    <div class="input_box">
      <p :class="isNameFocus?'p_focus':(linkName?'':'p_origin')">网址名</p>
      <input type="text" v-model="linkName" :class="isNameFocus?'input_focus':''" @focusin="isNameFocus = true" @focusout="isNameFocus = false">
    </div>
    <div class="input_box">
      <p :class="isUrlFocus?'p_focus':(url?'':'p_origin')">url</p>
      <input type="text" v-model="url" :class="isUrlFocus?'input_focus':''" @focusin="isUrlFocus = true" @focusout="isUrlFocus = false">
    </div>
    <div class="button" @click="addLink">添加</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import titleHead from './titleHead.vue';
import useAxios from '../composables/useAxios';

const axios = useAxios();
const isNameFocus = ref(false);
const isUrlFocus = ref(false);
const linkList = ref([]);

const linkName = ref("");
const url = ref("");

onMounted(async () => {
  const result = await axios.post('/get/link');
  linkList.value = result.data.links;
})

async function freshLink() {
  const result = await axios.post('/get/link');
  linkList.value = result.data.links;
}

async function addLink() {
  if((!linkName.value)||(!url.value)) return;
  await axios.post('/set/link',{
    name:linkName.value,
    url:url.value,
  })
  linkName.value = "";
  url.value = "";
  freshLink();
}


</script>

<style scoped>
.set_link_container {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.set_link_container:hover {
  scale: 1.02;
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
}

.input_box {
  margin: 10px 0;
  position: relative;
}

input {
  width: 80%;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  height: 24px;
  transition: all 0.3s;
  font-size: 14px;
}

.link_box {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

a {
  text-decoration: none;
  color: black;
  padding: 5px 20px;
  transition: all 0.3s;
  border-radius: 20px;
  display: block;
  font-size: 14px;
}

a:hover {
  background-color: rgba(130, 170, 255,.75);
  color:white;
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

.button {
  padding: 5px 10px;
  border-radius: 20px;
  border:rgba(130, 170, 255)  1px solid;
  font-size: 14px;
  transition: all 0.3s;
  width: fit-content;
  cursor: pointer;
}

.button:hover {
  background-color: rgba(130, 170, 255);
  color: white;
}
</style>