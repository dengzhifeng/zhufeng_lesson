/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-11 17:35:48
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-11 18:14:15
 */
const fs = require('fs'); // node的自带模块

function after(times, callback) {
    return function() {
        --times == 0 && callback();
    };
}
let obj = {};
// 异步串行
let fn = after(2, () => {
    console.log(obj);
});
// code runner 异步处理都是基于回调的， 异步不能处理try catch捕获异常，node中回调参数第一个就是err属性
fs.readFile('age.txt', 'utf8', function(err, data) {
    if (err) return console.log(err);
    obj.age = data;
    fn();
});
fs.readFile('name.txt', 'utf8', function(err, data) {
    obj.name = data;
    fn();
});
