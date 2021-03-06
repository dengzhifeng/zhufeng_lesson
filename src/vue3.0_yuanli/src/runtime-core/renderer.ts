import { effect } from '../reactivity/index';
import { ShapeFlags } from '../shared/index';
import { createAppAPI } from './apiCreateApp';
import { createComponentInstance, setupComponent } from './component';

/*
 * @description: 核心代码 和平台无关
 * @author: steve.deng
 * @Date: 2020-11-30 16:32:43
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-14 15:09:15
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
    const mountElement = (vnode, container, anchor) => {
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
        hostInsert(el, container, anchor);
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
                    hostPatchProp(el, key, prev, next);
                }
            }
            // 老的有的属性 新的没有 将老的删除
            for (const key in oldProps) {
                if (!(key in newProps)) {
                    hostPatchProp(el, key, oldProps[key], null);
                }
            }
        }
    };
    const patchKeyChildren = (c1, c2, el) => {
        // 内部有优化策略
        // abc
        // abde
        let i = 0;
        let e1 = c1.length - 1; //老儿子最后一项的索引
        let e2 = c2.length - 1; // 新儿子的最后一项索引

        while (i <= e1 && i <= e2) {
            const n1 = c1[i];
            const n2 = c2[i];
            if (isSameVnodeType(n1, n2)) {
                patch(n1, n2, el); // 会递归比对子元素
            } else {
                break;
            }
            i++; //2
        }
        console.log(i);
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1];
            const n2 = c2[e2];
            if (isSameVnodeType(n1, n2)) {
                patch(n1, n2, el);
            } else {
                break;
            }
            e1--;
            e2--;
        }
        // abc
        // eabc  第一次就跳出 i = 0
        // 如果是
        //  abc   2开始        1  0  -1
        // dabc   3           2  1  0
        console.log(i, e1, e2); // 0 -1 0

        // 只考虑元素新增和删除的情况
        // abc => abcd   (i=3, e1=2 e2=3)
        // abc => dabc   (i=0, e1=-1, e2=0)

        // 只要i > e1  标识新增属性
        if (i > e1) {
            // 说明有新增
            if (i <= e2) {
                // 表示有新增的部分
                // 先根据e2 取他的下一个元素和数组长度进行比较
                const nextPos = e2 + 1;
                const anchor = nextPos < c2.length ? c2[nextPos].el : null;
                while (i <= e2) {
                    patch(null, c2[i], el, anchor);
                    i++;
                }
            }
            // abcd -> abc (i=3 e1=3 e2=2);
        } else if (i > e2) {
            // 删除
            while (i <= e1) {
                hostRemove(c1[i].el);
                i++;
            }
        } else {
            // 无规律的情况 diff情况
            // ab[cde]fg    // i=2 e1=4 e2=5  s1=2
            // ab[edch]fg    // i=2  e2=5  s2=2   => [4,3,2,0] -> [5,4,3,0]
            const s1 = i;
            const s2 = i;

            // 新的索引和key做成一个映射表
            const keyToNewIndexMap = new Map();
            for (let i = s2; i <= e2; i++) {
                const nextChild = c2[i];
                keyToNewIndexMap.set(nextChild.key, i);
            }
            const toBePatched = e2 - s2 + 1; //4
            const newIndexToOldMapIndex = new Array(toBePatched).fill(0);
            // 只是做形同属性的diff  但是位置可能还不对
            for (let i = s1; i <= e1; i++) {
                const prevChild = c1[i];
                let newIndex = keyToNewIndexMap.get(prevChild.key); // 获取新的索引
                if (newIndex == undefined) {
                    hostRemove(prevChild.el); // 老的有 新的没有直接删除
                } else {
                    newIndexToOldMapIndex[newIndex - s2] = i + 1; // +1 防止一开始就是0 没变化
                    patch(prevChild, c2[newIndex], el);
                }
            }
            console.log(newIndexToOldMapIndex);
            for (let i = toBePatched - 1; i >= 0; i--) {
                const nextIndex = s2 + i; //[edch]  找到了h
                const nextChild = c2[nextIndex]; // 找到h
                let anchor =
                    nextIndex + 1 < c2.length ? c2[nextIndex + 1].el : null;
                if (newIndexToOldMapIndex[i] == 0) {
                    // 这是新元素 直接创建插入到当前原色的下一个即可
                    patch(null, nextChild, el, anchor);
                } else {
                    // 根据参照物 将节点移动过去 所有节点都要移动 非最优
                    hostInsert(nextChild.el, el, anchor);
                }
            }

            //ab [cde]
            //ab [dech]  [3,4,2,0] -> 递增序列 0 1索引
        }
    };
    const patchChildren = (n1, n2, el) => {
        const c1 = n1.children; // 获取所有老的节点
        const c2 = n2.children; // 获取新的所有节点
        const prevShapeFlag = n1.shapeFlag; // 上一次的元素的类型
        const shapeFlag = n2.shapeFlag; // 这一次的元素类型
        // 新的是文本元素
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            // 老的是文本 新的是文本  =》 新的覆盖掉老的
            // 老的是数组 新的是文本 =》 覆盖掉老的即可
            if (c2 !== c1) {
                hostSetElementText(el, c2);
            }
        } else {
            // 新的是数组

            // 新的是数组 老的是数组
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                // 老的是数组 新的是数组 =》 diff算法
                console.log('diff算法');
                patchKeyChildren(c1, c2, el);
            } else {
                // 老的是文本 新的是数组 =》 移除老的文本 生成新的节点塞进去
                if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
                    // 移除老的文本
                    hostSetElementText(el, '');
                }
                // 新的是数组
                if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                    // 把新的元素进行股灾 生成新的节点塞进去
                    for (let i = 0; i < c2.length; i++) {
                        patch(null, c2[i], el);
                    }
                }
            }
        }
        // 4种情况
        // 老的是文本 新的是文本  =》 新的覆盖掉老的
        // 老的是数组 新的是文本 =》 覆盖掉老的即可
        // 老的是文本 新的是数组 =》 移除老的文本 生成新的节点塞进去
        // 老的是数组 新的是数组 =》 diff算法
    };
    const patchElement = (n1, n2, container) => {
        // 如果n1和n2类型一样  复用n1的真实节点el
        let el = (n2.el = n1.el);
        const oldProps = n1.props || {};
        const newProps = n2.props || {};
        patchProps(oldProps, newProps, el); // 比对前后属性的元素差异

        patchChildren(n1, n2, el); // 比对孩子差异
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

    const processElement = (n1, n2, container, anchor) => {
        if (n1 == null) {
            mountElement(n2, container, anchor);
        } else {
            patchElement(n1, n2, container);
        }
    };

    const processComponent = (n1, n2, container, anchor) => {
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

    const patch = (n1, n2, container, anchor = null) => {
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
            processElement(n1, n2, container, anchor);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
            processComponent(n1, n2, container, anchor);
        }
    };

    return {
        createApp: createAppAPI(render)
    };
}
