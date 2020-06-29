import React from 'react'
import {Menu, } from 'antd'
import './style.css'

const categories = ['首页', 'IOS', 'Python', 'ReactJs']

export default class Menus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: categories[0]
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e) {
        this.setState({
            current: e.key
        })
    }
    render() {
        return (
            <Menu 
                onClick={this.handleClick}
                selectedKeys = {[this.state.current]}
                mode = "horizontal"
                className = "menucontainer"
                >
                    {
                        categories.map((item, index) => (
                            <Menu.Item key={item}>
                                {item}
                            </Menu.Item>
                        ))
                    }

            </Menu>
        )
    }
}
