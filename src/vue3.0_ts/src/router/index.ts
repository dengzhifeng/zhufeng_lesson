/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-20 17:23:08
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-20 17:53:31
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home/index.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/mine',
        name: 'Mine',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "mine" */ '../views/mine/index.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "profile" */ '../views/profile/index.vue'
            )
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
