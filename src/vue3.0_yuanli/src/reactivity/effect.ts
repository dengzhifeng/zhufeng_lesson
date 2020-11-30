import { isArray, isInteger } from '../shared/index';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-27 16:04:10
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-30 11:44:05
 */
export function effect(fn, options: any = {}) {
    // 类似vue2 watcher
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect();
    }
    return effect;
}
// effectStack 为了解决嵌套的effect时 activeEffect被清空问题 导致外层effect关联失效
// effect(() => {
//     state.name;
//     effect(() => {
//         state.age
//     })
//     state.address
// })
// 存贮当前的effect函数
let activeEffect;
let uid = 0;
const effectStack = [];
function createReactiveEffect(fn, options) {
    const effect = function () {
        // 条件判断防止递归执行 死循环
        if (!effectStack.includes(effect)) {
            try {
                activeEffect = effect;
                effectStack.push(activeEffect);
                return fn(); // 用户的逻辑 内部会对数据进行取值操作; 在取值时 可以拿到activeEffect
            } finally {
                effectStack.pop(); // 取走最后一个
                activeEffect = effectStack[effectStack.length - 1]; // 置空 防止别的变量关联当前effect
            }
        }
    };
    effect.id = uid++;
    effect.deps = []; // 用来表示 effect中依赖了哪些属性
    effect.options = options;
    return effect;
}

// {object: {key: [effect,effect]}}  {object:{age: [effect, effect]}}
//                                   {target: {key: new Set()}}
// 将属性和effect做一个关联
const targetMap = new WeakMap();
export function track(target, key) {
    if (activeEffect == undefined) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        // new Set为了去重 为了用has等方法方便
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect); // 无 就加这个effect
        activeEffect.deps.push(key); // 双向记忆过程
    }

    console.log(targetMap);
}

// 触发执行
export function trigger(target, type, key, value?, oldValue?) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        return;
    }
    // 执行key关联的effect函数
    const run = (effects) => {
        if (effects) effects.forEach((effect) => effect());
    };

    // 数组的特殊情况 改length时候
    if (key === 'length' && isArray(target)) {
        console.log(depsMap);
        depsMap.forEach((dep, key) => {
            // map可以循环
            if (key == 'length' || key >= value) {
                // 如果改的长度 小于数组原有的长度时 应该刚更新视图
                run(dep);
            }
        });
    } else {
        if (key != void 0) {
            // key!= undefined key不等于空 说明修改了key
            run(depsMap.get(key));
        }
        switch (type) {
            case 'add':
                if (isArray(target)) {
                    // 如果通过索引增加选项
                    if (isInteger(key)) {
                        run(depsMap.get('length')); // 如果页面中直接使用了数组也会对数组进行取值操作， 会对length进行收集， 新增属性时 直接触发length即可。
                    }
                }
                break;
            default:
                break;
        }
    }
}
