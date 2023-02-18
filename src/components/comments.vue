<template>
  <div :class="`comments_container ${store.state.darkMode ? 'dark_background' : ''}`">
    <titleHead>评论</titleHead>
    <p v-if="!list.length">还没有评论呢...</p>
    <singleComment v-for="comment in list" :comment-info="comment"></singleComment>
    <commentInput></commentInput>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
import singleComment from './singleComment.vue';
import commentInput from './commentInput.vue';
import { useStore } from 'vuex';
import useAxios from '../composables/useAxios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const axios = useAxios();
const store = useStore();
const list = ref([]);
const limit = 10;
const offset = ref(0);

onMounted(async () => {
  const result = await axios.post('/get/comment', {
    limit: limit,
    offset: offset.value,
    blog: route.params.id,
  })
  list.value = result.data.list;
  console.log(result.data.list)
})

</script>

<style scoped>
.comments_container {
  border-radius: 15px;
  height: fit-content;
  max-width: 100%;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
  position: relative;
  animation: movein 1s forwards ease-out;
}
</style>