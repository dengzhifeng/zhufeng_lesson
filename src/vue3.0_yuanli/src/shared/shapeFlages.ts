/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-01 12:30:44
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-01 17:35:54
 */
export const enum ShapeFlags {
    ELEMENT = 1,
    FUNCTIONAL_COMPONENT = 1 << 1, // 函数组件 2  2的1次方    00001 左移1位 后是00010 等于10进制的2
    STATEFUL_COMPONENT = 1 << 2, // 状态组件4  2的2次方     000100
    TEXT_CHILDREN = 1 << 3, // 文本孩子 8  2的3次方
    ARRAY_CHILDREN = 1 << 4 // 数组孩子 16  2的4次方
}
