<template>
  <div class="blog_list_container">
    <titleHead>博客列表</titleHead>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
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
  scale: 1.05;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}
</style>