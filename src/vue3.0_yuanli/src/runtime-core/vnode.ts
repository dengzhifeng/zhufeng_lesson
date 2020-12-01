import { isArray, isObject, isString, ShapeFlags } from '../shared/index';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-01 12:01:08
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-01 17:37:26
 */
export function createVNode(type, props: any = {}, children = null) {
    const shapeFlag = isString(type)
        ? ShapeFlags.ELEMENT // 1
        : isObject(type)
        ? ShapeFlags.STATEFUL_COMPONENT // 4 状态组件
        : 0;
    // 虚拟节点可以表示dom结构 可以表示组件
    const vnode = {
        type,
        props,
        children,
        component: null, // 组件的实例
        el: null, // 虚拟节点和真实节点做一个映射关系
        key: props.key,
        shapeFlag // vue3里面优秀做法 标识虚拟节点的类型 元素 组件
    };
    if (isArray(children)) {
        // 或运算
        // 1 | 16  -》 17
        // 000001
        // 001000
        // 001001 等于17
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN; // 如果在或的过程中有一个是1就是1 把2个数相加
    } else {
        // 1 | 8 = 9
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;

        // 比如 STATEFUL_COMPONENT + ARRAY_CHILDREN = 20
        // 4 | 16 = 20
        // 0000100
        // 0001000
        // 0001100
    }
    return vnode;
}
