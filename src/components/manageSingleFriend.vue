<template>
  <div class="single_friend_container">
    <div class="left">
      <div class="name">{{ link.name }}</div>
      <a class="url" :href="link.url" target="_blank">{{ link.url }}</a>
      <div class="content">{{ link.content }}</div>
    </div>
    <div class="right">
      <div class="pass" @click="pass" v-if="link.isPass === 0">同意</div>
      <div class="reject" @click="deleteLink">{{link.isPass === 0 ? '拒绝' : '删除'}}</div>
    </div>
  </div>
</template>

<script setup>
import useAxios from '../composables/useAxios';

const props = defineProps(['link']);
const emits = defineEmits(['pass'])
const axios = useAxios();

async function pass() {
  const id = props.link.id;
  await axios.post('/link/pass',{
    id: id,
  })
  emits('pass');
}

async function deleteLink() {
  const id = props.link.id;
  await axios.post('/link/delete',{
    id: id,
  })
  emits('pass');
}

</script>

<style scoped>
.single_friend_container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.right {
  margin-left: auto;
}

.name {
  font-size: 18px;
  margin-bottom: 5px;
}

.url {
  color: rgba(130, 170, 255, .75);
  text-decoration: none;
}

.content {
  color: gray;
  font-size: 12px;
  margin-top: 5px;
}

.pass {
  padding: 2px 40px;
  border-radius: 100px;
  border: rgba(130, 170, 255, .75) 1px solid;
  margin-bottom: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pass:hover {
  background-color: rgba(130, 170, 255, .75);
  color: white;
}

.reject {
  padding: 2px 40px;
  border-radius: 100px;
  border: rgba(231, 173, 172, 1) 1px solid;
  margin-bottom: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.reject:hover {
  background-color: rgba(231, 173, 172, 1);
  color: white;
}
</style>