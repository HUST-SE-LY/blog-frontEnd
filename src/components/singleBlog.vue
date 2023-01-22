<template>
  <div class="single_blog_container">
    <div class="left">
      <p class="title" @click="intoDetail">{{blogInfo.title}}</p>
      <p class="content">{{blogInfo.des}}</p>
      <div class="bottom">
        <div class="date">{{blogInfo.date.split('T')[0]}}</div>
        <div class="tag_box">
          <singleTag v-for="tag in tagList" :key="tag.id">{{tag.name}}</singleTag>
        </div>
      </div>
    </div>
    <div class="right">
      <img :src="`http://127.0.0.1:6324/picture/${props.blogInfo.picture}`" alt="" class="home_pic">
    </div>

  </div>
</template>

<script setup>
import singleTag from './singleTag.vue';
import useAxios from '../composables/useAxios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['blogInfo']);
const axios = useAxios();
const tagList = ref([]);

onMounted(async () => {
  const result = await axios.post('/get/blogTag',{
    id: props.blogInfo.id,
  })
  tagList.value = result.data.tags;
})

async function intoDetail() {
  router.push(`/blog/${props.blogInfo.id}`)
}
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
.single_blog_container {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  animation: movein 0.3s ease-out forwards;
}


.title {
  font-size: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.title:hover {
  color: rgba(130, 170, 255);
}

.content {
  width: 400px;
  color: gray;
  font-size: 14px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
}

.home_pic {
  height: 100px;
  width: 175px;
  object-fit: cover;
  border-radius: 10px;
}

.right {
  margin-left: auto;
}

.bottom {
  display: flex;
  align-items: center;
  gap: 50px;
  padding-bottom: 10px;
}

.tag_box {
  display: flex;
  gap: 10px;
  width: 200px;
  overflow-x: scroll;
}

.tag_box::-webkit-scrollbar {
  display: none;
}

.date {
  color: lightgray;
  font-size: 14px;
}
</style>