import { effect } from '../reactivity/index';
import { ShapeFlags } from '../shared/index';
import { createAppAPI } from './apiCreateApp';
import { createComponentInstance, setupComponent } from './component';

/*
 * @description: 核心代码 和平台无关
 * @author: steve.deng
 * @Date: 2020-11-30 16:32:43
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-04 23:38:48
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
    const {
        createElement: hostCreateElement,
        patchProp: hostPatchProp,
        setElementText: hostSetElementText,
        insert: hostInsert,
        remove: hostRemove
    } = options;
    const mountElement = (vnode, container) => {
        // vnode虚拟节点 container就是容器
        console.log(vnode, container);
        let { shapeFlag, props } = vnode;
        let el = (vnode.el = hostCreateElement(vnode.type));

        // 创建儿子节点 看是不是文本孩子
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(el, vnode.children);
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(vnode.children, el);
        }
        if (props) {
            for (let key in props) {
                hostPatchProp(el, key, null, props[key]);
            }
        }
        hostInsert(el, container);
    };
    const mountChildren = (children, container) => {
        for (let i = 0; i < children.length; i++) {
            patch(null, children[i], container);
        }
    };
    const patchProps = (oldProps, newProps, el) => {
        if (oldProps !== newProps) {
            // 新的属性 需要覆盖老的
            for (let key in newProps) {
                const prev = oldProps[key];
                const next = newProps[key];
                if (prev !== next) {
                    hostPatchProp(el, key);
                }
            }
            // 老的有的属性 新的没有 将老的删除
        }
    };
    const patchElement = (n1, n2, container) => {
        // 如果n1和n2类型一样  复用n1的真实节点el
        let el = (n2.el = n1.el);
        const oldProps = n1.props || {};
        const newProps = n2.props || {};
        patchProps(oldProps, newProps, el);
    };
    const mountComponent = (initialVnode, container) => {
        // 组件挂载逻辑 1.创建组件的实例  2.找到组件的render方法  3.执行render
        // 组件实例要记录当前组件的状态
        const instance = (initialVnode.component = createComponentInstance(
            initialVnode
        ));
        setupComponent(instance); // 找到组件的setup方法
        // 调用render方法 如果render方法中数据变化了 会重新渲染
        setupRenderEffect(instance, initialVnode, container); // 给组件创建一个effect 用于渲染 相当于watch
    };

    const setupRenderEffect = (instance, initialVnode, container) => {
        effect(function componentEffect() {
            if (!instance.isMounted) {
                // 渲染组件中的内容
                const subTree = (instance.subTree = instance.render()); // 组件对应渲染的结果
                patch(null, subTree, container);
                instance.isMounted = true;
            } else {
                // 更新逻辑
                let prev = instance.subTree; // 上一次的渲染vnode结果
                let next = instance.render(); // 下一次的
                console.log(prev, next);
                patch(prev, next, container);
            }
        });
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
    const isSameVnodeType = (n1, n2) => {
        return n1.type == n2.type && n1.key === n2.key;
    };

    const patch = (n1, n2, container) => {
        // 20 代表组件孩子里有数组
        // 10100
        // 00100
        // 00100
        let { shapeFlag } = n2;
        console.log(n1, n2);
        // 如果不相同类型节点
        if (n1 && !isSameVnodeType(n1, n2)) {
            // 删除老节点 老节点虚拟节点对应着真实节点
            hostRemove(n1.el); // removeChild
            n1 = null;
        }

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
