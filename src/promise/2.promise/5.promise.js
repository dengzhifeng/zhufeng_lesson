/*
 * @description: promise.all
 * @author: steve.deng
 * @Date: 2020-10-19 14:27:38
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-19 18:26:31
 */
const resolvePath = require('../utils');
const { reject } = require('./promise');
let fs = require('fs').promises;
let getName = fs.readFile(resolvePath('./name.txt'), 'utf8');
let getAge = fs.readFile(resolvePath('./age.txt'), 'utf8');

function isPromise(val) {
    return typeof val.then == 'function';
}
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let times = 0;
        function processData(index, val) {
            result[index] = val;
            // 每次加1做处理次数  等于传入的promises数组长度时 就完成了 resolve就行了
            if (++times === promises.length) {
                resolve(result);
            }
        }
        for (let i = 0; i < promises.length; i++) {
            let p = promises[i];
            if (isPromise(p)) {
                p.then((data) => {
                    processData(i, data); // 普通值
                }, reject); // reject处理后 返回的promise就可以catch了
            } else {
                processData(i, p); // 普通值
            }
        }
    });
};
// Promise.all方法返回一个promise
Promise.all([1, getName, getAge, 2]).then((data) => {
    console.log(data);
});

// Promise.prototype.finally 最终的 不是try catch finally

Promise.resolve(123)
    .finally((data) => {
        // 不觉得成功还是失败
        // 这里传入的函数 无论如何都会执行
        console.log('finally', data);
        // finally可以返回一个promise
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('ok');
            }, 1000);
        });
    })
    .then(
        (data) => {
            console.log('suc:', data);
        },
        (err) => {
            console.log('err:', err);
        }
    );
