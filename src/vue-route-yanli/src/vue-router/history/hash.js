import History from './base';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 17:47:33
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-22 18:01:07
 */

function ensureSlash() {
    if (window.location.hash) {
        return;
    }
    window.location.hash = '/';
}
export default class HashHistory extends History {
    constructor(router) {
        super(router);
        console.log('hash mode');
        // 默认hash模式 需要加 #/
        ensureSlash();
    }
    setupListener() {
        // 监听
        window.addEventListener('hashchange', () => {
            // 根据当前hash值 去匹配对应的组件
            // todo...
        });
    }
    // hash模式的核心功能是 监听hash值的变化 window.addEventListener('hashchange')
}
