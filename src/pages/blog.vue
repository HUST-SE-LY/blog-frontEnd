<template>
  <login v-if="store.state.showLoginBox"></login>
  <div class="container" ref="container">
    <div :class="`left ${store.state.darkMode ? 'dark_background' : ''}`" ref="left">
      <titleHead :class="`${store.state.darkMode ? 'dark' : ''}`">正文</titleHead>
      <loading v-if="isLoading"></loading>
      <div v-html="content" :class="`main ${store.state.darkMode ? 'dark' : ''}`" ref="main" @mouseup="getSelect"></div>
    </div>
    <div :class="`right ${store.state.darkMode ? 'dark_background' : ''}`">
      <div :class="noteMode ? 'noteMode modeOn' : 'noteMode'" @click="openNote">批注模式</div>
      <titleHead :class="`${store.state.darkMode ? 'dark' : ''}`">目录</titleHead>
      <a target="" v-for="title in menu" :href="`#${title.id}`" :class="title.style">{{ title.value }}</a>
    </div>
    <comments :key="key"></comments>
  </div>
  <l2d class="l2d" :key="key"></l2d>
  <div :class="`note_box_container ${store.state.darkMode ? 'dark_background' : ''}`" ref="noteContainer"
    v-show="showNoteBox">
    <div class="input_box">
      <p :class="isFocus ? 'p_focus' : (note ? '' : 'p_origin')">添加批注</p>
      <input type="text" v-model="note" :class="isFocus ? 'input_focus' : ''" @focusin.prevent="isFocus = true"
        @focusout.prevent="isFocus = false" @keyup.enter="addNote">
    </div>
  </div>
  <div ref="noteBox" v-show="showNoteInfo" class="note_box_container">{{ noteContent }}</div>
  <toast v-if="showToast">{{ toastInfo }}</toast>
</template>

<script setup>
import { nextTick, onActivated, onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import l2d from '../components/l2d.vue';
import comments from '../components/comments.vue';
import useAxios from '../composables/useAxios';
import titleHead from '../components/titleHead.vue';
import loading from '../components/loading.vue';
import login from '../components/login.vue';
import toast from '../components/toast.vue';
import { useStore } from 'vuex';


const left = ref(null);
const key = ref(0);
let doms = [];
const scrollTop = ref(0);
const currentId = ref(0);
const isLoading = ref(false);
const store = useStore();
const axios = useAxios();
const routes = useRoute()
const content = ref("");
const container = ref(null);
const main = ref(null);
const menu = ref([]);
const tags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const noteMode = ref(false);
const noteContainer = ref(null);
const isFocus = ref(false);
const note = ref("");
const selectWord = ref("");
const noteBox = ref(null);
let noteid = null;
let parentNode = null;
let range = null;
let crossTag = 0;
let start = 0;
let end = 0;
const toastInfo = ref('');
const showToast = ref(false);
const showNoteBox = ref(false);
const showNoteInfo = ref(false);
const noteContent = ref("")

onMounted(async () => {
  isLoading.value = true;
  const id = routes.params.id;
  currentId.value = id;
  const result = await axios.post('get/blogById', {
    id: id,
  })
  content.value = result.data.html;
  isLoading.value = false;
  await nextTick();
  doms = main.value.children;
  createTree(doms);
  getNotes()
})

function openNote() {
  if (store.state.isLogin) {
    noteMode.value = !noteMode.value;
  } else {
    showToast.value = true;
    toastInfo.value = '只有管理员才能批注哦'
    setTimeout(() => {
      showToast.value = false;
    }, 3000)
  }
}


function createTree(doms) {
  menu.value = [];
  for (let i = 0; i < doms.length; i++) {
    if (tags.includes(doms[i].tagName)) {
      menu.value.push({
        value: doms[i].innerText,
        style: doms[i].tagName,
        id: doms[i].id,
      })
    }
    if (!doms[i].id) {
      doms[i].id = i;
    }
  }
  const codes = document.getElementsByTagName('code');
  for (let i = 0; i < codes.length; i++) {
    codes[i].id = `code_${i}`
  }
}

async function getNotes() {
  const result = await axios.post('/get/note', {
    id: routes.params.id,
  })
  const list = result.data.list;
  for (let i = 0; i < list.length; i++) {
    const parentNode = document.getElementById(list[i].nodeid);
    let current = parentNode.firstChild;
    for(let j = 0; j < list[i].crossLen; j++) {
      current = current.nextSibling;
    }
    const need = current.data.slice(list[i].start, list[i].end);
    current.splitText(list[i].start);
    current.nextSibling.splitText(list[i].end - list[i].start);
    const needToDel = current.nextSibling;
    const span = document.createElement("span");
    span.className = 'note';
    span.innerText = need;
    span.onmouseenter = ((e) => { showNote(list[i].content, e) });
    span.onmouseleave = hideNote;
    parentNode.insertBefore(span, needToDel)
    parentNode.removeChild(needToDel);
  }
}

function showNote(content, e) {
  noteContent.value = content;
  showNoteInfo.value = true;
  noteBox.value.style.left = e.clientX - 50 + "px";
  noteBox.value.style.top = e.clientY - 90 + "px";
}

function hideNote() {
  showNoteInfo.value = false;
}
function getSelect(e) {
  range = window.getSelection().getRangeAt(0);
  const selection = window.getSelection();
  if (selection.toString() === selectWord.value) {
    return;
  }
  showNoteBox.value = false;
  if (noteid) {
    const notedElement = document.querySelector('.noted_span');
    while (notedElement.firstChild) {
      const removed = notedElement.removeChild(notedElement.firstChild)
      parentNode.insertBefore(removed, notedElement)
    }
    parentNode.removeChild(notedElement);
    parentNode.normalize();
    noteid = null;
  }
  if (!noteMode.value) {
    return;
  }
  selectWord.value = document.getSelection().toString();
  if (selectWord.value.length) {
    crossTag = 0;
    start = range.startOffset;
    end = range.endOffset;
    noteContainer.value.style.left = e.clientX - 20 + "px";
    noteContainer.value.style.top = e.clientY - 110 + "px";
    if (range.startContainer === range.endContainer) {
      const span = document.createElement('span');
      parentNode = range.startContainer.parentNode;
      let current = parentNode.firstChild;
      while(current !== range.startContainer) {
        crossTag++;
        current = current.nextSibling;
      }
      span.className = 'noted_span';
      range.surroundContents(span);
      showNoteBox.value = true;
      if (end - start === selectWord.value.length) {
        noteid = range.startContainer.id;
      }
    }
  }
}

async function addNote() {
  const result = await axios.post('/set/note', {
    start: start,
    end: end,
    nodeid: noteid,
    content: note.value,
    blogid: routes.params.id,
    cross: crossTag,
  })
}

onBeforeRouteLeave(() => {
  currentId.value = routes.params.id;
  scrollTop.value = left.value.scrollTop;
})

onActivated(async () => {
  key.value++;
  if (routes.params.id === currentId.value) {
    left.value.scrollTop = scrollTop.value;
  } else {
    const id = routes.params.id;
    currentId.value = id;
    const result = await axios.post('get/blogById', {
      id: id,
    })
    content.value = result.data.html;
    isLoading.value = false;
    await nextTick();
    const doms = main.value.children;
    createTree(doms);
    getNotes()
  }

})




onBeforeRouteLeave((to, from, next) => {
  if (to.path === '/back') {
    if (store.state.isLogin) {
      next()
    } else {
      store.commit('showLogin')
    }
  } else {
    next();
  }
})

</script>

<style scoped>
@font-face {
  font-family: Consolas;
  src: url(../font/consolas.ttf);
}

@keyframes movein {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes wordin {
  form {
    scale: 0.1;
    opacity: 0;
  }

  to {
    scale: 1;
    opacity: 1;
  }

}

@keyframes shine {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1
  }

  ;
}

.noteMode {
  margin-bottom: 20px;
}

.note_box_container {
  border-radius: 15px;
  animation: movein 0.5s forwards;
  height: fit-content;
  padding: 20px;
  background-color: v-bind(store.state.darkMode ? 'rgba(35,35,35)' : 'rgba(255,255,255');
  color: v-bind(store.state.darkMode ? 'white' : 'black');
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
}


.input_box input {
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  background-color: transparent;
  height: 24px;
  transition: all 0.3s;
  font-size: 14px;
  color: v-bind(store.state.darkMode ? 'white' : 'black');
}

.input_box p {
  font-size: 12px;
  transition: all 0.3s;
  pointer-events: none;
  height: 18px;
  line-height: 20px;
}

.input_box .p_origin {
  font-size: 14px;
  transform: translateY(20px);
}

.input_box .input_focus {
  border-bottom: 1px solid rgba(130, 170, 255);
}

.input_box .p_focus {
  color: rgba(130, 170, 255);
}

.noteMode {
  cursor: pointer;
}

.modeOn {
  color: rgba(130, 170, 255);
}


* {
  font-family: 'Consolas';
  line-height: 30px;
}

a {
  display: block;
  text-decoration: none;
  color: v-bind(store.state.darkMode ? 'white' : 'black');
  transition: all 0.3s;
  position: relative;
  width: fit-content;
  height: 50px;
  border-left: 1px solid rgba(130, 170, 255);
  padding-left: 10px;
  line-height: 50px;
  white-space: nowrap;
}

a::before {
  width: 0;
  position: absolute;
  bottom: 0px;
  height: 1px;
  background-color: rgba(130, 170, 255);
  content: "";
  transition: all 0.3s;
  box-sizing: border-box;
}

a:hover::before {
  width: 100%;
}


a:hover {
  color: rgba(130, 170, 255);
  border-width: 3px;
}



.H1 {
  font-size: 20px;
  font-weight: 800;
}

.H2 {
  font-size: 20px;
}

.H3 {
  font-size: 18px;
  margin-left: 12px;
}

.H4 {
  font-size: 16px;
  margin-left: 24px;
}

.H5 {
  font-size: 14px;
  margin-left: 36px;
}

.H6 {
  font-size: 14px;
  margin-left: 48px;
  color: gray;
}


.container {
  display: grid;
  grid-template-columns: 4fr 1fr;
  padding: 70px;
  gap: 20px;
  scale: 1;
  position: relative;
  box-sizing: border-box;
  background: v-bind(store.state.darkMode ? '#000000' : '#f6f6f6');
}

.canvas {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -10000;
}

.left {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
  max-height: calc(100vh - 100px);
  overflow: scroll;
  position: relative;
  animation: movein 1s forwards ease-out;
}

.right {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
  overflow: scroll;
  max-height: 400px;
  animation: movein 1s forwards ease-out;
}

.right::-webkit-scrollbar {
  display: none;
}


.left::-webkit-scrollbar {
  width: 4px;
  background: transparent;
}

.left::-webkit-scrollbar-thumb {
  background-color: rgba(130, 170, 255);
  border-radius: 2px;
}

.left:hover {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
}


.main:deep(pre) {
  padding: 10px;
  border-radius: 10px;
  background-color: v-bind(store.state.darkMode ? '#242424' : '#f6f8fa');
  line-height: normal;
  overflow-x: scroll;
  margin-top: 20px;
  margin-bottom: 20px;
}

.main:deep(.note) {
  background-color: rgba(30, 170, 255, 0.3);
}


.main:deep(.hljs-keyword),
.main:deep(.hljs-built_in),
.main:deep(.hljs-name),
.main:deep(.hljs-selector-tag),
.main:deep(.hljs-tag) {
  color: v-bind(store.state.darkMode ? '#89ddff' : '#00f');
}

.main:deep(.hljs-addition),
.main:deep(.hljs-attribute),
.main:deep(.hljs-literal),
.main:deep(.hljs-section),
.main:deep(.hljs-string),
.main:deep(.hljs-template-tag),
.main:deep(.hljs-template-variable),
.main:deep(.hljs-title),
.main:deep(.hljs-type) {
  color: v-bind(store.state.darkMode ? '#f07178' : '#a31515');
}

.main:deep(.hljs-attr) {
  color: v-bind(store.state.darkMode ? '#f07178' : '#a31515');
}

.main:deep(.hljs-comment),
.main:deep(.hljs-quote),
.main:deep(.hljs-variable) {
  color: v-bind(store.state.darkMode ? '#c3e88d' : 'green');
}



.main:deep(pre)::-webkit-scrollbar {
  display: none;
}

.main:deep(code) {
  padding: 2px;
  background-color: v-bind(store.state.darkMode ? '#242424' : '#f6f8fa');
  color: palevioletred;
  font-family: 'Consolas';
}

.main:deep(pre) code {
  background: transparent;
  color: v-bind(store.state.darkMode ? '#676e95' : 'black');
  font-family: 'Consolas';
  line-height: 24px;
  font-size: 16px;
}

.main:deep(li) {
  margin-left: 30px;
}

.main:deep(p) {
  margin: 10px 0;
}

.main:deep(h1) {
  font-size: 36px;
  line-height: 70px;

}

.main:deep(h2) {
  font-size: 32px;
  line-height: 66px;
}

.main:deep(h3) {
  font-size: 28px;
  line-height: 62px;
}

.main:deep(h4) {
  font-size: 24px;
  line-height: 58px;
}

.main:deep(h5) {
  font-size: 20px;
  line-height: 54px;
}

.main:deep(h6) {
  font-size: 16px;
  line-height: 50px;
}

.main:deep(img) {
  display: block;
  width: 100%;
  margin: 20px auto;
  border-radius: 25px;
  transition: all 0.3s;
}

.main:deep(img):hover {
  border-radius: 0px;
}

.main:deep(a) {
  color: rgba(130, 170, 255);
  text-decoration: none;
}

.main:deep(.noted_span) {
  border-bottom: 3px dashed rgba(130, 170, 255);

}

@media screen and (max-width:800px) {

  .right {
    display: none;
  }

  .container {
    grid-template-columns: 1fr;
    padding: 70px 20px 70px 20px;
  }

  .l2d {
    display: none;
  }
}
</style>