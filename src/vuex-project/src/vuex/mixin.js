/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-08-22 21:08:42
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-22 21:12:40
 */
export default function applyMixin(vue) {
    Vue.minxin({
        breforeCreate: vuexInit,
    })
}
function vuexInit() {
    const options = this.$options;
    if (options.store) {
        this.$store = options.store;
    } else {
        this.$store = this.parent.$store;
    }
}