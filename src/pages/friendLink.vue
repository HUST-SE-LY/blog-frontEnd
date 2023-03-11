<template>
  <div class="container">
    <div class="pic">
      <typing class="title" word="友链（我的朋友们）"></typing>
    </div>
    <div class="link_box">
      <singleFriendLink v-for="link in linkList" :link="link"></singleFriendLink>
    </div>
    <div class="divider"></div>
    <addFriendLink></addFriendLink>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import typing from '../components/typing.vue';
import singleFriendLink from '../components/singleFriendLink.vue'
import addFriendLink from '../components/addFriendLink.vue';
import useAxios from '../composables/useAxios';
import { onActivated, onMounted,ref } from 'vue';

const store = useStore();
const axios = useAxios();
const linkList = ref([])

onMounted(async () => {
  const result = await axios.post('/link/getLink');
  linkList.value = result.data.list;
})

onActivated(async () => {
  linkList.value = [];
  const result = await axios.post('/link/getLink');
  linkList.value = result.data.list;
})

</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background: v-bind(store.state.darkMode?'#000000':'#f6f6f6');
  padding-bottom: 50px;
}

.pic {
  background-image: url('../assets/friendBack.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 60vh;
  position: relative;
}

.pic::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  content: "";
}

.title {
  position: absolute;
  top: 300px;
  font-size: 56px;
  font-weight: 400;
  color: rgba(255,255,255,0.9);
  z-index: 1000000;
}

.link_box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 20px;
  gap: 30px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.divider {
  width: 70vw;
  background-color: gray;
  margin: 30px auto;
  height: 1px;
}

@media screen and (max-width:1200px) {
  .link_box {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (max-width:900px) {
  .link_box {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width:600px) {
  .link_box {
    grid-template-columns: 1fr;
  }

  
}







</style>