import { createApp } from 'vue';
import App from './App.vue';

// 函数的节流
function throttle(func, wait = 500) {
    let timer = null,
        previous = 0;
    return function anonymous(...params) {
        // 当前时间
        let now = new Date(),
            remaining = wait - (now - previous); // 传入期望点击时间间隔 - 实际点击时间间隔
        // 如果传入期望等待时间 <= 点击事件间隔  则立马执行
        if (remaining <= 0) {
            clearTimeout(timer);
            timer = null;
            previous = now;
            func.call(this, ...params);
        } else if (!timer) {
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                previous = new Date();
                func.call(this, ...params);
            }, remaining);
        }
    };
}

const app = createApp(App);
app.directive('throttle', {
    beforeMount(el, binding) {
        const [func, timer] = binding.value;
        el.addEventListener('click', throttle(func, timer));
    }
});
app.mount('#app');
