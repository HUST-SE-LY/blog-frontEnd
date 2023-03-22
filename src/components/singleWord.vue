<template>
  <div class="sentence_container">
    <img class="avatar" src="/src/assets/avatar.png" v-if="props.role === 'user'" alt="avatar">
    <div v-html="props.content" :class="`sentence main ${store.state.darkMode ? 'dark_background' : ''}`">
    </div>
    <img class="avatar" src="/src/assets/ChatGPT.png" v-if="props.role !== 'user'" alt="avatar">
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';


const props = defineProps(['role','content']);
const store = useStore()
onMounted(() => {
  console.log(props.content)
})


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

.main:deep(pre) {
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

@media screen and (max-width:800px) {
  .sentence {
    width: 500px;
  }
}

@media screen and (max-width:700px) {
  .sentence {
    width: 450px;
  }
}

@media screen and (max-width:650px) {
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
  .sentence {
    width: 350px;
    font-size: 14px;
  }
}

@media screen and (max-width:500px) {
  .sentence {
    width: 300px;
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