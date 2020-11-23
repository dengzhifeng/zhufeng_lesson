/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-22 12:02:07
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-22 22:53:27
 */
import { Module } from 'vuex';
import { CATEGORY_TYPES, IHomeState } from '../../typings/home';
import { IGlobalState } from '..';
// 首页数据
const state: IHomeState = {
    currentCategory: CATEGORY_TYPES.NODE,
    sliders: [],
    lessons: {
        hasMore: true, // 有没有更多数据
        loading: false, // 默认没有正在加载
        offset: 0,
        limit: 5,
        list: [] // 页面显示的列表
    }
};

// Module里面的参数 1）自己的状态  2）全局状态
const home: Module<IHomeState, IGlobalState> = {
    state,
    namespaced: true,
    mutations: {}
};

export default home;
