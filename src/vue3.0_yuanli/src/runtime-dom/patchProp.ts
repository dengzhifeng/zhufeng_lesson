/*
 * @description: 属性操作
 * @author: steve.deng
 * @Date: 2020-11-30 16:50:54
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-06 12:32:28
 */
export function patchClass(el, value) {
    if (value == null) {
        value = '';
    }
    el.className = value;
}
// {color: red}
export function patchStyle(el, prev, next) {
    const style = el.style;
    if (!next) {
        el.removeAttribute(style); // 说明不需要有样式
    } else {
        for (let key in next) {
            style[key] = next[key];
        }
        if (prev) {
            // 删除 新的style没有的属性
            for (let key in prev) {
                if (next[key] == null) {
                    style[key] = '';
                }
            }
        }
    }
}

export function patchAttr(el, key, value) {
    if (value == null) {
        el.removeAttribute(key);
    } else {
        el.setAttribute(key, value);
    }
}

export function patchProp(el, key, prevValue, nextValue) {
    switch (key) {
        case 'class':
            patchClass(el, nextValue);
            break;
        case 'style':
            //{color: 'red'}
            patchStyle(el, prevValue, nextValue);
            break;
        default:
            patchAttr(el, key, nextValue);
            break;
    }
}
