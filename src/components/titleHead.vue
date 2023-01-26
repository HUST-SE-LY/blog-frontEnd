<template>
  <div class="title_container">
    <div class="divider"></div>
    <p :class="`title ${store.state.darkMode?'dark':''}`"><slot></slot></p>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';



const store = useStore();
</script>

<style scoped>
.divider {
  width: 3px;
  height: 30px;
  background: rgba(130, 170, 255);
  transition: all 0.3s;
}

.title {
  position: relative;
}

.title::before {
  position: absolute;
  content: "";
  background-color: rgba(130, 170, 255);
  height: 1.5px;
  width: 0;
  transition: all 0.3s 0.3s;
  left: 0;
  bottom: -2px;
}

.title_container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.title_container:hover>.divider {
  width: 5px;
}

.title_container:hover>.title::before {
  width: 100%;
}
</style>