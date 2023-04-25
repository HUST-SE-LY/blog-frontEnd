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
      <img :src="url" alt="" class="home_pic" ref="pic">
    </div>
    <toast v-if="showToast">这篇博客已上锁！</toast>
  </div>
</template>

<script setup>
import singleTag from './singleTag.vue';
import useAxios from '../composables/useAxios';
import { nextTick, onMounted, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import toast from './toast.vue';
const router = useRouter();
const props = defineProps(['blogInfo']);
const axios = useAxios();
const tagList = ref([]);
const pic = ref(null);
const url = ref('../assets/picture.svg');
const showToast = ref(false);

onMounted(async () => {
  const result = await axios.post('/get/blogTag',{
    id: props.blogInfo.id,
  })
  tagList.value = result.data.tags;
  await nextTick();
  const observer = new IntersectionObserver((entries) => {
    if(entries[0].intersectionRatio > 0) {
      url.value = `/api/picture/${props.blogInfo.picture}`;
      observer.unobserve(pic.value);
    }
  });
  observer.observe(pic.value)
})

async function intoDetail() {
  if(props.blogInfo.lock) {
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    },3000)
    return ;
  }
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
  margin-bottom: 120px;
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
  gap: 20px;
  padding-bottom: 10px;
  width: 100%;
}

.tag_box {
  display: flex;
  width: 100%;
  gap: 10px;
  flex-wrap: nowrap;
  align-items: center;
}

.tag_box::-webkit-scrollbar {
  display: none;
}

.date {
  color: lightgray;
  font-size: 14px;
  width: 6em;
}

@media screen and (max-width: 1200px) {
  .content {
    width: 300px;
  }

  .date {
    color: lightgray;
    font-size: 14px;
    width: 6em;
    white-space: nowrap;
  }
}

@media screen and (max-width: 650px) {
  .title {
    font-size: 16px;
  }

  .bottom {
    gap: 10px;
  }

  .content {
    width: 200px;
    box-sizing: border-box;
  }
  
  .home_pic {
    width: 140px;
    height: 80px;
  }

}

@media screen and (max-width: 550px) {
  .title {
    font-size: 16px;
  }

  .bottom {
    gap: 10px;
  }

  .content {
    width: 100px;
    box-sizing: border-box;
  }

  .right {
    display: none;
  }

  .left {
    width: 100%;
  }

  .tag_box {
    width: fit-content;
    min-width: 200px;
    max-width: 100%;
  }



}

@media screen and (max-width: 450px) {
  .right {
    display: none;
  }

  .date {
    font-size: 12px;
  }

  .tag_box {
    min-width: 100px;
  }
}



@media screen and (max-height: 1440px) {
  .single_blog_container {
    margin-bottom: 100px;
  }
}

@media screen and (max-height: 1280px) {
  .single_blog_container {
    margin-bottom: 80px;
  }
}

@media screen and (max-height: 1100px) {
  .single_blog_container {
    margin-bottom: 40px;
  }
}

@media screen and (max-height: 900px) {
  .single_blog_container {
    margin-bottom: 20px;
  }
}

@media screen and (max-height: 800px) {
  .single_blog_container {
    margin-bottom: 10px;
  }

  .tag_box {
    width: 100px;
  }

  .home_pic {
    width: 105px;
    height: 60px;
  }

  .title {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .content {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .date {
    font-size: 12px;
  }
}

</style>