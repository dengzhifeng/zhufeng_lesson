/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-12 21:04:15
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-12 21:11:56
 */
// 函数主要关心返回值和参数
function sum1(a: string, b: string): string {
    return a + b;
}
sum1('a', 'b');

// 通过表达式来定义
const sum2 = (a: number, b: number): number => a + b;
type Sum = ((aa: number, bb: number) => number) | string;

// interface 可以继承 可以被类实现
// type仅仅是一个别名, 一般定义联和类型, 定义临时变量时可以使用

sum2(1, 2);

let sum3: Sum = '1';
let sum4: Sum = (a: number, b: number) => a + b;
