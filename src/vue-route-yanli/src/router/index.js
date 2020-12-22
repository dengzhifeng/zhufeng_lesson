/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 06:43:01
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-22 17:56:02
 */
import Vue from 'vue';
import VueRouter from '@/vue-router';
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
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
        children: [
            // /about/a      /about/b
            {
                path: 'a',
                component: {
                    // runtime-only /render方法
                    render(h) {
                        return <h1>hello a</h1>;
                    }
                }
            },
            {
                path: 'b',
                component: {
                    // runtime-only /render方法
                    render(h) {
                        return <h1>hello b</h1>;
                    }
                }
            }
        ]
    }
];
// vueRouter是一个构造函数 前端路由实现 hash模式 history模式
// 当前都叫spa应用 路径切换可以重新渲染组件 （不刷新页面）
// hash特点丑 兼容性好  api location.hash = 'xxx';  window.addEventListener
// history 漂亮像正常路径一样 但需服务端支持  history-fallback
// window.history.pushState()    监听 window.addEventListener('popstate')
const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router;
