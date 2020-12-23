/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-23 11:36:06
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-23 15:22:44
 */
export default {
    functional: true, // 函数式组件，节省性能 缺陷没有实例     class组件 Vue.extend
    name: 'router-view',
    render(h, { data, parent }) {
        let route = parent.$route; // 会做依赖收集
        console.log('route.matched');
        console.log(route.matched);
        data.routerView = true; // 渲染router-view时标记他为一个router-view

        let records = route.matched;
        let depth = 0;
        while (parent) {
            //_vnode
            // 有父亲节点就 depth++  防止永远渲染0层
            if (parent.$vnode && parent.$vnode.data.routerView) {
                console.log(parent);
                depth++;
            }
            // 循环终止条件
            parent = parent.$parent;
        }
        let record = records[depth];
        if (!record) {
            return h();
        }
        return h(record.component, data);
    }
};

//页面中有2个router-view  app里  、 about里面的
