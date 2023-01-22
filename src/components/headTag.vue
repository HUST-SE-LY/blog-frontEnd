<template>
  <div class="head_container">
    <router-link to="/home" class="link">首页</router-link>
    <router-link to="/back" class="link">后台</router-link>
    <div class="right">
      <searchBar></searchBar>
      <div class="avatar"></div>
    </div>   
  </div>
</template>

<script setup>
import searchBar from './searchBar.vue';
import {useRoute} from 'vue-router';
import { ref, watch } from 'vue';

const color = ref("transparent");
const routes = useRoute();
watch(() => routes.path,(newVal) => {
  if(newVal === '/home') {
    color.value = 'transparent';
  } else {
    color.value = "rgba(130, 170, 255,0.75)";
  }
})
</script>

<style scoped>
@keyframes movein {
  from {
    opacity: 0;
    top: -50px;
  } to {
    opacity: 1;
    top: 0;
  }  
}
.head_container {
  width: 100%;
  height: 50px;
  position: fixed;
  color: white;
  left: 0;
  top: 0;
  z-index: 99999;
  transition: all 0.3s;
  display: flex;
  line-height: 50px;
  gap: 100px;
  box-sizing: border-box;
  padding: 0 200px 0 100px;
  animation: movein 0.75s ease-out forwards;
  background-color: v-bind(color);

}

.router-link-active {
  position: relative;
}

.router-link-active::before {
  position: absolute;
  height: 30px;
  width: 3px;
  background-color: rgba(130, 170, 255);
  left: -10px;
  top: calc(50% - 15px);
  content:"";

}
.right{
  margin-left: auto;
}

.link {
  color: white;
  text-decoration: none;

}

</style>