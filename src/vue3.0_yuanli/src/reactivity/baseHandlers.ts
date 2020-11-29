/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-27 16:33:28
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-27 17:52:03
 */

import {
    hasChanged,
    hasOwn,
    isArray,
    isInteger,
    isObject,
    isSymbol
} from '../shared/index';
import { reactive } from './reactive';

function createGetter() {
    return function get(target, key, receiver) {
        // receiver代理后的值
        // 取值会执行此方法
        // TODO 知识点api  等价于target[key] 取值返回意思
        const res = Reflect.get(target, key, receiver);
        // 如果取的值是symbol类型 我要忽略他
        // 排除symbol  数组中有很多symbol内置方法
        if (isSymbol(res)) {
            return res;
        }

        // 依赖收集
        console.log('此时数据做了获取的操作');
        track(target, key);
        // 如果取得值是对象 也要代理    取值才代理 懒递归
        if (isObject(res)) {
            return reactive(res);
        }
        // 依赖收集
        return res;
    };
}
function createSetter() {
    return function set(target, key, value, receiver) {
        // vue2不支持新增属性响应
        // 怎么判断 新增还是修改
        const oldValue = target[key]; // 如果是修改 肯定有老值
        // 看一下 有没有这个属性

        // 第一种 是数组新增的逻辑
        // 是数组 且key是数字 且key在少于数组长度的位置 就是有key 或者 字符串类型的key 判断有无
        const hadKey =
            isArray(target) && isInteger(key)
                ? Number(key) < target.length
                : hasOwn(target, key);
        // 第二种 对象的逻辑

        // Reflect设置不成功会返回false  会有返回值
        const result = Reflect.set(target, key, value, receiver);
        if (!hadKey) {
            console.log('新增属性');
            // 值变化才算
        } else if (hasChanged(value, oldValue)) {
            console.log('修改属性');
        }

        return result;
    }; // 设置属性值是会执行此方法
}
// 为了预置参数
const get = createGetter();
const set = createSetter();
export const mutableHandlers: Object = {
    // 获取对象中的属性会执行此方法
    get,
    set
};
