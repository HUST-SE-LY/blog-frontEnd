<template>
  <div class="blog_list_container">
    <loading v-if="isLoading"></loading>
    <titleHead>博客列表</titleHead>
    <div class="blog_box">
      <singleBlog v-for="blog in blogList" :blog-info="blog" :key="blog.id"></singleBlog>
    </div>
    <div class="bottom">
      <p class="button" @click="lastPage">上一页</p>
      <p class="button" @click="nextPage">下一页</p>
    </div>
  </div>
  <toast v-if="showToast">{{ toastInfo }}</toast>
</template>

<script setup>
import titleHead from './titleHead.vue';
import singleBlog from './singleBlog.vue';
import useAxios from '../composables/useAxios';
import loading from './loading.vue';
import { onMounted, ref, watch } from 'vue';
import toast from './toast.vue'
import { useStore } from 'vuex';
const store = useStore()
const isLoading = ref(false);
const axios = useAxios();
const blogList = ref([]);
const limit = 4;
const offset = ref(0);
const showToast = ref(false);
const toastInfo = ref("");

watch(() => store.state.searchWord, async (newVal) => {
  blogList.value = [];
  offset.value = 0;
  if (newVal) {
    searchByTitle();
  } else {
    searchByTime();
  }
})


watch(() => store.state.tag, async (newVal) => {
  blogList.value = [];
  offset.value = 0;
  if (newVal) {
    searchByTag();
  } else {
    searchByTime();
  }
})

async function searchByTime() {
  isLoading.value = true;
  const result = await axios.post('/get/blog', {
    limit: limit,
    offset: offset.value,
  })
  isLoading.value = false;
  blogList.value = result.data.blogs;
  offset.value += result.data.blogs.length;
}

async function searchByTitle() {
  isLoading.value = true;
  const result = await axios.post('/get/blogByTitle', {
    limit: limit,
    offset: offset.value,
    title: store.state.searchWord
  })
  isLoading.value = false;
  blogList.value = result.data.blogs;
  offset.value += result.data.blogs.length;
}

async function searchByTag() {
  isLoading.value = true;
  const result = await axios.post('/get/blogByTag', {
    limit: limit,
    offset: offset.value,
    tag: store.state.tag,
  })
  isLoading.value = false;
  blogList.value = result.data.blogs;
  offset.value += result.data.blogs.length;
}

onMounted(async () => {
  if (store.state.searchWord) {
    searchByTitle()
  } else if (store.state.tag) {
    searchByTag()
  } else {
    searchByTime();
  }
})

watch(showToast, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      showToast.value = false;
    }, 5000)
  }
})

async function lastPage() {
  if (offset.value <= limit) {
    toastInfo.value = "已经是首页了哦"
    showToast.value = true;
    return;
  }
  offset.value -= (limit + blogList.value.length);
  if (store.state.tag) {
    searchByTag();
  } else if(store.state.searchWord) {
    searchByTitle();
  } else {
    searchByTime();
  }
}

async function nextPage() {
  if (isLoading.value) return;
  isLoading.value = true;
  let result;
  if (store.state.tag) {
    result = await axios.post('/get/blogByTag', {
      limit: limit,
      offset: offset.value,
      tag: store.state.tag,
    })
  } else if(store.state.searchWord) {
    result = await axios.post('/get/blogByTag', {
      limit: limit,
      offset: offset.value,
      title: store.state.searchWord,
    })
  } else {
    result = await axios.post('/get/blog', {
      limit: limit,
      offset: offset.value
    });
  }
  if (result.data.blogs.length) {
    blogList.value = result.data.blogs;
    offset.value += result.data.blogs.length;
  } else {
    toastInfo.value = "已经是最后一页了哦"
    showToast.value = true;
  }
  isLoading.value = false;
}
</script>

<style scoped>
.blog_list_container {
  border-radius: 15px;
  height: fit-content;
  z-index: -1;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
}

.blog_list_container:hover {
  scale: 1.02;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
.blog_box {
  min-height: 100px;
}

.bottom {
  border-top: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 100px;
}

.button {
  padding: 5px 10px;
  border-radius: 20px;
  border: rgba(130, 170, 255) 1px solid;
  font-size: 14px;
  transition: all 0.3s;
  cursor: pointer;
}

.button:hover {
  background-color: rgba(130, 170, 255);
  color: white;
}
</style>