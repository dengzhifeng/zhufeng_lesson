/*
 * @description: async await
 * @author: steve.deng
 * @Date: 2020-10-14 18:10:35
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-08 21:47:09
 */

const resolvePath = require('../utils');
// const Promise = require('./promise.js');
const fs = require('fs').promises;

// ES7语法
async function read() {
    let content = await fs.readFile(resolvePath('name.txt'), 'utf8');
    let age = await fs.readFile(resolvePath(content), 'utf8');
    let c = await 123;
    console.log(c);
    return age;
}

// async + await(语法糖) = generator + co

// async返回的就是一个promise  await后面跟的内容会被包装成一个promise
read().then(data => {
    console.log(data);
});

let fn1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });
};
let fn2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        }, 2000);
    });
};
let fn3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 3000);
    });
};

async function readAll() {
    console.time('timer');
    let r = await Promise.all([fn1(), fn2(), fn3()]);
    console.timeEnd('timer');
    return r;
}
readAll().then(data => {
    console.log(data);
});

let c = function() {
    console.log(111);
};
async function a() {
    // console.log(111);
    return Promise.resolve(console.log(111));
    // return new Promise((resolve, reject) => {
    //     resolve(c());
    // });
}
async function testAsync() {
    // setTimeout(() => {
    //     console.log('2');
    // }, 0);
    // let b = await console.log('1');
    let b = await a();
    console.log(b);
}
testAsync();
