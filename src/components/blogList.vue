<template>
  <div class="blog_list_container">
    <titleHead>博客列表</titleHead>
    <singleBlog></singleBlog>
    <singleBlog></singleBlog>
    <singleBlog></singleBlog>
    <singleBlog></singleBlog>
    <div class="bottom">
      <p class="button">上一页</p>
      <p class="button">下一页</p>
    </div>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
import singleBlog from './singleBlog.vue';
</script>

<style scoped>
.blog_list_container {
  border-radius: 15px;
  height: fit-content;
  z-index: -1;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.blog_list_container:hover {
  scale: 1.02;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}

.bottom {
  border-top: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 100px;
}

.button {
  padding: 5px 10px;
  border-radius: 20px;
  border:rgba(130, 170, 255)  1px solid;
  font-size: 14px;
  transition: all 0.3s;
}

.button:hover {
  background-color: rgba(130, 170, 255);
  color: white;
}
</style>