/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-22 11:25:33
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-23 17:04:36
 */

function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}

let gen = foo(1);
console.log(gen.next(5));
console.log(gen.next());
console.log(gen.next());

for (var x of foo(1)) {
    console.log(x); // 依次输出结果
}

function* myGenerator() {
    console.log(yield '1'); //test1
    console.log(yield '2'); //test2
    console.log(yield '3'); //test3
}

// 获取迭代器
const gen = myGenerator();

gen.next();
gen.next('test1');
gen.next('test2');
gen.next('test3');
