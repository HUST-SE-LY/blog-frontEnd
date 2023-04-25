<template>
  <div :class="`login_container ${store.state.darkMode ? 'dark_background' : ''}`">
    <p class="close" @click="store.commit('closeLogin')">关闭</p>
    <titleHead>登录</titleHead>
    <div class="input_box">
      <p :class="isFocus?'p_focus':(password?'':'p_origin')">{{titleWord}}</p>
      <input type="password" v-model="password" :class="isFocus?'input_focus':''" @focusin="isFocus = true" @focusout="isFocus = false">
      <div class="button" @click="login">登录</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import titleHead from './titleHead.vue';
import useAxios from '../composables/useAxios';
const axios = useAxios();
const store = useStore();
const isFocus = ref(false);
const password = ref("");
const titleWord = ref("密码")
async function login() {
  const result = await axios.post('/login',{
    password: password.value,
  })
  if(result.data.success) {
    const token = result.data.token;
    localStorage.setItem('token',token);
    store.commit('login');
    store.commit('closeLogin');
  } else {
    password.value = '';
    titleWord.value = '密码错误，请重新输入'
  }
}
</script>

<style scoped>
.login_container {
  border-radius: 15px;
  height: fit-content;
  width: 300px;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
  position: fixed;
  top: 40%;
  left: calc(50% - 150px);
  z-index: 10000000000000;
}

.login_container:hover {
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
}

.input_box {
  margin: 10px 0;
  position: relative;
}



input {
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  height: 24px;
  transition: all 0.3s;
  font-size: 14px;
  background-color: transparent;
  color: v-bind(store.state.darkMode?'#ffffff':'#000000');
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
  margin: 20px auto;
  border-radius: 15px;
  font-size: 14px;
  border: 1px solid rgba(130, 170, 255);
  width: fit-content;
  padding: 5px 20px;
  cursor: pointer;
}

.close {
  font-size: 12px;
  text-align: right;
  transition: all 0.3s;
  pointer-events: fill;
  cursor: pointer;
}

.close:hover {
  color: rgba(130, 170, 255);
}


</style>