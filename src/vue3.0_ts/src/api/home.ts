/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-23 17:26:48
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-24 17:49:13
 */
import { CATEGORY_TYPES, ISlider } from '@/typings/home';
import axios from './index';

// 获取轮播图接口api 传个泛型 约束返回格式还有语法提示
export function getSliders<T>() {
    return axios.get<T, T>('/getSliderList');
}
// getSliders<ISlider>().then(data => {
//     data.
// })

export function getLessons<T>(
    category: CATEGORY_TYPES,
    offset: number = 0,
    limit: number = 5
) {
    let config = {
        params: {
            category,
            offset,
            limit
        }
    };
    return axios.get<T, T>(`/getLessonList`, config);
}
