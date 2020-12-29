/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 07:19:31
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-25 15:24:27
 */
import RouterLink from './components/router-link';
import RouterView from './components/router-view';
export let _Vue;

// 直接使用传入的vue  不需要引入了 版本也保持一直
export function install(Vue, options) {
    _Vue = Vue;

    //我需要将当前的根实例的提供的router属性 共享给所有子组件 Vue.prototype不好 会影响了全局的Vue实例 改用mixin
    debugger;
    console.log('this', this);
    // 所有子组件初始化的时候 都会去调用Vue.extend Vue.options
    Vue.mixin({
        beforeCreate() {
            // 获取到每个人的实例 给实例添加属性
            console.log(this.$options);
            // 共用顶层this
            if (this.$options.router) {
                this._routerRoot = this; // 把根实例挂载到_routerRoot上
                this._router = this.$options.router;
                this._router.init(this);
                // 响应式数据 global api定义了这个方法
                Vue.util.defineReactive(
                    this,
                    '_route',
                    this._router.history.current
                );

                console.log('this._route', this._route);
                // this._router 路由实例
            } else {
                // this._routerRoot 指向当前根组件实例
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }
            // 根 -》 父亲- > 儿子 -》 孙子
        }
    });

    // 代理
    console.log('this', this);
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            console.log('this Vue.prototype', this);
            return this._routerRoot._route; // current对象 里面放的属性 path matched   _route放属性
        }
    });

    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            // router.history.push();
            return this._routerRoot._router; // addRoute match  router放方法
        }
    });
    Vue.component('router-link', RouterLink);
    Vue.component('router-view', RouterView);
}
