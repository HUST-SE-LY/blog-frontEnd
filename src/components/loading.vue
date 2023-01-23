<template>
  <div class="loading_container">
    <img src="../assets/loading.svg" alt="">
  </div>
</template>

<script setup>

</script>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
  
}
.loading_container {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  position: absolute;
  z-index: 1000000000;
  top: 30%;
  left: calc(50% - 25px);
  animation: rotate 1s infinite;
}

img {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>