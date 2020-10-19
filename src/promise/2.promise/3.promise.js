/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-14 18:10:35
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-19 11:35:36
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

const p = new Promise((resolve, reject) => {
    resolve('ok');
});
// 功能1-- p.then空传参也可以resolve的值透传下去
p.then()
    .then()
    .then((data) => {
        console.log(data);
    });

// 原理：then无传参就默认添加 能透传下去
// p.then((data) => {
//     return data;
// }).then((data) => {
//     console.log(data);
// });

// 功能2-- p.then空传参也可以reject的值透传下去
const p2 = new Promise((resolve, reject) => {
    reject('err');
});
// 功能-- p.then空传参也可以resolve的值透传下去
p2.then()
    .then()
    .then(null, (data) => {
        console.log(data);
    });
