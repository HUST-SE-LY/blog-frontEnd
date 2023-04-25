<template>
  <div class="sentence_container">
    <img class="avatar" src="/src/assets/ChatGPT.png" v-if="props.role !== 'user'" alt="avatar">
    <div v-html="props.content" v-if="props.role !== 'user'" :class="`sentence main ${store.state.darkMode ? 'dark_background' : ''}`">
    </div>
    <div v-html="props.content" class="main self_container" v-else>
    </div>
    <img class="avatar" src="/src/assets/avatar.png" v-if="props.role === 'user'" alt="avatar">
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const props = defineProps(['role','content']);
const store = useStore()


</script>

<style scoped>
@font-face {
  font-family: Consolas;
  src: url(../font/consolas.ttf);
}

@keyframes movein {
  from {
    transform: translateY(10px);
    opacity: 0;
  } to {
    transform: translateY(0);
    opacity: 1;
  }
  
}

.self_container {
  text-align: right;
  width: 600px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(169, 233, 122,0.8);
  box-shadow: 0px 0px 20px rgba(0,0,0,0.05);
}

.sentence_container {
  padding: 10px;
  display: flex;
  gap: 20px;
  width: fit-content;
  margin: 10px auto;
  animation: movein 0.2s forwards;
}


.avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.sentence {
  width: 600px;
  padding: 20px;
  border-radius: 15px;
  background-color: v-bind(store.state.darkMode?'000000':'#ffffff');
}


.main:deep(pre)::-webkit-scrollbar {
  display: none;
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

.main:deep(.hljs-keyword), .main:deep(.hljs-built_in) {
  font-style: italic;
  color:  v-bind(store.state.darkMode ? '#c792ea' : '#00f');;
}


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

.main:deep(.hljs-attr), .main:deep(.hljs-property) {
  color: v-bind(store.state.darkMode ? '#a6accd' : '#a31515');
}

.main:deep(.hljs-comment),
.main:deep(.hljs-quote),
.main:deep(.hljs-variable) {
  color: v-bind(store.state.darkMode ? '#c3e88d' : 'green');
}

.main:deep(pre) {
  position: relative;
  padding: 10px;
  border-radius: 10px;
  background-color: v-bind(store.state.darkMode ? '#242424' : '#f6f8fa');
  line-height: normal;
  overflow-x: scroll;
  margin-top: 20px;
  margin-bottom: 20px;
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
  color: v-bind(store.state.darkMode ? '#89ddff' : 'black');
  font-family: 'Consolas';
  line-height: 24px;
  font-size: 16px;
}




@media screen and (max-width:800px) {
  .self_container {
    width: 500px;
  }
  .sentence {
    width: 500px;
  }
}

@media screen and (max-width:700px) {
  .self_container {
    width: 450px;
  }
  .sentence {
    width: 450px;
  }
}

@media screen and (max-width:650px) {
  .self_container {
    width: 400px;
    font-size: 14px;
  }
  .sentence {
    width: 400px;
    font-size: 14px;
  }
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 8px;
  }
}

@media screen and (max-width:550px) {
  .self_container {
    width: 350px;
    font-size: 14px;
  }
  .sentence {
    width: 350px;
    font-size: 14px;
  }
  .main:deep(pre) code {
    font-size: 14px;
  }

  .main:deep(h1) {
    font-size: 30px;
    line-height: 50px;
  
  }
  
  .main:deep(h2) {
    font-size: 26px;
    line-height: 46px;
  }
  
  .main:deep(h3) {
    font-size: 22px;
    line-height: 42px;
  }
  
  .main:deep(h4) {
    font-size: 16px;
    line-height: 38px;
  }
  
  .main:deep(h5) {
    font-size: 14px;
    line-height: 34px;
  }
  
  .main:deep(h6) {
    font-size: 12px;
    line-height: 30px;
  }
  
}

@media screen and (max-width:500px) {
  .self_container {
    width: 300px;
    font-size: 12px;
  }
  .sentence {
    width: 300px;
    font-size: 12px;
  }

  .main:deep(pre) code {
    font-size: 12px;
  }
}

@media screen and (max-width:450px) {
  .sentence {
    width: 250px;
    font-size: 12px;
  }
}

@media screen and (max-width:400px) {
  .sentence {
    width: 200px;
    font-size: 12px;
  }
}
</style>