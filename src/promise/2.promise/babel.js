// function sync() {
//     setTimeout(() => {
//         return 1;
//     }, 1000);
// }

// // async function async1(){
// //   return new Promise(resolve => {
// //     setTimeout(() => {
// //       resolve(1)
// //     }, 2000)
// //   })
// // }

// async function test() {
//     await sync(); //undefined
//     console.log(1);
// }

// // async function test2() {
// //   await async1()
// //   console.log(1)
// // }

// test();

('use strict');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        debugger;
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(
                    gen,
                    resolve,
                    reject,
                    _next,
                    _throw,
                    'next',
                    value
                );
            }
            function _throw(err) {
                asyncGeneratorStep(
                    gen,
                    resolve,
                    reject,
                    _next,
                    _throw,
                    'throw',
                    err
                );
            }
            _next(undefined);
        });
    };
}

function sync() {
    setTimeout(function () {
        return 1;
    }, 1000);
} // async function async1(){
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(1)
//     }, 2000)
//   })
// }

function test() {
    return _test.apply(this, arguments);
} // async function test2() {
//   await async1()
//   console.log(1)
// }

function _test() {
    _test = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            _context.next = 2;
                            return sync();

                        case 2:
                            //undefined
                            console.log(1);

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _test.apply(this, arguments);
}

test(); // test2()
