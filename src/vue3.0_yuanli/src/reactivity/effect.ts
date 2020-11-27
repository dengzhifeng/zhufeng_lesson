/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-27 16:04:10
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-27 18:05:12
 */
export function effect(fn, options: any = {}) {
    // 类似vue2 watcher
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect();
    }
    return effect;
}
// 存贮当前的effect函数
let activeEffect;
function createReactiveEffect(fn, options) {
    const effect = function () {
        activeEffect = effect;
        return fn(); // 用户的逻辑 内部会对数据进行取值操作; 在区知识 可以拿到acriveEffect
    };
    return effect;
}

// effect和

function track(target, key) {
    if (activeEffect == undefined) {
        return;
    }
}
