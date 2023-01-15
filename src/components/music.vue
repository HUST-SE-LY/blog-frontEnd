<template>
  <div class="music_container">
    <p>肥宅快乐歌</p>
    <p v-if="isLoading">加载歌单中</p>
    <div class="button_box" v-else>
      <p>当前歌曲：{{ currentSongName }}</p>
      <button @click="changeMusic('last')">上一首</button>
      <button @click="changePlayState">{{ playState }}</button>
      <button @click="changeMusic('next')">下一首</button>
    </div>
    <div class="lyr_container">

    </div>
    <audio :src="currentUrl" ref="audio" @canplay="audio.play()"></audio>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useAxios from '../composables/useAxios';
const axios = useAxios();
const isLoading = ref(false);
const playList = ref([]);
const currentSongName = ref('');
const currentIndex = ref(0);
const currentUrl = ref('');
const playState = ref('播放');
const audio = ref(null);
const lyrics = ref([]);
const lyrTime = ref([]);
const yrcList = ref([]);
const yrcTime = ref([])

onMounted(async () => {
  isLoading.value = true;
  const result = await axios.get("playlist/track/all?id=2172060689");
  isLoading.value = false;
  playList.value = result.data.songs;
  currentSongName.value = result.data.songs[0].name;
})

async function changePlayState() {
  if (playState.value === '播放') {
    if (currentUrl.value === '') {
      playState.value = '加载中';
      const result = await axios.get(`/song/url?id=${playList.value[currentIndex.value].id}`);
      currentUrl.value = result.data.data[0].url;
      const lyrResult = await axios.get(`/lyric/new?id=${playList.value[currentIndex.value].id}`);
      if (!lyrResult.data.yrc) {
        handleLyr(lyrResult.data.lrc.lyric);
      }
    } else {
      audio.value.play();
    }
    playState.value = '暂停';
  }
  else if (playState.value === '暂停') {
    audio.value.pause();
    playState.value = '播放';
  }
}

function handleLyr(lyricsList) {
  const list = lyricsList.split('\n');
  console.log(list)
  for (let i = 0; i < list.length; i++) {
    if (list[i]) {
      const time = handleTime(list[i].split("]")[0]);
      lyrTime.value.push(time)
      lyrics.value.push(list[i].split(']')[1]);
    }
  }
}

function handleTime(time) {
  time = time.split('[')[1];
  const minutes = parseInt(time.split(":")[0]);
  return minutes + parseFloat(time.split(":")[1]);
}

async function changeMusic(mode) {
  if (mode === 'next') {
    currentIndex.value++;
  }
  if (mode === 'last') {
    currentIndex.value--;
  }
  if (currentIndex.value === playList.value.length) {
    currentIndex.value = 0;
  }
  if (currentIndex.value < 0) {
    currentIndex.value = playList.value.length - 1;
  }
  currentSongName.value = playList.value[currentIndex.value].name;
  playState.value = '加载中'
  const result = await axios.get(`/song/url?id=${playList.value[currentIndex.value].id}`);
  currentUrl.value = result.data.data[0].url;
  playState.value = '暂停';
  const lyrResult = await axios.get(`/lyric/new?id=${playList.value[currentIndex.value].id}`);
  console.log(lyrResult)
}



</script>

<style scoped>

</style>