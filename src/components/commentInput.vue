<template>
  <div class="comment_input_container">
    <titleHead>发布评论</titleHead>
    <div class="head">
      <input maxlength="10" v-model="name" class="name_input" placeholder="昵称" :style="store.state.darkMode?`background-color:#242424;color:white;`:'background-color:#f6f8fa;color:black;'">
    </div>
    <div class="content">
      <textarea maxlength="500" v-model="content" placeholder="评论内容..." :style="store.state.darkMode?`background-color:#242424;color:white;`:'background-color:#f6f8fa;color:black;'"></textarea>
    </div>
    <div class="button" @click="addComment">发送</div>
    <toast v-if="showToast">评论成功，刷新后查看</toast>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import titleHead from './titleHead.vue';
import { useStore } from 'vuex';
import useAxios from '../composables/useAxios';
import toast from './toast.vue'
import { useRoute } from 'vue-router';


const route = useRoute();
const axios = useAxios();
const store = useStore();
const name = ref("");
const content = ref(""); 
const showToast = ref(false);

async function addComment() {
  const result = await axios.post('/comment/add',{
    name: name.value,
    content: content.value,
    blog: route.params.id,
  })
  if(result.status == 200) {
    name.value = '';
    content.value = '';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    },3000)
  }
}


</script>

<style scoped>

.comment_input_container {
  margin-top: 20px;
}
.head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.name_input {
  outline: none;
  border: none;
  border-radius: 2px;
  padding: 10px 20px;
}

.content {
  margin-top: 20px;
}

textarea {
  width: 80%;
  outline: none;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 5px;
  border: none;
  resize: none;
}

.button {
  margin-top: 10px;
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid rgba(130, 170, 255);
  width: fit-content;
  line-height: 1em;
  cursor: pointer;
}


</style>