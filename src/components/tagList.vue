<template>
  <div class="tag_list_container">
    <titleHead>常用tag</titleHead>
    <div class="tag_box">
      <singleTag>123</singleTag>
      <singleTag>12345</singleTag>
      <singleTag>12311</singleTag>
      <singleTag>1232</singleTag>
      <singleTag>123223</singleTag>
    </div>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
import singleTag from './singleTag.vue';
</script>

<style scoped>
.tag_list_container {
  border-radius: 15px;
  height: fit-content;
  z-index: -1;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.tag_list_container:hover {
  scale: 1.05;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}

.tag_box {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>