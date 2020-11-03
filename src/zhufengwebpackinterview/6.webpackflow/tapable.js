/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-09-07 11:50:33
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-09-21 14:59:29
 */
/**
 * button.addEventListener('click',()=>{console.log('click')});
 * button.trigger('click');
 */
let {SyncHook} = require('tapable');
// class SyncHook{
//     constructor(){
//         this.taps = []
//     }
//     tap(name,fn){
// this.taps.push(fn);
//     }
//     call(){
// this.taps.forEach(tap=>tap());
//     }
// }
let hook = new SyncHook();
//hook.addEventListener();
hook.tap('some name1',()=>{
    console.log("some name1");
});
hook.tap('some name2',()=>{
    console.log("some name2");
});
hook.tap('some name3',()=>{
    console.log("some name3");
});
hook.call();
/* 
function add(){}
add.call(); */
//webpack-dev-server memory-fs