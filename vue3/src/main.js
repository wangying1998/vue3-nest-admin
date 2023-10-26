import { createApp, provide } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/element.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import globalMsg from './tools/globalMessage';
import VueGridLayout from 'vue-grid-layout';
import '//at.alicdn.com/t/c/font_4301192_u0iw2qxwi6.js';

console.log('当前环境：', import.meta.env.MODE);

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.provide('globalMsg', globalMsg);

app
    .use(router)
    .use(store)
    .use(VueGridLayout)
    .mount('#app');
