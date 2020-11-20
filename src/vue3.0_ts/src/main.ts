/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-20 17:23:08
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-20 18:03:13
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Vant from 'vant';
import 'vant/lib/index.css';
createApp(App)
    .use(store)
    .use(router)
    .use(Vant)
    .mount('#app');
