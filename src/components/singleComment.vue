<template>
  <div class="single_comment_container">
    <div class="head">
      <div class="avatar">{{commentInfo.name.split('')[0]}}</div>
      <div>
        <p class="name">{{commentInfo.name}}</p>
      </div>
      <p class="date">{{commentInfo.date}}</p>
    </div>
    <div class="content">
      <div>{{commentInfo.content}}</div>
      <div v-if="store.state.isLogin" class="delete" @click="deleteComment">删除</div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import useAxios from '../composables/useAxios';

const axios = useAxios();
const store = useStore();
const props = defineProps(['commentInfo']);
const avatarColor = getAvatarColor();
function getAvatarColor() {
  const r = Math.floor(Math.random()*257);
  const b = Math.floor(Math.random()*257);
  const g = Math.floor(Math.random()*257);
  return `rgba(${r},${g},${b},0.5)`;
}
async function deleteComment() {
  const id = props.commentInfo.id;
  await axios.post('/delete/comment',{
    id: id,
  })
  
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
  display: flex;
  margin-top: 10px;
  line-height: 1.6em;
  word-wrap: break-word;
  word-break: break-all;
}

.delete {
  margin-left: auto;
  padding: 5px 20px;
  font-size: 14px;
  line-height: 1em;
  border-radius: 40px;
  border: rgba(130, 170, 255) 1px solid;
  cursor: pointer;
}

.delete:hover {
  border-color: brown;
}






</style>