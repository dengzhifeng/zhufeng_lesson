import { createVNode } from './vnode';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-30 17:26:04
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-01 16:24:16
 */
export function createAppAPI(render) {
    return (rootComponent) => {
        const app = {
            mount(container) {
                const vnode = createVNode(rootComponent);
                // 用户调用的mount方法
                render(vnode, container);
            }
        };
        return app;
    };
}
