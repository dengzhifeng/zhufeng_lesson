/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 17:48:02
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-23 07:31:14
 */
export function createRoute(record, location) {
    let res = [];
    // /about  /about/a
    if (record) {
        while (record) {
            res.unshift(record);
            record = record.parent;
        }
    }
    return {
        ...location,
        matched: res
    };
}
export default class History {
    constructor(router) {
        this.router = router;
        // 最终核心 是将current属性变成响应式 后续根据current更新视图

        // /about/a   =>  /about /about/a
        this.current = createRoute(null, {
            // this.current = {path: '/', matched: []}
            path: '/'
        });
    }
    // 跳转处理  路径变化 组件渲染 数据变化 更新视图
    transitionTo(location, cb) {
        // 默认先执行一次
        console.log(location);

        // 根据跳转的路径 获取匹配记录
        let route = this.router.match(location); // route = {path: '/about/a', matched: [{},{}]}
        console.log(route);
        debugger;
        // 监听hash变化
        cb && cb(); // cb调用后 hash值变化 再次调用transitionTo
    }
}
