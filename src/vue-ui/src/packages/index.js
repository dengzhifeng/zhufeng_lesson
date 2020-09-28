/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-08-28 20:50:35
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-28 21:17:49
 */
import Button from './Button.vue';
import Icon from './Icon.vue';

const install = (Vue) => {
  // Vue.component(Button.name, Button);
  // Vue.component(Icon.name, Icon);
  const requireComponent = require.context('.', true, /\.vue/);
  console.log(requireComponent.keys());
  requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName);
    Vue.component(config.default.name, config.default);
  })

};

export default {
  install,
};
