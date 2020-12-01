import { ShapeFlags } from '../shared/index';
import { createAppAPI } from './apiCreateApp';
import { createComponentInstance, setupComponent } from './component';

/*
 * @description: 核心代码 和平台无关
 * @author: steve.deng
 * @Date: 2020-11-30 16:32:43
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-01 18:13:02
 */
export function createRenderer(options) {
    // options是平台传过来的dom方法， 不同平台实现不同操作逻辑 如小程序 浏览器等
    return baseCreateRenderer(options);
}

function baseCreateRenderer(options) {
    const render = (vnode, container) => {
        // 我需要将虚拟节点 变成真实节点 挂载到容器上
        patch(null, vnode, container);
    };

    const mountElement = (n2, container) => {};
    const patchElement = (n1, n2, container) => {};
    const mountComponent = (initialVnode, container) => {
        // 组件挂载逻辑 1.创建组件的实例  2.找到组件的render方法  3.执行render
        // 组件实例要记录当前组件的状态
        const instance = (initialVnode.component = createComponentInstance(
            initialVnode
        ));
        setupComponent(instance); // 找到组件的setup方法
        // 调用render方法
    };
    const updateComponent = (n1, n2, container) => {};

    const processElement = (n1, n2, container) => {
        if (n1 == null) {
            mountElement(n2, container);
        } else {
            patchElement(n1, n2, container);
        }
    };

    const processComponent = (n1, n2, container) => {
        if (n1 == null) {
            // 根节点 mount 组件初始化
            mountComponent(n2, container);
        } else {
            // 更新组件
            updateComponent(n1, n2, container);
        }
    };
    const patch = (n1, n2, container) => {
        // 20 代表组件孩子里有数组
        // 10100
        // 00100
        // 00100
        let { shapeFlag } = n2;
        // 与运算 左右 都是1 才是1
        if (shapeFlag & ShapeFlags.ELEMENT) {
            processElement(n1, n2, container);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
            processComponent(n1, n2, container);
        }
    };

    return {
        createApp: createAppAPI(render)
    };
}
