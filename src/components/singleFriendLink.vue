
<template>
  <div :class="`single_friend_container ${store.state.darkMode?'dark_background':''}`">
    <div class="head">
      <div class="avatar">{{link.name.split('')[0]}}</div>
      <a class="title" :href="link.url" target="_blank">{{link.name}}</a>
    </div>
    <div class="description">{{link.content}}</div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
const props = defineProps(['link'])
const avatarColor = getAvatarColor();
function getAvatarColor() {
  const r = Math.floor(Math.random()*257);
  const b = Math.floor(Math.random()*257);
  const g = Math.floor(Math.random()*257);
  return `rgba(${r},${g},${b},0.5)`;
}
const store = useStore();

</script>

<style scoped>
.single_friend_container {
  border-radius: 15px;
  height: fit-content;
  padding: 20px 20px 20px 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
  box-sizing: border-box;
}

.title {
  font-size: 24px;
  text-decoration: none;
  color: rgb(95, 142, 244);
}

.head {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: v-bind(avatarColor);
  border-radius: 25px;
  color: white;
  font-size: 24px;
}

.description {
  margin-top: 10px;
}
</style>