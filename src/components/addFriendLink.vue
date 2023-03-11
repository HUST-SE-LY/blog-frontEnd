<template>
  <div :class="`single_friend_container ${store.state.darkMode?'dark_background':''}`">
    <input type="text" max="20" placeholder="网站名称" v-model="name">
    <input type="text" max="50" placeholder="url" v-model="url">
    <input type="text" max="50" placeholder="简介" v-model="content">
    <div class="button" @click="addFriendLink">申请友链</div>
    <toast v-if="showToast">{{info}}</toast>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import useAxios from '../composables/useAxios'
import toast from './toast.vue'
const store = useStore();
const axios = useAxios();
const name = ref('');
const url = ref('');
const content = ref('');
const info = ref('申请成功');
const showToast = ref(false)


async function addFriendLink() {
  if(name.value&&url.value&&content.value) {
    const result = await axios.post('/link/request',{
      name: name.value,
      url: url.value,
      content: content.value,
    })
    info.value = "申请成功，审核后可见！"
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    },3000)
  } else {
    info.value = '请填写完整信息';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    },3000)
  }
}

</script>

<style scoped>
.single_friend_container {
  border-radius: 15px;
  height: fit-content;
  padding: 20px 20px 20px 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
  box-sizing: border-box;
  width: 500px;
  margin: 30px auto;
}

input {
  display: block;
  border: none;
  border-bottom: 1px solid gray;
  background: transparent;
  outline: none;
  margin: 30px auto;
  width: 70%;
  color: v-bind(store.state.darkMode?'#ffffff':'#000000')
}

.button {
  padding: 5px 30px;
  border-radius: 100px;
  background-color: rgba(130, 170, 255,0.5);
  width: fit-content;
  margin: 0 auto;
  color: white;
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .single_friend_container {
    width: 400px;
  }
}
</style>