/*
 * @description: rollup配置文件
 * @author: steve.deng
 * @Date: 2020-11-26 16:18:36
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-26 18:00:20
 */
import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import path from 'path';

export default {
    input: 'src/index.ts',
    output: {
        name: 'VueReactivity', // 打包出来的包名字 window会有这个变量
        format: 'umd', // 格式
        file: path.resolve('dist/vue.js'), // 输出路径
        sourcemap: true // 生成映射文件
    },
    plugins: [
        // 解析node模块
        nodeResolve({
            extensions: ['.js', '.ts']
        }),
        // 解析ts配置文件
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
        // 替换变量
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // 启动服务
        serve({
            open: true,
            openPage: '/public/index.html'
        })
    ]
};
