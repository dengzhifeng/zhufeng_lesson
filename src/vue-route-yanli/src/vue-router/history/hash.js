import History from './base';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 17:47:33
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-23 06:46:07
 */

function ensureSlash() {
    if (window.location.hash) {
        return;
    }
    window.location.hash = '/';
}
function getHash() {
    return window.location.hash.slice(1);
}
export default class HashHistory extends History {
    constructor(router) {
        super(router);
        console.log('hash mode');
        // 默认hash模式 需要加 #/
        ensureSlash();
    }
    setupListener() {
        // 监听 hash性能不如popstate好用 popstate 也可以监听浏览器历史记录的变化 源码有写
        window.addEventListener('hashchange', () => {
            // 根据当前hash值 去匹配对应的组件
            // todo...
            this.transitionTo(getHash());
        });
    }
    getCurrentLocation() {
        return getHash();
    }
    // hash模式的核心功能是 监听hash值的变化 window.addEventListener('hashchange')
}
