/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-08-28 20:47:33
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-28 20:55:50
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import zfUi from './packages';

Vue.config.productionTip = false;
Vue.use(zfUi);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
