/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-14 18:10:35
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-14 18:49:11
 */
// 解决
// 异步开发问题(Promise.all)
// 链式调用问题
// 错误处理异常问题catch

const Promise = require('./promise.js');

let p = new Promise((resolve, reject) => {
    resolve('成功了');
    // reject('失败了');
    // throw new Error('错误了');
});

p.then(
    (data) => {
        console.log('success', data);
    },
    (reason) => {
        console.log('fail', reason);
    }
);
