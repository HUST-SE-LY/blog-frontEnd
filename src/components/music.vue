<template>
  <div :class="`music_container ${store.state.darkMode?'dark_background':''}`">
    <titleHead>BGM</titleHead>
    <p v-if="isLoading">加载歌单中</p>
    <div class="button_box" v-else>
      <p class="name">当前歌曲：<span style="color: rgba(130, 170, 255); margin-right: 10px;">{{ currentSongName }}</span><button @click="changeMusic('random')">随机一首</button></p>
      <div class="loading_box">
        <p class="music_time">{{songCurrentTime}}</p>
        <div class="loading_ball" @click="movingDuration">
          <div class="have_loaded"></div>
        </div>
        <p class="music_time">{{songTime}}</p>
      </div>
      <button @click="changeMusic('last')">上一首</button>
      <button @click="changePlayState">{{ playState }}</button>
      <button @click="changeMusic('next')">下一首</button>
      <button @click="changePlayList">切换歌单</button>
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
import useMusicAxios from "../composables/useMusicAxios";
import { useStore } from 'vuex';
const store = useStore()
const axios = useMusicAxios();
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
const currentTlyc = ref("");
const playListId = ref(2517473337);
const songCurrentTime = ref('0:00');
const songTime = ref('0:00');
const loadingLength = ref('0px');

onMounted(async () => {
  isLoading.value = true;
  const result = await axios.get(`/playlist/track/all?id=${playListId.value}`);
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
      if (lyrResult.data.tlyric) {
        handleTrans(lyrResult.data.tlyric.lyric);
      }
      console.log(lyrResult.data.lrc.lyric)
      handleLyr(lyrResult.data.lrc.lyric)
    }
    songTime.value = handleSongTime(audio.value.duration);
    audio.value.play();
    playState.value = '暂停';
  }
  else if (playState.value === '暂停') {
    audio.value.pause();
    playState.value = '播放';
  }
}

async function changePlayList() {
  if(playListId.value === 2517473337) {
    playListId.value = 2172060689;
  } else {
    playListId.value = 2517473337;
  }
  isLoading.value = true;
  const result = await axios.get(`/playlist/track/all?id=${playListId.value}`);
  isLoading.value = false;
  playList.value = result.data.songs;
  currentUrl.value = "";
  currentLycIndex.value = 0;
  currentIndex.value = 0;
  lyrics.value = [];
  lyricsTrans.value = [];
  lyrTime.value = [];
  currentLyc.value = '';
  currentTlyc.value = ''; 
  currentSongName.value = result.data.songs[0].name;
  playState.value = "播放";
  songTime.value = '0:00';
}

function handleTrans(lyricsList) {
  const list = lyricsList.split('\n');
  console.log(list)
  for (let i = 0; i < list.length; i++) {
    if (list[i][0] === '['&& list[i][1] === '0') {
      lyricsTrans.value.push(list[i].split(']')[1]);
    }
  }
}

function handleLyr(lyricsList) {
  const list = lyricsList.split('\n');
  for (let i = 0; i < list.length; i++) {
    if (list[i][0] === '[' && list[i][1] === '0') {
      const time = handleTime(list[i].split("]")[0]);
      lyrTime.value.push(time)
      lyrics.value.push(list[i].split(']')[1]);
    }
  }
}





function timeUpdate(e) {
  songCurrentTime.value = handleSongTime(e.target.currentTime);
  loadingLength.value = judgeLoadingLength(e.target.currentTime);
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

function handleSongTime(time) {
  const minute = parseInt(parseFloat(time)/60);
  const second = parseInt(time - 60*minute) < 10? `0${parseInt(time - 60*minute)}`: parseInt(time - 60*minute);
  return `${minute}:${second}`
}

function judgeLoadingLength(time) {
  if(audio.value.duration) {
    const length = (time/audio.value.duration)*200;
    return length + 'px';
  }
  return 0;
}

function movingDuration(e) {
  audio.value.currentTime = audio.value.duration * (e.offsetX / 200);
}

async function changeMusic(mode) {
  if(playState.value === '加载中') {
    return;
  }
  songTime.value = '0:00';
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
  if( mode === 'random') {
    currentIndex.value = Math.floor(Math.random() * playList.value.length);
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
  const lyrResult = await axios.get(`/lyric/new?id=${playList.value[currentIndex.value].id}`);
  console.log(lyrResult);
  if (lyrResult.data.tlyric) {
    handleTrans(lyrResult.data.tlyric.lyric);
  }
  handleLyr(lyrResult.data.lrc.lyric);
  songTime.value = handleSongTime(audio.value.duration);
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
  margin-right: 20px;
  border: 1px solid rgba(130, 170, 255, .75);
  cursor: pointer;
  color: v-bind(store.state.darkMode?'#ffffff':'#000000');
  transition: all 0.3s;
  margin-bottom: 10px;
}

button:hover {
  background-color: rgba(130, 170, 255, .75);
  color: white;
  border: white 1px solid;
}

.name {
  margin-bottom: 20px;
}

.lyr_container {
  margin-top: 20px;
  font-size: 14px;
  color: gray;

}

.music_time {
  font-size: 12px;
  color: gray;
}

.loading_box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.loading_ball {
  width: 200px;
  height: 1px;
  background-color: gray;
  position: relative;
  cursor: pointer;
}

.have_loaded {
  position: absolute;
  width: v-bind(loadingLength);
  height: 5px;
  background-color: rgba(130, 170, 255);
  top: -2px;
  border-radius: 4px;

}
</style>