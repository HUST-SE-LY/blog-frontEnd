<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style scoped>
@keyframes movein {
  from {
    opacity: 0;
    transform: translateY(10px);
  } to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes out {
  from {
    opacity: 1;
  } to {
    opacity: 0;
  }
}

.container {
  background-color: white;
  width: 200px;
  padding: 10px 30px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  position: fixed;
  bottom: 20px;
  left: calc(50% - 100px);
  font-size: 12px;
  text-align: center;
  animation: movein 0.5s forwards 0s linear, out 0.5s forwards 3s linear;
  z-index: 100000;
}
</style>