/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 17:48:02
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-22 18:14:40
 */
export default class History {
    constructor(router) {
        this.router = router;
    }
    // 跳转处理
    transitionTo(location, cb) {
        // 默认先执行一次
        console.log(location);

        // 监听hash变化
        cb && cb(); // cb调用后 hash值变化 再次调用transitionTo
    }
}
