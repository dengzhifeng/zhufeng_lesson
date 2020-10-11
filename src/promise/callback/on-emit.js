/*
 * @description:订阅发布模式
 * @author: steve.deng
 * @Date: 2020-10-11 18:22:47
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-11 22:25:49
 */
const fs = require('fs'); // node的自带模块

let eventObj = {
    arr: [], // 中介存放订阅的事件
    on(fn) {
        // 订阅
        this.arr.push(fn);
    },
    emit() {
        // 发布
        this.arr.forEach(fn => {
            fn();
        });
    }
};
let obj = {};
fs.readFile('age.txt', 'utf8', function(err, data) {
    if (err) return console.log(err);
    obj.age = data;
    eventObj.emit();
});
fs.readFile('name.txt', 'utf8', function(err, data) {
    obj.name = data;
    eventObj.emit();
});

eventObj.on(() => {
    if (Object.keys(obj).length == 2) {
        console.log(obj);
    }
    console.log('当前数据读取了');
});
// eventObj.on(() => {
//     console.log('feadFile成功了');
// });
