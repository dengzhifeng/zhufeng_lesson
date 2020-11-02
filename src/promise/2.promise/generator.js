/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-22 11:25:33
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-29 18:14:01
 */

// function* foo(x) {
//     yield x + 1;
//     yield x + 2;
//     return x + 3;
// }

// let gen = foo(1);
// console.log(gen.next(5));
// console.log(gen.next());
// console.log(gen.next());

// for (var x of foo(1)) {
//     console.log(x); // 依次输出结果
// }

// function* myGenerator() {
//     console.log(yield '1'); //test1
//     console.log(yield '2'); //test2
//     console.log(yield '3'); //test3
// }

// // 获取迭代器
// const gen = myGenerator();

// gen.next();
// gen.next('test1');
// gen.next('test2');
// gen.next('test3');

// es6语法 generator  生成器函数
function* gen() {
    yield 1;
    return 2;
    // 碰到return 函数才会结束
}
// 生成的是迭代器对象 ->next -> {value: 100, done: true}
let it = gen();
// 有暂停效果 碰到yield就会暂停
console.log(it.next());
console.log(it.next());
console.log(it.next()); // dva koa1.0 -> async + await

// yield可以有返回值的

// 2) 返回值问题
function* gen() {
    let r1 = yield 1;
    console.log(r1);
    let r2 = yield 2;
    console.log(r2);
    return r2;
}
let it = gen();
console.log(it.next(1)); // 第一次传递的值是无效的
console.log(it.next(100)); // 当调用next方法时候传递的参数 会给上一次yield复制
console.log(it.next(200)); // 当调用next方法时候传递的参数 会给上一次yield复制
// console.log(it.next());
// console.log(it.next());

// 执行顺序
// 1、每次调用next 碰到yield就停止
// 2、碰到return 函数就执行完毕
// 3、当前调用next时传递参数永远给的是上一次yield的返回值

// 应用场景
const resolvePath = require('../utils');
let fs = require('fs');
let read = promisify(fs.readFile);
function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                // node 方法一般都有回调 故加这个回调
                if (err) reject(err);
                resolve(data);
            });
        });
    };
}

function* read2() {
    let content = yield read(resolvePath('name.txt'), 'utf-8');
    let age = yield read(resolvePath(content), 'utf-8');
    return age;
}

let it = read2();
let { value, done } = it.next();
value.then((data) => {
    let { value, done } = it.next(data);
    value.then((data) => {
        console.log(data);
        console.log(it.next(data));
    });
});
