/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-08-22 21:37:14
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-22 21:44:42
 */
export const forEachValue = (obj, callback) => {
    Object.keys(obj).forEach((key) => {
        callback(obj[key], key);
    });
}