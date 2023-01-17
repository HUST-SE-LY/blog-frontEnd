<template>
  <div class="link_list_container">
    <titleHead>常用网址</titleHead>
    <div class="link_box">
      <a href="https://www.bilibili.com" target="_blank">哔哩哔哩</a>
      <a href="https://www.bilibili.com" target="_blank">github</a>
      <a href="https://www.bilibili.com" target="_blank">dribbble</a>
      <a href="https://www.bilibili.com" target="_blank">google</a>
      <a href="https://www.bilibili.com" target="_blank">vue</a>
      <a href="https://www.bilibili.com" target="_blank">react</a>
      <a href="https://www.bilibili.com" target="_blank">图标库</a>
    </div>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
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