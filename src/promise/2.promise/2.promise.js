/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-14 18:10:35
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-26 14:13:42
 */
const resolvePath = require('../utils');
const Promise = require('./promise.js');
const fs = require('fs');
const { resolve } = require('path');
function read(...args) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

let p1 = read(resolvePath('name.txt'), 'utf8');

// 判断返回值和promise的关系
// let promise2 = p1.then(
//     (data) => {
//         return new Promise((resolve, reject) => {
//             resolve('999');
//         });
//     },
//     (err) => {
//         return 200;
//     }
// );
// let promise2 = p1.then(
//     (data) => {
//         return new Promise((resolve, reject) => {
//             resolve(
//                 new Promise((resolve, reject) => {
//                     resolve(
//                         new Promise((resolve, reject) => {
//                             resolve(
//                                 new Promise((resolve, reject) => {
//                                     setTimeout(() => {
//                                         resolve('999');
//                                     }, 1000);
//                                 })
//                             );
//                         })
//                     );
//                 })
//             );
//         });
//     },
//     (err) => {
//         return 200;
//     }
// );

// 一个p1里面 resolve(p2) 会返回p2的resolve里面的值作为 p1的then的值
let promise2 = new Promise((resolve, reject) => {
    let p = new Promise((resolve, reject) => {
        resolve(
            new Promise((resolve, reject) => {
                resolve(
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve('999');
                        }, 1000);
                    })
                );
            })
        );
    });
    let a = Promise.resolve(p);
    console.log('a', a);
    p.then((data) => {
        // 999
        console.log(data);
    });
    resolve(p);
});
promise2.then((data) => {
    // 999
    console.log(data);
});

let promise2 = p1.then(
    (data) => {
        return new Promise((resolve, reject) => {
            resolve('999');
        });
    },
    (err) => {
        return 200;
    }
);
promise2.then(
    (data) => {
        console.log('promise2', data);
    },
    (err) => {
        console.log('err', err);
    }
);
