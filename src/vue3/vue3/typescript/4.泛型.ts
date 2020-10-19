/*
 * @description: 泛型
 * @author: steve.deng
 * @Date: 2020-10-12 21:12:12
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-12 21:19:30
 */ function createArray<T>(len: any, value: T): T[] {
    let result = [];
    for (let i = 0; i < len; i++) {
        result.push(value);
    }
    return result;
}

let arr = createArray(3, 1);

// 多个泛型 元组的交换
const swap = <T, K>(tuple: [T, K]): [K, T] => {
    return [tuple[1], tuple[0]];
};
swap<Number, Number>([1, 2]);

export {};
