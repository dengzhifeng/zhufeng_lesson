/*
 * @description: 函数promisify化
 * @author: steve.deng
 * @Date: 2020-10-28 17:42:27
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-28 17:51:13
 */
let fs = require('fs');
// promise化 把异步的node中的api转化为promise方法， 只针对node方法
const resolvePath = require('../utils');
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

let read = promisify(fs.readFile);

read(resolvePath('name.txt'), 'utf8').then((data) => {
    console.log(data);
});
