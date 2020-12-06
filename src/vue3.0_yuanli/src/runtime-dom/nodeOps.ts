/*
 * @description: 节点操作集合方法
 * @author: steve.deng
 * @Date: 2020-11-30 16:26:16
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-06 12:34:46
 */
export const nodeOps = {
    createElement(type) {
        return document.createElement(type);
    },
    setElementText(el, text) {
        el.textContent = text;
    },
    // anchor 参考物
    insert(child, parent, anchor = null) {
        parent.insertBefore(child, anchor); // appendCHILD
    },
    remove(child) {
        const parent = child.parentNode;
        if (parent) {
            parent.removeChild(child);
        }
    }
};
