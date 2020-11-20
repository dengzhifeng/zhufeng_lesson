/*
 * @description:  声明文件 vue 组件提示
 * @author: steve.deng
 * @Date: 2020-11-20 17:23:08
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-20 17:40:36
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
