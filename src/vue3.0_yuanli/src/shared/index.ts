/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-27 16:27:33
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-01 18:03:35
 */
export const isObject = (val) => {
    return typeof val == 'object' && val !== null;
};

export const isSymbol = (val) => typeof val == 'symbol';

export const isArray = Array.isArray;

// 判断是否是数字 或者 数字字符串
export const isInteger = (key) => '' + parseInt(key, 10) === key;

const hasOwnPrototype = Object.prototype.hasOwnProperty;

// 判断对象有无这个key
export const hasOwn = (target, key) => hasOwnPrototype.call(target, key);

export const hasChanged = (value, oldValue) => value !== oldValue;

export * from './shapeFlages';

export const isString = (value) => typeof value === 'string';

export const isFunction = (value) => typeof value == 'function';
