/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-14 18:12:38
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-19 13:15:47
 */
const STATUS = {
    PENDING: 'PENDING',
    FUFILLED: 'FUFILLED',
    REJECTED: 'REJECTED'
};

// 防止x是一个特殊对象 就报错了
// Object.defineProperties('x', 'then' {
//     get() {
//         if(time == 2) {
//             throw new Error();
//         }
//     }
// })
// 看x是普通值还是promise 如果是promise采用他的状态
function resolvePromise(x, promise2, resolve, reject) {
    // 防止自己等待自己完成
    if (promise2 == x) {
        return reject(new TypeError('出错了'));
    }
    // 看x是普通值还是promise 如果是promise 要采用他的状态
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // x可以是一个对象或者函数
        let called; // 标志位 防止resolve reject同时进行
        try {
            let then = x.then;
            // 看这个对象是否有then方法
            if (typeof then == 'function') {
                // 有then函数 我就认为x是一个promise

                // 如果x是promise 那么就采用他的状态
                // 类似这个语法
                // x.then(() => {
                //
                // }, err => {
                //
                // })
                // 复用32行就好了 防止有报错可能性 14行介绍了
                then.call(
                    x,
                    function (y) {
                        // 调用返回的promise 用他的结果 作为下一次then的结果。
                        if (called) return;
                        called = true;
                        // y就是成功的值 999  或者y是一个promise 要用递归思路
                        // 递归解析成功后的值 直到他是一个普通值为止
                        resolvePromise(y, promise2, resolve, reject);
                    },
                    (r) => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } else {
                resolve(x); // 此时x 就是一个普通对象
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x); // x不是promise 是一个原始数据
    }
    // 不是promise 直接调用resolve
}

class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        // 存放成功回调 （订阅列表）
        this.onResolvedCallbacks = [];
        // 存放失败回调
        this.onRejectedCallbacks = [];
        const resolve = (val) => {
            // 是promise 就继续递归执行
            if (val instanceof Promise) {
                return val.then(resolve, reject);
            }
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.FUFILLED;
                this.value = val;
                // resolve时就调用列表 （发布执行）
                this.onResolvedCallbacks.forEach((fn) => fn());
            }
        };
        const reject = (reason) => {
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => fn());
            }
        };
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        // 没传onFulfilled 就设置默认函数 就可以默认拿到then里面的data了
        onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (err) => {
                      throw err;
                  };
        let promise2 = new Promise((resolve, reject) => {
            // 同步处理
            if (this.status === STATUS.FUFILLED) {
                // 创建一个宏任务 为了拿到promise2 （promise2还没new完拿不了的）
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            if (this.status === STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            // 异步处理
            if (this.status === STATUS.PENDING) {
                // 装饰模式 切片编程
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // todo...
                            let x = onFulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // todo...
                            let x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }
    catch(err) {
        // 默认直走失败 没有成功 then的简单写法  err是函数
        return this.then(null, err);
    }
    static resolve(val) {
        return new Promise((resolve, reject) => {
            resolve(val);
        });
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }
}

// 测试时会调用这个方法
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

// 安装测试工具包
// npm install promises-aplus-tests -g
module.exports = Promise;
