/*
 * @description: 高阶函数
 * @author: steve.deng
 * @Date: 2020-09-06 13:46:38
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-27 10:59:12
 */
// 高阶函数 2个特点满足一个就是高阶函数
// 1）我们给一个函数传入一个函数
// 2) 一个函数返回一个函数

// 装饰器模式 （对原本功能进行包装） 切片编程
function core(a, b, c, d) {
    console.log('core...', a, b, c, d);
}

// 每个实例都有一个原型对象， core的原型对象是他的构造函数的原型prototype 即Function.prototype
// core的构造函数即Function 它所有实例都有一个__proto__属性 core.__proto__能找到before  即core.__proto__ === Function.prototype
Function.prototype.before = function (beforeFn) {
    // this 指向 core
    console.log(this);
    /// (...args) 剩余运算符 把参数转为数组args
    return (...args) => {
        // 不能是普通函数 this会指向调用者环境 箭头函数中没有this 没有arguments 没有prototype  这些属性都会向上查找
        beforeFn();
        // ...解构运算符 把数组解构为一个个参数
        this(...args); // 指向core()
    };
};

Function.prototype.after = function (afterFn) {
    // this 指向 core
    console.log(this);
    return () => {
        // 不能是普通函数 this会指向调用者环境 箭头函数中没有this 没有arguments 没有prototype  这些属性都会向上查找
        this(); // 指向core()
        afterFn();
    };
};

let newFn = core.before(() => {
    console.log('core before');
});

let afterFn = core.after(() => {
    console.log('core after');
});

newFn(1, 2, 3, 4);
// afterFn();

// 闭包 1）定义的函数作用域和调用的作用域不是同一个
