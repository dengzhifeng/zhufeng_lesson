import applyMixin from "./mixin";
import { forEachValue } from "./util";

/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-08-22 21:07:41
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-22 21:56:14
 */
export let Vue;  // 容器初始化
export class store {
    constructor(options) {  // options 就是vuex.store({state, mutation, actions}) 的选项参数{state, mutation, actions}
        this.state = options.state;
        // 1.添加状态逻辑 数据在哪使用 就会收集对应的依赖
        // this._vm = new Vue({
        //     data: { // $开头的 默认不会将这个属性挂载在vm上
        //         $$state: state   // 会将$$state 对应的对象 通过defineProperty进行属性劫持
        //     }
        // })
        // 2.处理getters属性 具有缓存的 compute带有缓存
        const computed = {}
        this.getters = {}
        // 缓存对象
        // 把vue组件或页面的getter 定义的方法 写入到getters对象里面 方便取值
        // Object.keys(options.getters).forEach( key => {
        //     Object.defineProperty(this.getters, key, {
        //         get: () => options.getters[key](this.state)
        //     })
        // });
        forEachValue(options.getters, (fn,key) => {
            computed[key] = () => {
                return fn(this.state);
            }
            Object.defineProperty(this.getters, key, {
                get: () => this._vm[key]
            })
        });

        // 3.计算属性实现
        this._vm = new Vue({
            data: { // $开头的 默认不会将这个属性挂载在vm上
                $$state: state   // 会将$$state 对应的对象 通过defineProperty进行属性劫持
            },
            computed
        })

        // 实现mutation
        this.mutations = {};
        this.actions = {};
        forEachValue(options.mutations, (fn, key) => {
            this.mutations[key] = (payload) => fn(this.state, payload);
        });
        // 实现actions 
        forEachValue(options.mutations, (fn, key) => {
            this.actions[key] = (payload) => fn(this, payload);
        });
    }
    // 在严格模式下 
    commit = (type, payload) => {
        this.mutations[type](payload)
    }
    dispatch = (type, payload) => {
        this.actions[type](payload)
    }
    get state() { // 属性访问器  new Store().state 就会返回属性state
        return this._vm._data.$$state;
    }
}

// Vue.use方法 会调用插件的install方法 此方法中的参数 就是Vue的构造函数
// Vue.use = function(plugin) {
//    plugin.install(this)
//}
export const install = (_vue) => {  // 插件安装 Vue.use(vuex)
    Vue = _vue;
    applyMixin(Vue);
}