<template>
  <div class="manage_blog_container">
    <titleHead>管理博客</titleHead>
    <manageSingleBlog v-for="blog in blogList" :key="blog.id" :blog-info="blog"></manageSingleBlog>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
import manageSingleBlog from './manageSingleBlog.vue';
import useAxios from '../composables/useAxios';
import { onMounted,ref } from 'vue';

const axios = useAxios();
const blogList = ref([]);
const limit = 10;
const offset = ref(0);
onMounted(async () => {
  const result = await axios.post("/get/blog",{
    limit: limit,
    offset: offset.value,
  })
  blogList.value = result.data.blogs;
})
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
}

.manage_blog_container:hover {
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
}
</style>