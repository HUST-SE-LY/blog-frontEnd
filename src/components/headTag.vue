<template>
  <div class="head_container">
    <router-link to="/home" class="link">首页</router-link>
    <router-link to="/back" class="link">后台</router-link>
    <div class="right">
      <div class="button" v-if="!isLogin" @click="store.commit('showLogin')">登录</div>
      <div class="avatar" v-else></div>
      <router-link to="/about" class="link">关于</router-link>
    </div>   
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
const store = useStore();
const isLogin = computed(() => {
  return store.state.isLogin
});



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

.avatar {
  width: 30px;
  height: 30px;
  background-image: url(../assets/avatar.png);
  border-radius: 20px;
  background-size: cover;
}

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
  display: flex;
  gap: 20px;
  align-items: center;
}

.link {
  color: white;
  text-decoration: none;

}


.button {
  transition: all 0.3s;
  cursor: pointer;
}

.button:hover {
  color: rgba(130, 170, 255);
}

@media screen and (max-width:700px) {
  .head_container {
    gap: 50px;
    padding: 0 100px 0 100px;
  }
  .link {
    font-size: 14px;
  }

  .button {
    font-size: 14px;
  }


}

@media screen and (max-width: 600px) {
  .head_container {
    gap: 25px;
    padding: 0 50px 0 50px;
  }

  .link {
    font-size: 12px;
  }

  .button {
    font-size: 12px;
  }
}
</style>