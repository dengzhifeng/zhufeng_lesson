/*
 * @description: gen co async await
 * @author: steve.deng
 * @Date: 2020-10-14 18:10:35
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-30 23:18:18
 */

const resolvePath = require('../utils');
// const Promise = require('./promise.js');
const fs = require('fs').promises;

function* read() {
    let content = yield fs.readFile(resolvePath('name.txt'), 'utf8');
    let age = yield fs.readFile(resolvePath(content), 'utf8');
    return age;
}
// 1 传入迭代器
// 2 返回时promise

function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let { value, done } = it.next(data);
            if (!done) {
                Promise.resolve(value).then(data => {
                    console.log('data--->', data);
                    next(data);
                }, reject);
            } else {
                console.log('data-true-->', data);
                resolve(value); // 将最终结果返回给当前的co promise
            }
        }
        next();
    });
}
//co  tj写的
// let co = require('co');
co(read()).then(data => {
    console.log(data);
});

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject('失败了');
        resolve('成功了');
    }, 1000);
    // throw new Error('错误了');
});

// Promise.resolve(p).then(data => {
//     console.log(data);
// });
