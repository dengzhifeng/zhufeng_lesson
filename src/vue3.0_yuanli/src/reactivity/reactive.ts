/*
 * @description:  定义代理
 * @author: steve.deng
 * @Date: 2020-11-27 16:04:04
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-27 16:39:41
 */

import { isObject } from '../shared/index';
import { mutableHandlers } from './baseHandlers';

export function reactive(target: object) {
    // 将目标变成响应式对象, Proxy
    // 核心的操作是当读取文件时做依赖收集，当数据变化时重新执行effect
    return createReactiveObject(target, mutableHandlers);
}
// map映射表 key可以是对象  不会内存泄漏
const proxyMap = new WeakMap(); // TODO 知识点
function createReactiveObject(target, baseHandlers) {
    // 非对象就不代理了
    if (!isObject(target)) {
        return target;
    }
    // 检查下有无代理过 有就直接返回代理
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
        return existingProxy;
    }
    // target的set get操作留给hander操作
    // 不需要递归， 不会重写对象中的属性
    const proxy = new Proxy(target, baseHandlers);
    proxyMap.set(target, proxy); // 将代理的对象和代理后的结果做一个映射表
    return proxy;
}
