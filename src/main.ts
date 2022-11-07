import { createApp } from 'vue';
import { createPinia } from "pinia";
import '@/style/index.css';
import '@/style/tailwind.css';
import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);
const pinia = createPinia();

app
  .use(pinia)
  .use(router)
  .mount('#app');
