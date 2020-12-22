/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 07:19:31
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-22 15:43:03
 */

export let _Vue;

// 直接使用传入的vue  不需要引入了 版本也保持一直
export function install(Vue, options) {
    _Vue = Vue;
    console.log(Vue, options);

    //我需要将当前的根实例的提供的router属性 共享给所有子组件 Vue.prototype不好 会影响了全局的Vue实例 改用mixin

    // 所有子组件初始化的时候 都会去调用Vue.extend Vue.options
    Vue.mixin({
        beforeCreate() {
            // 获取到每个人的实例 给实例添加属性
            console.log(this.$options);
            // 共用顶层this
            if (this.$options.router) {
                this._rooterRoot = this; // 把根实例挂载到_rooterRoot上
                this._router = this.$options.router;
                console.log('根');
                console.log(this._router.init);
                // this._router 路由实例
                this._router.init(this);
            } else {
                // this._rooterRoot 指向当前根组件实例
                this._rooterRoot = this.$parent && this.$parent._rooterRoot;
                console.log('孙子');
            }
            // 根 -》 父亲- > 儿子 -》 孙子
        }
    });
}
