import { isFunction } from '../shared/index';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-01 16:54:04
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-01 18:10:44
 */
export function createComponentInstance(vnode) {
    const instance = {
        type: vnode.type,
        props: {},
        vnode,
        render: null,
        setupState: null,
        isMounted: false // 组件默认没有挂载
    };
    return instance;
}

export const setupComponent = (instance) => {
    // 1 源码中会对属性进行初始化

    // 2 会对插槽进行初始化

    // 3.调用setup方法
    setupStatefulComponent(instance);
};

function setupStatefulComponent(instance) {
    //component  组件整个对象
    const Component = instance.type; // 组件的虚拟节点
    const { setup } = Component;
    if (setup) {
        const setUpResult = setup(); // 获取setup返回值
        // 判断返回值类型 可能是state对象 或者render函数
        handleSetupResult(instance, setUpResult);
    }
}

function handleSetupResult(instance, setUpResult) {
    if (isFunction(setUpResult)) {
        instance.render = setUpResult;
    } else {
        instance.setupState = setUpResult;
    }
    finishComponetSetup(instance);
}

function finishComponetSetup(instance) {
    const Component = instance.type;
    if (Component.render) {
        instance.render = Component.render; // 默认render属性的优先级 高于setup返回的render
    } else if (!instance.render) {
        // compile(Component.template) // 编译成render函数
    }

    // vue3是兼容vue2属性的 data component watch
    // applyOptions() vue2 和vue3中的setup返回的结果做合并操作
}
