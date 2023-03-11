<template>
  <headTag></headTag>
  <router-view v-slot="{ Component }">
    <Transition name="fade">
      <KeepAlive>
        <component :is="Component"></component>
      </KeepAlive>
    </Transition>
  </router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import useAxios from './composables/useAxios';
import headTag from './components/headTag.vue';
import { useStore } from 'vuex';

const axios = useAxios();
const store = useStore();

onMounted(async () => {
  try {
    await axios.post('/check')
    store.commit('login')
  } catch (e) {
    store.commit("logout")
  }
})
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
