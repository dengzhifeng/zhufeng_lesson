/*
 * @description: 属性操作
 * @author: steve.deng
 * @Date: 2020-11-30 16:50:54
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-30 17:22:44
 */
function patchClass(el, value) {
    if (value == null) {
        value = '';
    }
    el.className = value;
}
// {color: red}
function pathchStyle(el, prev, next) {
    const style = el.style;
    if (!next) {
        el.removeAttribute(style); // 说明不需要有样式
    } else {
        for (let key in next) {
            style[key] = next[key];
        }
        if (prev) {
            for (let key in prev) {
                if (next[key] == null) {
                    style[key] = '';
                }
            }
        }
    }
}

function patchAttr(el, key, value) {
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
            pathchStyle(el, prevValue, nextValue);
        default:
            patchAttr(el, key, nextValue);
            break;
    }
}
