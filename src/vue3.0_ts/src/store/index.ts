/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-22 11:35:06
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-22 22:49:24
 */
import { createStore } from 'vuex';
import { IHomeState } from '@/typings/home';
import home from './modules/home';
export interface IGlobalState {
    home: IHomeState;
}
export default createStore<IGlobalState>({
    // state: {},
    mutations: {},
    actions: {},
    modules: {
        home
    }
});
