import React from 'react'
import ReactDom from 'react-dom'
const a = <h1>11111</h1>
const ele = (
    <div className="greeting">
        <h1>Hello</h1>
        <h2>Good to see you here.</h2>
    </div>
)
const element = React.createElement(
'h1',
{className: 'greeting'},
'Hello, world!'
);
// React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。
// 所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

// ReactDom.render(
//     ele,
//     document.getElementById('root')
// )

/* function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    ReactDom.render(element, document.getElementById('root'));
  }
  setInterval(tick, 1000) */


  
//   *****************************************组件和props***********************************************

//组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。
//组件名称必须以大写字母开头
//定义组件  
    // 定义组件最简单的方式就是编写 JavaScript 函数：
function Welcom(props) {
    return <h1>Hello, {props.name}</h1>
}
    //还可以使用 ES6 的 class 来定义组件：
class Welcom2 extends React.Component {
    render() {
        return <h1>Hwllo, {this.props.name}</h1>
    }
}

//渲染组件
    // const ele2 = <Welcom name="Sara"/>
    // ReactDom.render(
    //     ele2,
    //     document.getElementById('root')
    // )
    //调用ReactDom.render()函数，并传入<Welcome name="Sara" />作为参数
    //React调用Welcom组件,并将{name: 'Sara'}作为props传入
    //Welcome组件将<h1>hello，Sara</h1>元素作为返回值
    //ReactDom 将DOM高效地更新为<h1>Hello, Sara</h1>

//组合组件
//提取组件  将组件拆分为更小的组件，组件细分，提高利用率
//Props的只读性
//所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
        // 纯函数：不改变入参的函数


// *********************************State & 生命周期 **************************************
// State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。
// 不要直接修改 State 使用setState
// State 的更新可能是异步的
    //要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
// State 的更新会被合并
// 数据是向下流动的



/* 
    //当 <Clock /> 被传给 ReactDOM.render()的时候，React 会调用 Clock 组件的构造函数。因为 Clock 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 this.state。我们会在之后更新 state。
    //之后 React 会调用组件的 render() 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 Clock 渲染的输出。
    //当 Clock 的输出被插入到 DOM 中后，React 就会调用 ComponentDidMount() 生命周期方法。在这个方法中，Clock 组件向浏览器请求设置一个计时器来每秒调用一次组件的 tick() 方法。
    //浏览器每秒都会调用一次 tick() 方法。 在这方法之中，Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。得益于 setState() 的调用，React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么。这一次，render() 方法中的 this.state.date 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。
    //一旦 Clock 组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法，这样计时器就停止了。 
*/
/* class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {date: new Date()}
    }
    componentDidMount() {
        //第一次被渲染到 DOM 中的时候 挂载
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000)
    }
    componentWillUnmount() {
        //组件被删除 卸载
        clearInterval(this.timerID)
    }
    tick() {
        this.setState({
            date: new Date()
        })
    }
    render() {
        return (
            <div>
                <h1>Hello, World</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}
function App() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    )
}
ReactDom.render(
    <App />,
    document.getElementById('root')
) */


// *********************** 事件处理 *****************************
/* function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log("The link was clicked")
    }
    return (
        <a href="#" onClick={handleClick}>Click me</a>
    )
}
ReactDom.render(
    <ActionLink />,
    document.getElementById('root')
)  */

//************************** 条件渲染 ***********************
    //元素变量 if 
    //与运算符 && 
    //三目运算符
    //阻止组件渲染

//************************** 列表 & Key ***********************
/* const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map(num => {
    return <li>{num}</li>
})
ReactDom.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
)  */
//key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。
// 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key
// 用 key 提取组件



//***************************************表单***************************************
// 受控组件
// 在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。
// 对于受控组件来说，输入的值始终由 React 的 state 驱动

/* class NameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '', 
            textValue:'',
            selectVlaue: ''
        }
        this.handleChange =  this.handleChange.bind(this)
        this.handleChange2 =  this.handleChange2.bind(this)
        this.handleChange3 =  this.handleChange3.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleChange(event) {
        const target = event.target
        const value = target.name
        const name = target.name
        this.setState({
            [name]: event.target.value
        })
    }
    handleChange2(event) {
        this.setState({textValue: event.target.value})
    }
    handleChange3(event) {
        this.setState({selectVlaue: event.target.value})
    }
    handleSubmit(event) {
        alert(`提交的名字： ${this.state.value}；提交的文章： ${this.state.textValue};你喜欢的水果：${this.state.selectVlaue}`)
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字：
                    <input name="value" type="text" value={this.state.value} onChange={this.handleChange} ></input>
                </label> 
                <label>
                    文章：
                    <textarea name="textValue" placeholder="请撰写一篇关于你喜欢的 DOM 元素的文章" value={this.state.textValue} onChange={this.handleChange}></textarea>
                </label>
                <label>
                    选择你喜欢的水果：
                    <select name="selectVlaue" value={this.state.selectVlaue} onChange={this.handleChange} >
                        <option value="grapefruit">葡萄柚</option>
                        <option value="apple">苹果</option>
                        <option value="watermelon">西瓜</option>
                        <option value="blueberry">蓝莓</option>
                        <option value="banana">香蕉</option>
                    </select>
                </label>
                <input type="submit" value="提交"></input>
            </form>
        )
    }
}
ReactDom.render(
    <NameForm />,
    document.getElementById('root')
)  */

//********************************状态提升*************************
// 多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去
/* function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature)
    if(Number.isNaN(input)) {
        return ''
    }
    const output = convert(input)
    const rounded = Math.round(output * 1000) / 1000
    return rounded.toString()
}

function BoilingVerdict(props) {
    if(props.celsius >= 100) {
        return <p>The water would boil.</p>
    }
    return <p>The water would not boil.</p>
}
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {temperature: ''}
    }
    handleChange(event) {
        // this.setState({temperature: event.target.value})
        this.props.onTemperatureChange(event.target.value)
    }
    render() {
        const scale = this.props.scale
        const temperature = this.props.temperature

        return (
            <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}</legend>
            <input value={temperature} onChange={this.handleChange}></input>
        </fieldset>
        )
    }
}
class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleCesiusChange = this.handleCesiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
        this.state = {
            scale: '',
            temperature: '' 
        }
    }
    handleChange(event) {
        this.setState({temperature: event.target.value})
    }
    handleCesiusChange(temperature) {
        this.setState({
            scale: 'c',
            temperature: temperature
        })
    }
    handleFahrenheitChange(temperature) {
        this.setState({
            scale: 'f',
            temperature: temperature
        })

    }
    render() {
        const scale = this.state.scale
        const temperature = this.state.temperature
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature
        return (
            <div>
              <TemperatureInput 
                scale="c" 
                temperature={celsius}
                onTemperatureChange={this.handleCesiusChange}/>
              <TemperatureInput 
                scale="f" 
                temperature={fahrenheit}
                onTemperatureChange={this.handleFahrenheitChange}/>
            <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>

        )
    }
}
ReactDom.render(
    <Calculator />,
    document.getElementById('root')
)  */


// ********************************组合 vs 继承******************************************
// React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。
function FancyBorder(props) {
    return(
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}

function WelcomeDialog() {
    return(
        <FancyBorder color="blue">
            <h1 className="Dialog-title">Welcom</h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    )
}

function SplitPane(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
      </div>
    );
  }
  
  function App() {
    return (
      <SplitPane
        left={
          <Contacts />
        }
        right={
          <Chat />
        } />
    );
  }