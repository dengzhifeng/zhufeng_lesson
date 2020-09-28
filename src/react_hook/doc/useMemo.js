/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-05-12 22:09:58
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-09-12 21:07:39
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
/**
 * @description: 为了减少组件渲染，用useMemo useCallBack
 * @param {type} 
 * @return {type} 
 */
let Child = ({data, onButtonClick}) => {
  console.log('Child render') // 多次渲染
  return <button onClick={onButtonClick}>{data.number}</button>
}
Child = React.memo(Child);
let myData = { number: 0};
function App() {
  const [number, setNumber] = React.useState(0);
  const [name, setName] = React.useState('zhufeng');
  let data = React.useMemo(
    () => ({number}), 
    [number]
  );
  // 每次渲染App都要生命一个新的函数
  // 优化后 依赖量变化才会生成新的函数， 否则始终用上次的函数
  let addClick = React.useCallback(() => setNumber(number+1),[number]);
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child data={data} onButtonClick={addClick} />
    </div>
  )
}
function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
