/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-05-12 22:09:58
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-09-12 21:52:03
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
let hookStates = []; // 保存状态的数组
let hookIndex = 0; // 索引
function useEffect(callback,dependencies) {
  if (hookStates[hookIndex]) { // 说明不是第一次
    let lastDependencies = hookStates[hookIndex];
    let same = dependencies.every((item,index=>item === lastDependencies[index]));
    if (same) {
      hookIndex++;
    } else {
      hookStates[hookIndex] = dependencies;
      callback();
    }
  } else {
    hookStates[hookIndex] = dependencies;
    callback();
  }
}
// useEffect
function Counter() {
  let [number1, setNumber] = React.useState(0);
  let [name, setName] = React.useState('zhufeng');
  React.useEffect(() => {
    document.title = number;
  }, [number]);
  return (
    <div>
      number: {number}
      name: {name}
      <input value={name} onChange={e=> setName(e.target.value)}></input>
      {number2}
      <button onClick={() => setNumber(number+1)}>+</button>
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
