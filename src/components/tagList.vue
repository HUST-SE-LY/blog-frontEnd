<template>
  <div :class="`tag_list_container ${store.state.darkMode?'dark_background':''}`">
    <titleHead >常用tag</titleHead>
    <div class="tag_box">
      <singleTag v-for="tag in tagList" @click="chooseTag(tag.name)" :key="tag.id" :class="store.state.tag === tag.name?'choose':''">{{ tag.name }}</singleTag>
    </div>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
import singleTag from './singleTag.vue';
import useAxios from '../composables/useAxios';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const axios = useAxios();
const tagList = ref([]);

function chooseTag(name) {
  if (store.state.tag === name) {
    store.commit("deleteTag");
  } else {
    store.commit('cancelSearch');
    store.commit('changeTag', { tag: name })
  }
}

onMounted(async () => {
  const result = await axios.post('/get/tag');
  tagList.value = result.data.tags;
})
</script>

<style scoped>
.tag_list_container {
  border-radius: 15px;
  height: fit-content;
  z-index: -1;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.tag_list_container:hover {
  scale: 1.05;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.tag_box {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.choose {
  background: rgba(130, 170, 255);
  color: white;
}
</style>