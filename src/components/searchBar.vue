<template>
  <div>
    <input type="text" class="search_bar" placeholder="搜索">
  </div>
</template>

<script setup>

</script>

<style scoped>
.search_bar {
  width: 200px;
  height: 30px;
  outline: none;
  border-radius: 20px;
  border: 1px solid white;
  background-color: rgba(255,255,255,0.5);
  color: white;
  padding-left: 15px;
  box-sizing: border-box;
}

.search_bar::placeholder {
  color: white;
}
</style>