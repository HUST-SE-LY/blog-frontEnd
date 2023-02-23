<template>
  <div class="single_container">
    <div class="left">
      <div class="title" v-if="!isUpdating">{{ title }}</div>
      <input type="text" class="title" v-model="title" v-else>
      <div class="des" v-if="!isUpdating">{{ des }}</div>
      <input type="text" class="des" v-model="des" v-else>
      <div class="tag_box" v-if="isUpdating">
        <singleTag v-for="(tag, index) in tags" @click="tags.splice(index, 1)">{{ tag.name }}</singleTag>
        <singleTag @click="isTagging = true">+标签</singleTag>
        <div class="add_tag_box" v-if="isTagging">
          <input type="text" class="tag_input" placeholder="回车键添加" v-model="tagName" @keyup.enter="addTag">
        </div>
      </div>
      <div class="note" v-for="note in noteList" v-if="isUpdating">
        <p class="note_content">{{ note.content }}</p>
        <div class="update delete" @click="deleteNote(note.id)">删除</div>
      </div>
      <div class="left_bottom">
        <div class="update" v-if="isUpdating" @click="blogInput.click()">{{ blogState }}</div>
        <div class="update" v-if="isUpdating" @click="pictureInput.click()">{{ pictureState }}</div>
        <input type="file" ref="blogInput" style="display:none" accept=".md" @change="blogState = '已选择博客'">
        <input type="file" ref="pictureInput" style="display:none" accept="image/*" @change="pictureState = '已选择封面'">
      </div>

    </div>
    <div class="right">
      <div class="update" @click="changeState">{{ isUpdating?'保存': '修改' }}</div>
      <div class="update delete" @click="deleteBlog">删除</div>
    </div>
  </div>
</template>

<script setup>
import { getConstantType } from '@vue/compiler-core';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import useAxios from '../composables/useAxios';
import singleTag from './singleTag.vue';
const props = defineProps(['blogInfo']);
const emits = defineEmits(['delete']);
const tags = ref([]);
const axios = useAxios();
const blogInput = ref(null);
const blogState = ref("更新博客");
const pictureState = ref("更新封面")
const pictureInput = ref(null)
const title = ref(props.blogInfo.title);
const des = ref(props.blogInfo.des);
const isUpdating = ref(false);
const isTagging = ref(false);
const tagName = ref("");
const store = useStore();
const noteList = ref([]);



async function changeState() {
  if (isUpdating.value) {
    const tagList = [];
    for (let i = 0; i < tags.value.length; i++) {
      tagList.push(tags.value[i].name);
    }
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('des', des.value);
    formData.append('tags', tagList);
    formData.append('id', props.blogInfo.id);
    if (blogInput.value) {
      formData.append("blog", blogInput.value.files[0]);
    }
    if (pictureInput.value) {
      formData.append("picture", pictureInput.value.files[0]);
    }
    const result = await axios.post('/update/blog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

  }
  isUpdating.value ? isUpdating.value = false : isUpdating.value = true;
}

function addTag() {
  if (tagName.value) {
    tags.value.push({
      name: tagName.value
    });
  }
  tagName.value = "";
  isTagging.value = false
}

async function deleteBlog() {
  await axios.post('/delete/blog', {
    id: props.blogInfo.id,
  })
  emits('delete');

}

onMounted(async () => {
  const id = props.blogInfo.id;
  let result = await axios.post("/get/blogTag", {
    id: id,
  })
  tags.value = result.data.tags;
  getNotes();

})

async function getNotes() {
  const result = await axios.post('/get/note',{
    id: props.blogInfo.id,
  });
  noteList.value = result.data.list;
}

async function deleteNote(id) {
  await axios.post('/delete/note',{
    id: id,
  })
  noteList.value = [];
  getNotes();
}
</script>

<style scoped>
@keyframes movein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


* {
  animation: movein 0.5s ease-out forwards;
}

.single_container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 20px;
  margin-bottom: 10px;
}

.des {
  font-size: 14px;
  color: gray;
}

.right {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.tag_box {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
  max-width: 300px;
}

input {
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
  font-size: 16px;
  display: block;
  width: 300px;
  padding-bottom: 3px;
  margin-bottom: 5px;
  background-color: transparent;
  color: v-bind(store.state.darkMode?'#ffffff':'#000000');
}

.update {
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid rgba(130, 170, 255, .75);
  width: fit-content;
  margin: 10px 0;
  transition: all 0.3s;
  font-size: 12px;
  cursor: pointer;
}

.update:hover {
  background: rgba(130, 170, 255, .75);
  color: white;
}

.left_bottom {
  display: flex;
  gap: 20px;
}

.delete:hover {
  background-color: rgba(231, 173, 172, 1);
  border: 1px solid rgba(231, 173, 172, 1);
}

.note {
  display: flex;
  align-items: center;
}

.note_content {
  display: block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 200px;
}

.note .update {
  margin-left: auto;
}
</style>