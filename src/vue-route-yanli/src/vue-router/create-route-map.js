import router from '../router';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 16:14:14
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-23 07:38:06
 */
export function createRouteMap(routes, oldPathMap) {
    // 一个参数时 初始化  2个参数就是动态添加路由
    let pathMap = oldPathMap || {};
    // routes
    routes.forEach(route => {
        addRouteRecord(route, pathMap, null);
    });

    return {
        pathMap
    };
}

function addRouteRecord(route, pathMap, parent) {
    // 要判断儿子的路径不是以
    let path = parent ? parent.path + '/' + route.path : route.path;
    let record = {
        parent, // 指代父亲记录
        path: path,
        component: route.component,
        name: route.props,
        params: route.params || {},
        meta: route.meta
    };

    if (!pathMap[path]) {
        pathMap[path] = record;
    }

    if (route.children) {
        // 没有孩子就停止遍历
        route.children.forEach(childRoute => {
            addRouteRecord(childRoute, pathMap, record);
        });
    }
}
