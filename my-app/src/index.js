import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import { BrowserRouter as Router, Switch, Route, history } from 'react-router-dom';
import Front from './containers/Front/Front';
import Admin from './containers/Admin/Admin'

function Example() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0)
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times {num}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setNum(num + 1)}>
        Click me
      </button>
    </div>
  );
}
// alter 捕获得是点击时候得状态
function Counter2 () {
    // useState 返回两个，一个是当前状态的属性，一个是修改状态的方法。
    let [state, setState] = useState({num: 0})
    let changeLater = ()=>{ // 这个alter 会捕获当前得状态。即点击按钮时候得状态
      setTimeout(()=>{
        alert(state.num)
      }, 2000)
    }
    return (
        <div>
          <p>{ state.num }</p>
          <button onClick={ () => setState({num: state.num+1}) }>+</button>
          <button onClick={ changeLater }>Counter2</button>
        </div>
    )
  }
  
// 改变状态注意
function Counter3 () {
    // useState 返回两个，一个是当前状态的属性，一个是修改状态的方法。
    let [state, setState] = useState({num: 0})
    let lazyAdd = ()=>{ // 这个alter 会捕获 当前得状态。即点击按钮时候得状态
      setTimeout(()=>{
        setState({num: state.num+1})
      }, 2000)
    }
    let lazyAdd2 = ()=>{ // 这个alter 会捕获之后的状态。
      setTimeout(()=>{
        setState((state) => ({num: state.num+1}))
      }, 1000)
    }
    return (
        <div>
          <p>{ state.num }</p>
          <button onClick={ () => setState({num: state.num+1}) }>+</button>
          <button onClick={ lazyAdd }>lazyAdd</button>
          <p>如果这样写得话，会获取到点击时候得状态在进行改变</p>
          <button onClick={ lazyAdd2 }>lazyAdd2</button>
          <p>这样写，改变了整个state，就可以正常相加了</p>
        </div>
    )
  }
  

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route path="/admin" component={Admin} />
                <Route component={Front} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
);
