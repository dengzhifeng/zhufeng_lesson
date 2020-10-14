/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-10-14 18:12:38
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-14 18:40:30
 */
const STATUS = {
    PENDING: 'PENDING',
    FUFILLED: 'FUFILLED',
    REJECTED: 'REJECTED'
};
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        const resolve = (val) => {
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.FUFILLED;
                this.value = val;
            }
        };
        const reject = (reason) => {
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.REJECTED;
                this.reason = reason;
            }
        };
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status == STATUS.FUFILLED) {
            onFulfilled(this.value);
        }
        if (this.status == STATUS.REJECTED) {
            onRejected(this.reason);
        }
    }
}

module.exports = Promise;
