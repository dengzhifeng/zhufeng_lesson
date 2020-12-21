/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-20 13:12:28
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-20 13:32:35
 */
module.exports = function logLoader(source) {
    let i = 0;
    i++;
    console.log('@@@@@log-Loader@@@' + i);
    return source;
};
