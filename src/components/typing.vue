<template>
  <div class="letter_box">
    <div class="box">
      <span v-for="(letter, index) in letterList" :key="index">{{ letter }}</span>
      <div class="mouse"></div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const letterList = ref([]);
const props = defineProps(['word']);
onMounted(() => {
  const arr = props.word.split("");
  let i = 0;
  const interval = setInterval(() => {
    letterList.value.push(arr[i]);
    i++;
    if (i === arr.length) {
      clearInterval(interval);
    }
  }, 300)
})
</script>

<style scoped>
.letter_box {
  color: white;
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.mouse {
  height: 1em;
  width: 1px;
  content: "";
  background-color: white;
  position: absolute;
  right: -3px;
  top: 0;
  animation: shining 1s linear infinite;
}

@keyframes shining {
  0% {
    opacity: 0;
  } 50% {
    opacity: 1;
  } 100% {
    opacity: 0;
  }
  
}

.box {
  position: relative;
  display: inline;
}

</style>