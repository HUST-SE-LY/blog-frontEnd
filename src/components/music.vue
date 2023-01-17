<template>
  <div class="music_container">
    <titleHead>肥宅快乐歌</titleHead>
    <p v-if="isLoading">加载歌单中</p>
    <div class="button_box" v-else>
      <p class="name">当前歌曲：{{ currentSongName }}</p>

      <button @click="changeMusic('last')">上一首</button>
      <button @click="changePlayState">{{ playState }}</button>
      <button @click="changeMusic('next')">下一首</button>
    </div>
    <div class="lyr_container">
      <p>{{ currentLyc }}</p>
      <p>{{ currentTlyc }}</p>
    </div>
    <audio :src="currentUrl" ref="audio" @timeupdate="timeUpdate" @ended="changeMusic('next')"></audio>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import titleHead from './titleHead.vue';
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
const lyricsTrans = ref([]);
const lyrTime = ref([]);
const currentLycIndex = ref(0);
const currentLyc = ref("");
const currentTlyc = ref("")

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
      const result = await axios.get(`https://netease-cloud-music-2lcevlrwk-hust-se-ly.vercel.app/song/url?id=${playList.value[currentIndex.value].id}`);
      currentUrl.value = result.data.data[0].url;
      const lyrResult = await axios.get(`https://netease-cloud-music-2lcevlrwk-hust-se-ly.vercel.app/lyric/new?id=${playList.value[currentIndex.value].id}`);
      if (lyrResult.data.tlyric) {
        handleTrans(lyrResult.data.tlyric.lyric);
      }
      handleLyr(lyrResult.data.lrc.lyric)
    }
    audio.value.play();
    playState.value = '暂停';
  }
  else if (playState.value === '暂停') {
    audio.value.pause();
    playState.value = '播放';
  }
}

function handleTrans(lyricsList) {
  const list = lyricsList.split('\n');
  console.log(lyricsList)
  for (let i = 0; i < list.length; i++) {
    if (list[i][0] === '[') {
      lyricsTrans.value.push(list[i].split(']')[1]);
    }
  }
}

function handleLyr(lyricsList) {
  const list = lyricsList.split('\n');
  for (let i = 0; i < list.length; i++) {
    if (list[i][0] === '[') {
      const time = handleTime(list[i].split("]")[0]);
      lyrTime.value.push(time)
      lyrics.value.push(list[i].split(']')[1]);
    }
  }
}



function timeUpdate(e) {
  console.log(lyrics.value, lyricsTrans.value, lyrTime.value)
  if (e.target.currentTime >= lyrTime.value[currentLycIndex.value]) {
    currentLyc.value = lyrics.value[currentLycIndex.value];
    currentTlyc.value = lyricsTrans.value[currentLycIndex.value];
    currentLycIndex.value++;
  }
}

function handleTime(time) {
  time = time.split('[')[1];
  const minutes = parseInt(time.split(":")[0]);
  return minutes * 60 + parseFloat(time.split(":")[1]);
}

async function changeMusic(mode) {
  if(playState.value === '加载中') {
    return;
  }
  currentUrl.value = "";
  currentLycIndex.value = 0;
  lyrics.value = [];
  lyricsTrans.value = [];
  lyrTime.value = [];
  currentLyc.value = '';
  currentTlyc.value = '';
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
  const result = await axios.get(`https://netease-cloud-music-2lcevlrwk-hust-se-ly.vercel.app/song/url?id=${playList.value[currentIndex.value].id}`);
  currentUrl.value = result.data.data[0].url;
  const lyrResult = await axios.get(`https://netease-cloud-music-2lcevlrwk-hust-se-ly.vercel.app/lyric/new?id=${playList.value[currentIndex.value].id}`);
  console.log(lyrResult);
  if (lyrResult.data.tlyric) {
    handleTrans(lyrResult.data.tlyric.lyric);
  }
  handleLyr(lyrResult.data.lrc.lyric);
  audio.value.play()
  playState.value = '暂停';
}



</script>

<style scoped>
.music_container {
  border-radius: 15px;
  height: fit-content;
  z-index: -1;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  margin-bottom: 20px;
}

.music_container:hover {
  scale: 1.02;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

button {
  padding: 5px 10px;
  background-color: transparent;
  border-radius: 20px;
  border: none;
  margin-right: 20px;
  border: 2px solid rgba(130, 170, 255, .75);
  cursor: pointer;
}

.name {
  margin-bottom: 20px;
}

.lyr_container {
  margin-top: 20px;
  font-size: 14px;
  color: gray;

}
</style>