import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Highlight from './plugin/highlight/highlight'; 


const app = createApp(App);
app.use(router);
app.use(Highlight);
app.mount("#app");
