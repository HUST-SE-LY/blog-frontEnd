<template>
  <div>
    <canvas class="live2d" id="live2d" width="300" height="600"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  loadlive2d("live2d", "../src/assets/plugin/live2d/model/xiaomai/xiaomai.model.json");
})

</script>



<style scoped>
.live2d {
  width: 250px;
  height: auto;
  position: fixed;
  right: 0;
  bottom: 0;
  cursor: pointer;
}

@media screen and (max-width: 1280px){
  .live2d {
    width: 200px;
  }  
}

@media screen and (max-width: 960px){
  .live2d {
    width: 150px;
  }  
}

@media screen and (max-height: 1000px){
  .live2d {
    width: 200px;
  }  
}

@media screen and (max-width: 800px){
  .live2d {
    width: 150px;
  }  
}


</style>