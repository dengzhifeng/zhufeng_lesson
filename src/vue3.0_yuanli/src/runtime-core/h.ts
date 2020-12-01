import { createVNode } from './vnode';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-01 12:08:47
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-01 12:25:08
 */
export function h(type, props = {}, children = null) {
    return createVNode(type, props, children);
}
