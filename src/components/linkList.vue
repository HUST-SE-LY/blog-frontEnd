<template>
  <div class="link_list_container">
    <titleHead>常用网址</titleHead>
    <div class="link_box">
      <a v-for="link in linkList" :href="link.url" target="_blank">{{link.name}}</a>
    </div>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
import useAxios from '../composables/useAxios';
import { onMounted, ref } from 'vue';

const axios = useAxios();
const linkList = ref([])

onMounted(async () => {
  const result = await axios.post("/get/link");
  linkList.value = result.data.links;
})
</script>

<style scoped>
.link_list_container {
  border-radius: 15px;
  height: fit-content;
  z-index: -1;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  margin-bottom: 20px;
  max-height: 200px;
  overflow-y: scroll;
}

.link_list_container::-webkit-scrollbar {
  display: none;
}

.link_list_container:hover {
  scale: 1.02;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.link_box {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

a {
  text-decoration: none;
  color: black;
  padding: 5px 20px;
  transition: all 0.3s;
  border-radius: 20px;
  display: block;
  font-size: 14px;
}

a:hover {
  background-color: rgba(130, 170, 255,.75);
  color:white;
}
</style>