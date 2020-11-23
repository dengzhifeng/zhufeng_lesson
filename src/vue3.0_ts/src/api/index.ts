/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-23 17:21:31
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-23 17:26:24
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = `http://www.fullstackjavascript.cn:3000`;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    return config;
});

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data.err == 1) {
            return Promise.reject(response.data.data);
        }
        return response.data.data;
    },
    err => {
        return Promise.reject(err);
    }
);

export default axios;
