import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Highlight from './plugin/highlight/highlight'; 
import persistState from './plugin/vuex/persist';
import { createStore } from 'vuex';

const store = createStore({
  plugins:[persistState],
  state() {
    return {
      isLogin: false,
      showLoginBox: false,
      tag: null,
    }
  },
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    showLogin(state) {
      state.showLoginBox = true;
    },
    closeLogin(state) {
      state.showLoginBox = false;
    },
    changeTag(state, payLoad) {
      state.tag = payLoad.tag;
    },
    deleteTag(state) {
      state.tag = null;
    }
  }
})

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Highlight);
app.mount("#app");
