/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 17:47:40
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-23 17:18:58
 */
import History from './base';

export default class BrowserHistory extends History {
    constructor(router) {
        super(router);
    }
    getCurrentLocation() {
        return window.location.pathname;
    }
    setupListener() {
        // 监听popstate 历史管理而已
        window.addEventListener('popstate', () => {
            // 监听路径变化（浏览器的前进后退可以监听） 进行跳转
            this.transitionTo(this.getCurrentLocation());
        });
    }
    push(location) {
        // 跳转时采用的是H5 api   这里的切换不会调用监听popstate
        // window.history.pushState(location);
        this.transitionTo(location, () => {
            // 手动url修改
            window.history.pushState({}, null, location);
        });
    }
}
