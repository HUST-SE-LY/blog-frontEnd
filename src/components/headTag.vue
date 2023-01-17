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
@keyframes movein {
  from {
    opacity: 0;
    top: -50px;
  } to {
    opacity: 1;
    top: 0;
  }  
}
.head_container {
  width: 100%;
  height: 50px;
  position: fixed;
  color: white;
  left: 0;
  top: 0;
  z-index: 99999;
  transition: all 0.3s;
  display: flex;
  line-height: 50px;
  gap: 100px;
  box-sizing: border-box;
  padding: 0 200px 0 100px;
  animation: movein 0.75s ease-out forwards;
}

.right{
  margin-left: auto;
}

</style>