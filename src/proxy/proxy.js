const dinner = {
  meal: "tacos",
};

const handler = {
  get(target, prop) {
    console.log("intercepted!");
    return target[prop];
  },
};

const proxy = new Proxy(dinner, handler);
console.log(proxy.meal);

// vue双向绑定原理
// const dinner = {
//     meal: 'tacos'
//   }

//   const handler = {
//     get(target, prop, receiver) {
// 跟踪
//       track(target, prop)
//       return Reflect.get(...arguments)
//     },
//     set(target, key, value, receiver) {
// 触发修改
//       trigger(target, key)
//       return Reflect.set(...arguments)
//     }
//   }

//   const proxy = new Proxy(dinner, handler)
//   console.log(proxy.meal)
