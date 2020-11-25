/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-22 12:08:22
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-25 17:44:29
 */

// 轮播图对象接口
export interface ISlider {
    url: string;
}

// 课程对象接口
export interface ILesson {
    title: string;
    video: string;
    poster: string;
    price: number;
    category?: number;
}

// 课程信息接口
export interface ILessons {
    hasMore: boolean; // 有没有更多数据
    loading: boolean; // 默认没有正在加载
    offset: number;
    limit: number;
    list: ILesson[]; // 页面显示的列表
}

// 首页状态接口
export interface IHomeState {
    currentCategory: CATEGORY_TYPES;
    sliders: ISlider[];
    lessons: ILessons;
}

export enum CATEGORY_TYPES {
    ALL,
    REACT,
    VUE,
    NODE
}
