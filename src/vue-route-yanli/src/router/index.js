import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// Vue.use = function(plugin, options) {
//   // this -> Vue对象
//   plugin.install(this, options);
// }

Vue.use(VueRouter); // 为了事宜vue-router可以版本和用户使用一致性

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];
// vueRouter是一个构造函数 前端路由实现 hash模式 history模式
// 当前都叫spa应用 路径切换可以重新渲染组件 （不刷新页面）
// hash特点丑 兼容性好  api location.hash = 'xxx';  window.addEventListener
// history 漂亮像正常路径一样 但需服务端支持  history-fallback
// window.history.pushState()    监听 window.addEventListener('popstate')
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
