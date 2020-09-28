/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-08-28 20:47:33
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-28 21:13:47
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'plugin:vue/essential',
    // '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
