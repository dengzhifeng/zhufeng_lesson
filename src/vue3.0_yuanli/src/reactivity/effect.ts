/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-27 16:04:10
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-29 23:15:27
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
let uid = 0;
function createReactiveEffect(fn, options) {
    const effect = function() {
        activeEffect = effect;
        return fn(); // 用户的逻辑 内部会对数据进行取值操作; 在取值时 可以拿到activeEffect
    };
    effect.id = uid++;
    effect.deps = []; // 用来表示 effect中依赖了哪些属性
    effect.options = options;
    return effect;
}

// {object: {key: [effect,effect]}}
// 将属性和effect做一个关联
const targetMap = new WeakMap();
function track(target, key) {
    if (activeEffect == undefined) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
}
