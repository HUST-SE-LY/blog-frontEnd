<template>
  <Transition name="login">
      <login v-if="isShowLogin"></login>
  </Transition>
  <div class="home_container">
    <div class="background">
      <typing word="Coisíní's Blog" class="head_title"></typing>
      <Transition name="fade" mode="out-in" >
        <img src="../assets/homeBack.jpg" alt="background" class="back_pic" v-if="!store.state.darkMode">
        <img src="../assets/homeBackDark.jpg" alt="background" class="back_pic" v-else>
      </Transition>
      <div class="wrap"></div>
      <div class="title">Coisíní's Blog</div>
      <typing :word="store.state.darkMode?'饮月为酒，点星为灯':'縱有疾風起，人生不言棄'" class="sub_title"></typing>
    </div>
    <Transition name="fade" mode="out-in" >
      <img src="../assets/homeBack.jpg" alt="background" class="back_pic pic" v-if="!store.state.darkMode">
      <img src="../assets/homeBackDark.jpg" alt="background" class="back_pic pic" v-else>
    </Transition>
    <div class="home_main" id="main" ref="main">
      <div class="left">
        <tagList></tagList>
        <searchBar></searchBar>
      </div>
      <blogList class="blog_list"></blogList>
      <div class="right_container">
        <div class="left_1200px">
          <tagList></tagList>
          <searchBar></searchBar>
        </div>
        <self></self>
        <linkList></linkList>
        <music></music>
      </div>
      <div class="bottom">
        <a href="https://beian.miit.gov.cn/" target="_blank">皖ICP备2023002076</a>
      </div>
    </div>
    
  </div>
  <div class="aside">
    <div class="aside_single" :class="tagShow?'show':''">
      <div :class="`aside_pull ${store.state.darkMode?'dark_background':''}`" @click="tagShow=tagShow?false:true">tag</div>
      <tagList class="aside_main"></tagList>
    </div>
    <div class="aside_single" :class="searchShow?'show':''">
      <div :class="`aside_pull ${store.state.darkMode?'dark_background':''}`" @click="searchShow=searchShow?false:true">搜索</div>
      <searchBar class="aside_main"></searchBar>
    </div>
    <div class="aside_single" :class="selfShow?'show':''">
      <div :class="`aside_pull ${store.state.darkMode?'dark_background':''}`" @click="selfShow=selfShow?false:true">个人</div>
      <self class="aside_main"></self>
    </div>
    <div class="aside_single" :class="linkShow?'show':''">
      <div :class="`aside_pull ${store.state.darkMode?'dark_background':''}`" @click="linkShow=linkShow?false:true">网站</div>
      <linkList class="aside_main"></linkList>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onActivated, onMounted, ref, watch } from 'vue';
import typing from '../components/typing.vue';
import tagList from '../components/tagList.vue';
import blogList from '../components/blogList.vue';
import self from '../components/self.vue';
import linkList from '../components/linkList.vue';
import searchBar from '../components/searchBar.vue';
import music from '../components/music.vue';
import login from '../components/login.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import { onBeforeRouteLeave } from 'vue-router';

const store = useStore();
const main = ref(null)
const width = ref("");
const height = ref("");
const tagShow = ref(false);
const selfShow = ref(false);
const linkShow = ref(false);
const searchShow = ref(false);



onBeforeRouteLeave((to, from, next) => {
  if (to.path === '/back') {
    if (store.state.isLogin) {
      next()
    } else {
      store.commit('showLogin')
    }
  } else {
    next();
  }
})


const isShowLogin = computed(() => store.state.showLoginBox);


</script>

<style scoped>

.fade-enter-from,
.fade-leave-to {
  opacity: 0.5;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.bottom {
  width: 200px;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: calc(50% - 100px);

}

.bottom a {
  text-decoration: none;
  color: v-bind(store.state.darkMode?'#ffffff':'#000000');
}


.bottom a:hover {
  color: rgba(130, 170, 255,.75);
}


@keyframes movein {
  0% {
    opacity: 0;
    top: 55%;
  }

  100% {
    opacity: 1;
    top: 47%;
  }

}

.login-enter-from,
.login-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.login-enter-to,
.login-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.login-enter-active,
.login-leave-active {
  transition: all 0.3s;
}

.home_container {
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: transparent;
}


.home_container::-webkit-scrollbar {
  width: 10px;
  background: lightgray;
}

.home_container::-webkit-scrollbar-thumb {
  background: rgba(130, 170, 255);
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1000;

}

.background {
  background-color: v-bind(store.state.darkMode?'#000000':'#f6f6f6');;
  width: 100%;
  height: fit-content;
  position: fixed;
  top: 0;
  z-index: -1;
}

.back_pic {
  width: 100%;
  pointer-events: none;
}

.pic {
  opacity: 0;
  pointer-events: none;
}

.home_main {
  height: 92vh;
  position: relative;
  background: v-bind(store.state.darkMode?'#000000':'#f6f6f6');
  z-index: 1000;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 50px 50px 10px 50px;
  gap: 50px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.home_main::-webkit-scrollbar {
  display: none;
}

.wrap {
  pointer-events: none;
  background: rgba(0,0,0,0.2);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.title {
  width: 100%;
  text-align: center;
  background: linear-gradient(to right, rgb(95, 142, 244) 50%, white, white);
  background-size: 300%;
  background-position: 75%;
  -webkit-background-clip: text;
  color: transparent;
  position: absolute;
  top: 47%;
  font-size: 56px;
  font-weight: 600;
  transition: all 1s;
  letter-spacing: 2px;
  animation: movein 0.75s ease-out forwards;
  z-index: 1000000;
}

.left, .right_container{
  max-height: calc(100%);
  padding: 5px 20px;
  overflow-y: scroll;
  box-sizing: border-box;
}

.left::-webkit-scrollbar, .right_container::-webkit-scrollbar {
  display: none;
}



.aside {
  display: none;
}


.sub_title {
  position: absolute;
  top: 35%;
  font-size: 24px;
}

.head_title {
  position: absolute;
  top: 2%;
  font-size: 24px;
  z-index: 1;
}

.left_1200px {
  display: none;
}

@media screen and (max-width: 1400px) {
  .left {
    display: none;
  }

  .home_main {
    grid-template-columns: 1fr 1fr;
  }

  .left_1200px {
    display: block;
  }

  .right_container {
    overflow-y: scroll;
    padding: 20px;
  }

  .center_container {
    padding-top: 20px;
  }
}

@media screen and (max-width: 1000px) {
  .home_main {
    grid-template-columns: 1fr;
  }

  .left_1200px {
    display: none;
  }

  .right_container {
    display: none;
  }

  .aside {
    display: block;
    position: fixed;
    top: 10%;
    z-index: 100000;
    right: -290px;

  }

  .aside_single {
    display: flex;
    align-items: center;
    transition: all 0.3s;
  }

  .aside_pull {
    width: 50px;
    border-radius: 15px 0 0 15px;
    height: 30px;
    background-color: white;
    line-height: 30px;
    text-align: right;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    padding-right: 5px;
    cursor: pointer;
  }

  .aside_main {
    width: 250px;
  }

  .aside_main:hover {
    scale: 1;
  }

  .show {
    transform: translateX(-290px);
  }
}

@media screen and (max-height:900px) {
  .home_main {
    height: 90vh;
    min-height: none;
  }
}

@media screen and (max-height: 800px){
  .home_main {
    height: 90vh;
  }
  
}

@media screen and (max-width: 800px) {
  .title {
    font-size: 20px;
  }

  .sub_title {
    font-size: 16px;
  }

  .head_title {
    font-size: 16px;
    top: 5%;
  }
}

@media screen and (max-width: 550px) {
  .home_main {
    padding: 20px;
  }
}

</style>