/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 07:03:02
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-22 18:11:46
 */
import { install } from './install';
import { createMatcher } from './create-matcher';
import HashHistory from './history/hash';
import BrowserHistory from './history/history';
// 路由核心原理 根据路径 返回对应组件
export default class VueRouter {
    constructor(options) {
        // 根据用户的配置 生成一个映射表 稍后跳转时 根据路径找到对应组件来进行渲染

        // 创建匹配器后，核心的方法就是匹配
        // match addRoutes
        this.matcher = createMatcher(options.routes || []);
        console.log(this.matcher);

        // 根据当前的mode 创建不同的history管理策略
        switch (options.mode) {
            case 'hash': {
                this.history = new HashHistory(this);
                break;
            }
            case 'history': {
                this.history = new BrowserHistory(this);
                break;
            }
        }
    }
    init(app) {
        // app根实例
        // 路由初始化
        console.log('init');
        // 初始化后 需要先根据路径做一次匹配 后根据hash值的变化再次匹配
        const history = this.history;

        const setupHashListener = () => {
            history.setupListener(); // 监听hash变化
        };
        history.transitionTo(history.getCurrentLocation(), setupHashListener); // 跳转到哪里
    }
}

VueRouter.install = install;
