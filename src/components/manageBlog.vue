<template>
  <div class="manage_blog_container" @scroll="fresh" >
    <titleHead>管理博客</titleHead>
    <manageSingleBlog v-for="blog in blogList" :key="blog.id" :blog-info="blog" ></manageSingleBlog>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
import manageSingleBlog from './manageSingleBlog.vue';
import useAxios from '../composables/useAxios';
import useBottomFresh from '../composables/useBottomFresh';
import { onMounted,ref } from 'vue';
const bottomFresh = useBottomFresh();
const axios = useAxios();
const blogList = ref([]);
const limit = 30;
const offset = ref(0);
const isBottom = ref(false);
const isLoading = ref(false);

onMounted(async () => {
  const result = await axios.post("/get/blog",{
    limit: limit,
    offset: offset.value,
  })
  blogList.value = result.data.blogs;
  offset.value += result.data.blogs.length;
})

async function fresh(e) {
  if(isBottom.value) {
    return ;
  }
  isBottom.value = await bottomFresh("/get/blog",limit,offset,isLoading,e,blogList);
}


</script>

<style scoped>
.manage_blog_container {
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

.manage_blog_container::-webkit-scrollbar {
  display: none;
}

.manage_blog_container:hover {
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
}
</style>