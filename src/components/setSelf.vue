<template>
  <div class="set_self_container">
    <titleHead>编辑个人资料</titleHead>
    <div class="input_box">
      <p :class="nameIsFocus?'p_focus':(username?'':'p_origin')">昵称</p>
      <input type="text" v-model="username" :class="nameIsFocus?'input_focus':''" @focusin="nameIsFocus = true" @focusout="nameIsFocus = false">
    </div>
    <div class="input_box">
      <p :class="titleIsFocus?'p_focus':(title?'':'p_origin')">职业</p>
      <input type="text"  v-model="title" :class="titleIsFocus?'input_focus':''" @focusin="titleIsFocus = true" @focusout="titleIsFocus = false">
    </div>
    <div class="input_box">
      <p :class="introIsFocus?'p_focus':(introduction?'':'p_origin')">简介</p>
      <input type="text"  v-model="introduction" :class="introIsFocus?'input_focus':''" @focusin="introIsFocus = true" @focusout="introIsFocus = false">
    </div>
    <div class="button" @click="save">保存</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import titleHead from './titleHead.vue';
import useAxios from '../composables/useAxios';
const axios = useAxios();
const username = ref("");
const title = ref("");
const introduction = ref("");
const nameIsFocus = ref(false);
const titleIsFocus = ref(false);
const introIsFocus = ref(false);

onMounted(async () => {
  const result = await axios.post('/get/userInfo');
  username.value = result.data.user.username;
  title.value = result.data.user.title;
  introduction.value = result.data.user.introduction;
})

async function save() {
  const result = await axios.post('/set/user',{
    username: username.value,
    title: title.value,
    introduction: introduction.value,
  })
  console.log(result);
}
</script>

<style scoped>
.set_self_container {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.set_self_container:hover {
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