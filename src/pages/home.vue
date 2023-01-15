<template>
  <div>
    <headTag></headTag>
    <div class="background">
      <img src="../assets/homeBack.jpg" alt="background" class="back_pic">
      <div class="wrap"></div>
      <div class="title">Coisíní's Blog</div>
      <typing word="縱有疾風起，人生不言棄" class="sub_title"></typing>
    </div>
    <div class="main"></div>
  </div>
</template>

<script setup>
import headTag from '../components/headTag.vue';
import typing from '../components/typing.vue';
</script>

<style scoped>
.background {
  width: 100%;
  height: fit-content;
  position: relative;
}

.back_pic {
  width: 100%;
}

.main {
  height: 1000px;
  display: absolute;
  top: 0;
  left: 0;
}

.wrap {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.title {
  width: 100%;
  text-align: center;
  background: linear-gradient(to right, purple 50%, white,white);
  background-size: 300%;
  background-position: 90%;
  -webkit-background-clip: text;
  color: transparent;
  position: absolute;
  top: 30%;
  font-size: 56px;
  font-weight: 600;
  transition: all 0.3s;
  letter-spacing: 2px;
}

.title:hover {
  background-position: 75%;
}

.sub_title {
  position: absolute;
  top: 50%;
  font-size: 24px;
}
</style>