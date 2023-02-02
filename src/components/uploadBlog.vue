<template>
  <div :class="`upload_blog_container ${store.state.darkMode?'dark_background':''}`">
    <titleHead>上传博客</titleHead>
    <loading v-if="isLoading"></loading>
    <div class="not_loading" v-else>
      <div class="input_box">
        <p :class="isTitleFocus ? 'p_focus' : (title ? '' : 'p_origin')">标题</p>
        <input type="text" v-model="title" :class="isTitleFocus ? 'input_focus' : ''" @focusin="isTitleFocus = true"
          @focusout="isTitleFocus = false">
      </div>
      <div class="input_box">
        <p :class="isDesFocus ? 'p_focus' : (des ? '' : 'p_origin')">简介</p>
        <input type="text" v-model="des" :class="isDesFocus ? 'input_focus' : ''" @focusin="isDesFocus = true"
          @focusout="isDesFocus = false">
      </div>
      <div class="file_box">
        <div class="choose_file" @click="blogInput.click()">{{ blogChooseState }}</div>
        <div class="choose_file" @click="pictureInput.click()">{{ pictureChooseState }}</div>
        <input type="file" ref="blogInput" style="display:none" accept=".md" @change="blogChooseState = '博客选择完毕'">
        <input type="file" ref="pictureInput" style="display:none" accept="image/*"
          @change="pictureChooseState = '封面选择完毕'">
      </div>
      <div class="tag_box">
        <singleTag v-for="(tag, index) in tagList" @click="tagList.splice(index, 1)">{{ tag }}</singleTag>
        <singleTag @click="isTagging = true">+标签</singleTag>
      </div>
      <div class="add_tag_box" v-if="isTagging">
        <input type="text" class="tag_input" placeholder="回车键添加" v-model="tagName" @keyup.enter="addTag">
      </div>
      <div class="upload_button" v-if="title && des && tagList.length && blogInput.value" @click="upload">上传</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import titleHead from './titleHead.vue';
import singleTag from './singleTag.vue';
import useAxios from '../composables/useAxios';
import loading from './loading.vue';
import { useStore } from 'vuex';
const emit = defineEmits("expired")
const axios = useAxios();
const isTitleFocus = ref(false);
const isDesFocus = ref(false);
const blogInput = ref(null);
const pictureInput = ref(null);
const title = ref("");
const des = ref("");
const tagName = ref("");
const tagList = ref([]);
const isTagging = ref(false);
const blogChooseState = ref("选择博客文件");
const pictureChooseState = ref("选择封面图");
const isLoading = ref(false)
const store = useStore()

function addTag() {
  if (tagName.value) {
    tagList.value.push(tagName.value);
  }

  isTagging.value = false;
  tagName.value = "";
}

async function upload() {
  if(isLoading.value) return;
  try {
    isLoading.value = true;
    const blog = blogInput.value.files[0];
    const picture = pictureInput.value.files[0];
    const formData = new FormData();
    formData.append('tags', tagList.value);
    formData.append('blog', blog);
    formData.append('picture', picture);
    formData.append('des', des.value);
    formData.append('title', title.value);
    const result = await axios.post('/upload/blog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (e) {
    emit("expired");
  } finally {
    isLoading.value = false;
    title.value = "";
    des.value = "";
    tagList.value = []; 
    blogChooseState.value = "选择博客文件";
    pictureChooseState.value = "选择封面图";
  }
}


</script>

<style  scoped>
@keyframes movein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.upload_blog_container {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
  position: relative;
}

.upload_blog_container:hover {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
}

.input_box {
  margin: 10px 0;
  position: relative;
}

input {
  width: 80%;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  height: 24px;
  transition: all 0.3s;
  font-size: 14px;
  background-color: transparent;
  color: v-bind(store.state.darkMode?'white':'black');
}

p {
  font-size: 12px;
  transition: all 0.3s;
  pointer-events: none;
  height: 18px;
  line-height: 20px;
}

.p_origin {
  font-size: 14px;
  transform: translateY(20px);
}

.input_focus {
  border-bottom: 1px solid rgba(130, 170, 255);
}

.p_focus {
  color: rgba(130, 170, 255);
}

.file_box {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  padding-bottom: 10px;
}

.choose_file {
  padding: 5px 15px;
  border-radius: 10px;
  border: 1px solid rgba(130, 170, 255);
  font-size: 12px;
  cursor: pointer;
}

.tag_box {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  padding-bottom: 10px;

}

.add_tag_box {
  margin-top: 10px;
  animation: movein 0.5s ease-out forwards;
}

.upload_button {
  width: fit-content;
  font-size: 14px;
  padding: 5px 20px;
  margin-top: 10px;
  border-radius: 20px;
  border: rgba(130, 170, 255) 1px solid;
  transition: all 0.3s;
  cursor: pointer;
}

.upload_button:hover {
  background-color: rgba(130, 170, 255, 0.5);
  border: white 1px solid;
  color: white;
}
</style>