<template>
  <div>
    <canvas class="live2d" id="live2d" width="300" height="600"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  loadlive2d("live2d", "../../src/plugin/live2d/model/xiaomai/xiaomai.model.json");
})

</script>



<style scoped>
.live2d {
  width: 100px;
  height: auto;
  position: fixed;
  right: 0;
  bottom: 0;
  cursor: pointer;
}
</style>