<template>
  <div class="chatgpt_container">
    <div class="mode_button" @click="memory = !memory">记忆模式：{{ memory ? '开' : '关' }}</div>
    <div class="sentence_box">
      <singleWord v-for="sentence in list" :role="sentence.role" :content="sentence.html?sentence.html:sentence.content"></singleWord>
    </div>
    <textarea :readonly="readonly" v-model="currentQuestion" @keyup.enter="request"
      :class="`input ${store.state.darkMode ? 'dark_background' : ''}`" :placeholder="placeholder"></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useAxios from '../composables/useAxios';
import singleWord from '../components/singleWord.vue';
import { useStore } from 'vuex';
import useMarkdown from 'markdown-it'
import hljs from 'highlight.js'

const md = new useMarkdown({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

const store = useStore();
const list = ref([]);
const currentQuestion = ref("");
const memory = ref(false);
const readonly = ref(false)
const axios = useAxios();
const placeholder = ref("输入您的问题，回车发送");
async function request() {
  let word = "";
  list.value.push({ role: 'user', content: currentQuestion.value });
  let lastWord;
  if (memory.value) {
    if (list.value.length > 10) {
      lastWord = list.value.slice(list.value.length - 11, list.value.length - 1);
    } else {
      lastWord = list.value;
    }
    for (let i = 0; i < lastWord.length; i++) {
      word += `${lastWord[i].content}\n`
    }
  } else {
    word = currentQuestion.value;
  }
  currentQuestion.value = "";
  placeholder.value = "AI思考中...这可能要花费几十秒...";
  readonly.value = "readonly";
  try {
    const result = await axios.post('/chat', {
      question: word,
    })
    list.value.push({ role: 'assistent', content: result.data.answer[0].message.content, html: md.render(result.data.answer[0].message.content) });
    placeholder.value = "输入您的问题，回车发送"
  } catch (err) {
    list.value.push({ role: 'assistent', content: "糟糕，服务器故障！" });
  }
  readonly.value = null;
}
</script>

<style scoped>
.mode_button {
  width: 100px;
  height: fit-content;
  border-radius: 25px;
  border: rgba(130, 170, 255) 1px solid;
  padding: 5px 20px;
  margin: 0 auto;
  cursor: pointer;
  color: rgba(130, 170, 255);
  text-align: center;
}

.mode_button:hover {
  background-color: rgba(130, 170, 255, 0.5);
  color: white;
}

.chatgpt_container {
  padding-top: 70px;
  height: 100vh;
  box-sizing: border-box;
  background-color: v-bind(store.state.darkMode ? '#000000' : '#f6f6f6');

}

.sentence_box {
  height: 900px;
  overflow-y: scroll;
  margin-bottom: 20px;
}

.input {
  width: 70%;
  outline: none;
  height: 50px;
  resize: none;
  padding: 20px;
  border-radius: 20px;
  border: none;
  margin: 0 auto;
  display: block;
}

@media screen and (max-height: 1200px) {
  .sentence_box {
    height: 850px;
  }
}
@media screen and (max-height: 1100px) {
  .sentence_box {
    height: 800px;
  }
}

@media screen and (max-height: 1050px) {
  .sentence_box {
    height: 750px;
  }
}

@media screen and (max-height: 1000px) {
  .sentence_box {
    height: 700px;
  }
}

@media screen and (max-height: 950px) {
  .sentence_box {
    height: 650px;
  }
}

@media screen and (max-height: 900px) {
  .sentence_box {
    height: 600px;
  }
}

@media screen and (max-height: 850px) {
  .sentence_box {
    height: 550px;
  }
}

@media screen and (max-height: 750px) {
  .sentence_box {
    height: 500px;
  }
}

@media  screen and (max-width: 600px) {
  .mode_button {
    font-size: 12px;
  }  
}





</style>