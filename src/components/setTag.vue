<template>
  <div :class="`set_tag_container ${store.state.darkMode?'dark_background':''}`">
    <titleHead>编辑常用标签</titleHead>
    <div class="tag_box">
      <singleTag v-for="tag in tagList" :key="tag.id" @click="deleteTag(tag.id)">{{tag.name}}</singleTag>
    </div>
    <div class="input_box">
      <p :class="isFocus?'p_focus':(tagName?'':'p_origin')">标签名</p>
      <input type="text" @keyup.enter="addTag" v-model="tagName" :class="isFocus?'input_focus':''" @focusin="isFocus = true" @focusout="isFocus = false">
      <span class="add_button" @click="addTag">添加</span>
    </div>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
import useAxios from '../composables/useAxios';
import singleTag from './singleTag.vue';
import { onMounted,ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const axios = useAxios();
const tagList = ref([]);
const isFocus = ref(false);
const tagName = ref("");

async function addTag() {
  if(!tagName.value) return;
  const result =await axios.post("/set/tag",{
    name:tagName.value,
  })
  tagName.value = "";
  await freshTag();
}

async function freshTag() {
  const result = await axios.post('/get/tag');
  console.log(result.data.tags)
  tagList.value = result.data.tags;
}

async function deleteTag(id) {
  const result = await axios.post("/delete/tag",{
    id: id,
  })
  freshTag();
}

onMounted(async () => {
  const result = await axios.post('/get/tag');
  tagList.value = result.data.tags;
})

</script>

<style scoped>
.set_tag_container {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.set_tag_container:hover {
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
}

.tag_box {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.add_button {
  width: fit-content;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 20px;
  border: rgba(130, 170, 255) 1px solid;
  margin-left: 10px;
  transition: all 0.3s;
  cursor: pointer;
}

.add_button:hover {
  background-color: rgba(130, 170, 255);
  color: white;
  border-color: white;
}


.input_box {
  margin: 10px 0;
  position: relative;
}

input {
  width: 60%;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  height: 24px;
  transition: all 0.3s;
  font-size: 14px;
  background-color: transparent;
  color: v-bind(store.state.darkMode?'white':'black');
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