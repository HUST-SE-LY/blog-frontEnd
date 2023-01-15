<template>
  <div class="head_container">
    <p>首页</p>
    <p>后台</p>
    <div class="right">
      <searchBar></searchBar>
      <div class="avatar"></div>
    </div>   
  </div>
</template>

<script setup>
import searchBar from './searchBar.vue';
</script>

<style scoped>
.head_container {
  width: 100%;
  height: 70px;
  background-color: rgba(186,194,212);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  transition: all 0.3s;
  display: flex;
  line-height: 70px;
  gap: 100px;
  box-sizing: border-box;
  padding: 0 200px 0 100px;
}

.right{
  margin-left: auto;
}

</style>