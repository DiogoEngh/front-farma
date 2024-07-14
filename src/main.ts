import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './core/config/router';
import { useColorMode } from '@vueuse/core'
useColorMode()

const app = createApp(App);
app.use(router);

app.mount('#app')
