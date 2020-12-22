/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-22 17:47:40
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-22 18:08:35
 */
import History from './base';

export default class BrowserHistory extends History {
    constructor(router) {
        super(router);
    }
    getCurrentLocation() {
        return window.location.pathname;
    }
}
