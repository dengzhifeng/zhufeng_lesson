/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-16 15:01:37
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-16 15:10:10
 */
const path = require('path');
module.exports = function resolvePath(...file) {
    return path.resolve(__dirname, ...file);
};
