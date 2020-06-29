import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
const logo = require('./logo.png');
class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <span className="log">
                    <img src={logo}/>
                </span>
                <h1>Echo's Blog</h1>
                <p>If you can't measure it, you can't improve it</p>
            </div>
        )
    }
}
export default Header