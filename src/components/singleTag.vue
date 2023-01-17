<template>
  <div class="tag">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style scoped>

 .tag {
  width: fit-content;
  height: fit-content;
  font-size: 12px;
  padding: 3px 10px;
  border:1.5px solid ;
  border-radius: 20px;
  transition: all 0.3s;
  color: rgba(130, 170, 255,.75);
  cursor: pointer;
 }
 .tag:hover {
  border: 1.5px solid rgba(130, 170, 255,.75);
  background-color: rgba(130, 170, 255,.75);
  color:white;
 }
</style>