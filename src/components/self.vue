<template>
  <div class="self_container">
    <titleHead>关于我</titleHead>
    <div class="avatar_box">
      <img src="../assets/avatar.png" alt="avatar">
      <div class="avatar_aside">
        <p class="name">灼梦</p>
        <p class="intro">前端萌新</p>
      </div>
      <a href="https://space.bilibili.com/291038650" target="_blank" class="logo"><img src="../assets/bilibili-line.svg"
          alt="bilibili" class="svg"></a>
      <a href="https://github.com/HUST-SE-LY" target="_blank" class="logo"> <img src="../assets/github.svg" alt="github"
          class="svg"></a>
    </div>
    <p class="des">一个喜欢把思絮撒向远方的人...</p>
  </div>
</template>

<script setup>
import titleHead from './titleHead.vue';
</script>

<style scoped>
.self_container {
  border-radius: 15px;
  height: fit-content;
  z-index: -1;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  margin-bottom: 20px;
}

.self_container:hover {
  scale: 1.02;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.avatar_box {
  display: flex;
  align-items: center;
  gap: 10px;
}

img {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}

.intro {
  font-size: 12px;
  color: gray;
}

.svg {
  width: 30px;
  margin-left: 10px;
}

.des {
  font-size: 14px;
  color: gray;
  margin-top: 20px;
}
</style>