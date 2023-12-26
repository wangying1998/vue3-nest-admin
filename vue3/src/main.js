import { createApp, provide } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/css/element.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import globalMsg from './components/MsgComponent/globalMessage';
import VueGridLayout from 'vue-grid-layout';
// iconfont
import '//at.alicdn.com/t/c/font_4301192_zexrgk5lj5n.js';

// console.log('当前环境：', import.meta.env.MODE);

const pinia = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.provide('globalMsg', globalMsg);

app.use(router);
app.use(pinia);
app.use(VueGridLayout);
app.mount('#app');
