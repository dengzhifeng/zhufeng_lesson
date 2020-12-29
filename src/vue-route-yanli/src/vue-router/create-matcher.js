/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 15:56:37
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-24 17:26:11
 */
import { createRouteMap } from './create-route-map';
import { createRoute } from './history/base';
export function createMatcher(routes) {
    // pathMap={/:{组件1}, /about: {组件2}}
    let { pathMap } = createRouteMap(routes); // 根据用户的配置创建一个映射表
    console.log('pathMap', pathMap);

    // 动态添加路由权限
    function addRoutes(routes) {
        createRouteMap(routes, pathMap);
    }
    // 根据path获取record  再用record分析获得包含父级的组件    比如/about/a  返回/about  /about/a
    function match(path) {
        let record = pathMap[path];
        // record就是某个组件
        console.log(record);

        return createRoute(record, {
            // {path: / , matched: [{},{}]}
            path
        });
    }
    return {
        addRoutes,
        match
    };
}
