/*
 * @description: 函数柯里化 通用的柯里化函数
 * @author: steve.deng
 * @Date: 2020-09-15 22:58:55
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-27 11:18:59
 */

// 柯里化也是一个高阶函数

// 1.typeof (他是什么类型，不能区分对象)
// 2.constructor(判断构造函数)
// 3.instanceof
// 4.Object.prototype.toString.call

// 判断元素的类型
// 第一版 缺点 要用户输入判断的类型 容易出错 不灵活方便
function isType(str, type) {
    console.log(Object.prototype.toString.call(str));
    return Object.prototype.toString.call(str) == `[object ${type}]`;
}
// console.log(isType('hello','String'));
// console.log(isType(111,'Number'));

// 优化后 第二版
// 让方法更具体一些 isNumber isString 不用写类型了 直接按类型函数调用
function isType2(type) {
    return function (value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`;
    };
}
let utils = {};
['String', 'Number', 'Boolean', 'Object'].forEach((method) => {
    utils[`is` + method] = isType2(method);
});

console.log(utils.isString(112));
console.log(utils.isNumber(112));
console.log(utils.isBoolean(111));

// 柯理化函数
function sum(a, b, c, d, e) {
    return a + b + c + d + e;
}
// arr就是我们要收集每次调用时传入的参数
const curring = (fn, arr = []) => {
    let len = fn.length; // 函数的长度就是sum函数参数个数
    return function (...args) {
        let newArgs = [...arr, ...args];
        if (newArgs.length == len) {
            return fn(...newArgs);
        } else {
            return curring(fn, newArgs);
        }
    };
};
let newSum = curring(sum);
// 柯理化函数 每次入参都是一个参数
let a = newSum(1)(2)(3)(4)(5);
console.log(a); // 15
// 偏函数
let b = newSum(1, 2)(3)(5, 4);
console.log(b); // 15
