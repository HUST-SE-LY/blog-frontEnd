<template>
  <div :class="`manage_friend_container ${store.state.darkMode?'dark_background':''}`">
    <titleHead>友链申请</titleHead>
    <manageSingleFriend v-for="link in linkList" :key="link.id" :link="link" @pass="updateList"></manageSingleFriend>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {useStore} from 'vuex';
import useAxios from '../composables/useAxios';
import manageSingleFriend from './manageSingleFriend.vue';
import titleHead from './titleHead.vue';
const store = useStore();
const axios = useAxios();
const linkList = ref([])
onMounted(async () => {
  const result = await axios.post('/link/getRequest');
  linkList.value = result.data.list;
})

async function updateList() {
  linkList.value = [];
  const result = await axios.post('/link/getRequest');
  linkList.value = result.data.list;

}
</script>

<style scoped>
.manage_friend_container {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
  max-height: 500px;
  overflow: scroll;
}

.manage_friend_container::-webkit-scrollbar {
  display: none;
}
</style>