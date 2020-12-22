/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 07:19:31
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-22 08:33:00
 */

export let _Vue;

// 直接使用传入的vue  不需要引入了 版本也保持一直
export function install(Vue, options) {
    _Vue = Vue;
    console.log(Vue, options);

    //我需要将当前的根实例的提供的router属性 共享给所有子组件

    // 所有子组件
}
