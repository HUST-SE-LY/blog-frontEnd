<template>
  <div class="single_comment_container">
    <div class="head">
      <div class="avatar">{{commentInfo.name.split('')[0]}}</div>
      <div>
        <p class="name">{{commentInfo.name}}</p>
      </div>
      <p class="date">2022-11-22</p>
    </div>
    <div class="content">{{commentInfo.content}}</div>
  </div>
</template>

<script setup>
const props = defineProps(['commentInfo']);
const avatarColor = getAvatarColor();
function getAvatarColor() {
  const r = Math.floor(Math.random()*257);
  const b = Math.floor(Math.random()*257);
  const g = Math.floor(Math.random()*257);
  return `rgba(${r},${g},${b},0.5)`;
}
</script>

<style scoped>

.head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: v-bind(avatarColor);
  color: white;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  border-radius: 100%;
}

.single_comment_container {
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: rgba(190,190,190,0.3) 1px solid;
}

.name {
  font-size: 18px;
}

.date {
  margin-left: auto;
  color: gray;
}

.content {
  margin-top: 10px;
  line-height: 1.6em;
  word-wrap: break-word;
  word-break: break-all;
}




</style>