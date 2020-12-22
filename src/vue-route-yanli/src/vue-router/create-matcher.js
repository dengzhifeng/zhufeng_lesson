/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 15:56:37
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-22 16:26:19
 */
import { createRouteMap } from './create-route-map';
export function createMatcher(routes) {
    // {/:home, /about: about}
    let { pathMap } = createRouteMap(routes); // 根据用户的配置创建一个映射表
    console.log(pathMap);
    // 动态添加路由权限
    function addRoutes(routes) {
        createRouteMap(routes, pathMap);
    }
    function match(path) {
        // 给我个路径 可以匹配路由
    }
    return {
        addRoutes,
        match
    };
}
