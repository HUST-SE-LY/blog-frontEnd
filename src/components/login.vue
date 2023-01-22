<template>
  <div class="login_container">
    <titleHead>登陆</titleHead>
    <div class="input_box">
      <p :class="isFocus?'p_focus':(tagName?'':'p_origin')">密码</p>
      <input type="password" v-model="password" :class="isFocus?'input_focus':''" @focusin="isFocus = true" @focusout="isFocus = false">
      <div class="button" @click="login">登陆</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import titleHead from './titleHead.vue';

const isFocus = ref(false);
const password = ref("");

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


</style>