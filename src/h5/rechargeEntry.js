import { createApp } from 'vue';
import 'vant/lib/index.css';
import '@/assets/main.scss';
import Page from '@/views/assets/recharge/index.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(Page);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.mount('#app');