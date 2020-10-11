/*
 * @description:观察者模式
 * @author: steve.deng
 * @Date: 2020-10-11 22:51:55
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-10-11 23:13:16
 */
// 将所有的观察者都放到被观察者中 (基于发布订阅的)
// 被观察者
class Subject {
    constructor(name) {
        this.name = name;
        this.Observers = [];
        this.state = '玩呢';
    }
    // 被观察者中要存放所有的观察者
    attach(o) {
        this.Observers.push(o);
    }
    setState(newState) {
        this.state = newState;
        this.Observers.forEach(o => {
            o.update(this);
        });
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    update(baby) {
        console.log(baby.name + '跟' + this.name + '说：' + baby.state);
    }
}

// 被观察者
let baby = new Subject('小宝宝');
let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');

baby.attach(o1);
baby.attach(o2);
baby.setState('有人打我');
baby.setState('有人打他');
