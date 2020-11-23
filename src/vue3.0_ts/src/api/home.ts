/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-23 17:26:48
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-23 17:41:28
 */
import { ISlider } from '@/typings/home';
import axios from './index';

// 获取轮播图接口api 传个泛型 约束返回格式还有语法提示
export function getSliders<T>() {
    return axios.get<T, T>('/slider/list');
}
// getSliders<ISlider>().then(data => {
//     data.
// })
