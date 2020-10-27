/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-14 18:10:35
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-26 15:00:21
 */
// 解决
// 异步开发问题(Promise.all)
// 链式调用问题
// 错误处理异常问题catch

const resolvePath = require('../utils');
const Promise = require('./promise.js');
const fs = require('fs');
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject('失败了');
        resolve('成功了');
    }, 1000);
    // throw new Error('错误了');
});

//  订阅起来
p.then(
    (data) => {
        console.log('success', data);
    },
    (reason) => {
        console.log('fail', reason);
    }
);

// promise链式调用
// 1. 如果then方法中 返回不是一个promise,
// 会将这个值传递给外层下次then的成功结果
// 2. 如果执行then方法中的方法出错了 抛出异常 走到下一个then的失败中
// 3. 如果返回的是一个promise, 结果会作为下一次then的成功或者失败
function read(...args) {
    return new Promise((resolve, reject) => {
        fs.readFile(...args, function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
}
// 1.出错会失败  2.返回的promise会出错
// catch 就是then的别名 没有成功只有失败（找最近的有限处理，处理不了的找下一层）
// then方法为什么可以链式调用， 每次调用then都是返回一个新的promise
read(resolvePath('name.txt'), 'utf8')
    .then(
        (data) => {
            throw new Error('error了');
            // return 100;
        },
        (err) => {
            console.log('1then err', err);
            // throw new Error(err);
        }
    )
    .then(
        (data) => {
            console.log('2then', data);
        }
        // (err) => {
        //     console.log('2then err', err);
        // }
    )
    .then(null, (err) => {
        console.log('catch', err);
        return 2;
    })
    .then((data) => {
        console.log('last then', data);
    });

// function read(...args) {
//     //defer减少了 new Promise 套用 应该是模仿$.defer()等
//     let dfd = Promise.defer();
//     fs.readFile(...args, function (err, data) {
//         if (err) return dfd.reject(err);
//         dfd.resolve(data);
//     });
//     return dfd.promise;
// }

// let p1 = read(resolvePath('name.txt'), 'utf8');

// let promise2 = p1.then(
//     (data) => {
//         return data;
//     },
//     (err) => {
//         return 200;
//     }
// );

// promise2.then(
//     (data) => {
//         console.log('promise2', data);
//     },
//     (err) => {
//         console.log('err', err);
//     }
// );

// // static方法实现以下Promise.resolve
// let pp = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(222);
//     }, 1000);
// });
// // Promise.resolve可以等待一个promise执行完毕
// // Promise.resolve(pp).then((data) => {
// //     console.log(data);
// // });
// // Promise.reject不等待
// Promise.reject(pp).catch((err) => {
//     console.log('err', err);
// });
