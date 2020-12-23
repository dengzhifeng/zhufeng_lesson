/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 17:48:02
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-23 18:11:14
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

function runQueue(queue, iterator, cb) {
    function next(index) {
        if (index >= queue.length) {
            return cb(); // 一个都没有 或者钩子执行完毕 调用cb完成渲染
        } else {
            let hook = queue[index];
            iterator(hook, () => {
                next(++index);
            });
        }
    }
    next(0);
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
    transitionTo(location, onComplete) {
        // 默认先执行一次

        // 根据跳转的路径 获取匹配记录
        let route = this.router.match(location); // route = {path: '/about/a', matched: [{},{}]}
        let queue = [].concat(this.router.beforeEachHooks);
        const iterator = (hook, cb) => {
            hook(route, this.current, cb);
        };

        runQueue(queue, iterator, () => {
            console.log('queue', queue);
            this.current = route; // current变量引用地址变了
            this.cb && this.cb(route); // 路由变了 触发更新
            // 监听hash变化
            onComplete && onComplete(); // onComplete调用后 hash值变化 再次调用transitionTo
        });
    }
    listen(cb) {
        this.cb = cb;
    }
}
