/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-22 12:02:07
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-24 18:00:14
 */
import { Module } from 'vuex';
import {
    CATEGORY_TYPES,
    IHomeState,
    ILessons,
    ISlider
} from '../../typings/home';
import { IGlobalState } from '..';
import * as types from '../action-types';
import { getLessons, getSliders } from '@/api/home';
// 首页数据
const state: IHomeState = {
    currentCategory: CATEGORY_TYPES.ALL,
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
    mutations: {
        // 修改目录状态
        [types.SET_CATEGORY](state, payload: CATEGORY_TYPES) {
            state.currentCategory = payload;
        },
        [types.SET_SLIDER_LIST](state, payload: ISlider[]) {
            state.sliders = payload;
        },
        [types.SET_LOADING](state, payload: boolean) {
            state.lessons.loading = payload;
        },
        [types.SET_LESSON_LIST](state, payload: ILessons) {
            state.lessons.list = [...state.lessons.list, ...payload.list];
            state.lessons.hasMore = payload.hasMore;
            state.lessons.offset = state.lessons.offset + payload.list.length;
        }
    },
    actions: {
        async [types.SET_SLIDER_LIST]({ commit }) {
            let sliders = await getSliders<ISlider>();
            console.log('sliders', sliders);
            commit(types.SET_SLIDER_LIST, sliders);
        },
        async [types.SET_LESSON_LIST]({ commit }) {
            if (state.lessons.loading) {
                return;
            }
            if (!state.lessons.hasMore) {
                return;
            }
            commit(types.SET_LOADING, true); // 开始加载数据
            let lessons = await getLessons<ILessons>(
                state.currentCategory,
                state.lessons.offset,
                state.lessons.limit
            );
            commit(types.SET_LESSON_LIST, lessons);
            commit(types.SET_LOADING, false);
        }
    }
};

export default home;
