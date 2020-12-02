/*
 * @description: 平台的dom级别的渲染逻辑
 * @author: steve.deng
 * @Date: 2020-11-30 16:19:39
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-02 11:22:36
 */

import { createRenderer } from '../runtime-core/index';
import { nodeOps } from './nodeOps';
import { patchProp } from './patchProp';

const renderOptions = { patchProp, ...nodeOps }; // dom操作方法
// 创建渲染器
function ensureRenderer() {
    return createRenderer(renderOptions);
}
export function createApp(rootComponent) {
    // 1.根据组件 创几个渲染器
    console.log(rootComponent);
    const app = ensureRenderer().createApp(rootComponent);
    const { mount } = app;
    // 重写了mount
    app.mount = function (container) {
        container = document.querySelector(container);
        // 1.挂载时需要将容器清空 再进行挂载
        container.innerHTML = '';
        mount(container);
    };
    return app;
}

// reactive
