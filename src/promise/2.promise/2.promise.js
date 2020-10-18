/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-14 18:10:35
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-16 17:59:23
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
