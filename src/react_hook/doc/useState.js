/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-05-12 22:09:58
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-09-12 20:54:03
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
let hookStates = []; // 保存状态的数组
let hookIndex = 0; // 索引
function useState(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function setState(newState) {
    hookStates[currentIndex] = newState;
    render();
  }
  return [hookStates[hookIndex++], setState];
}
function Counter() {
  let [number1, setNumber] = useState(0);
  let [number2, setNumber2] = useState(0);
  return (
    <div>
      {number1}
      <button onClick={() => setNumber(number1+1)}>+</button>
      {number2}
      <button onClick={() => setNumber2(number2+1)}>+</button>
    </div>
  )
}

function render() {
  hookIndex = 0;
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  );
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
