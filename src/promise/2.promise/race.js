/*
 * @description: Promise.race赛跑 谁是第一个完成 就用他成功的结果 如果失败就失败
 * @author: steve.deng
 * @Date: 2020-10-28 17:42:27
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-28 18:13:29
 */
let fs = require('fs');
// promise化 把异步的node中的api转化为promise方法， 只针对node方法
const resolvePath = require('../utils');
const Promise = require('./promise.js');
const isPromise = (promise) => {
    return typeof promise.then === 'function';
};

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject('失败了');
        resolve('成功了1');
    }, 1000);
    // throw new Error('错误了');
});
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject('失败了');
        resolve('成功了2');
    }, 1200);
    // throw new Error('错误了');
});

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            let current = promises[i];
            if (isPromise(current)) {
                current.then(resolve, reject);
            } else {
                resolve(current);
            }
        }
    });
};
// Promise.all方法返回一个promise
Promise.race([p2, p1]).then((data) => {
    console.log(data); // 成功了1
});
