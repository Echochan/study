import React from 'react'
import {Menu, } from 'antd'
import './style.css'

// const categories = ['首页', 'IOS', 'Python', 'ReactJs']

export default class Menus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: ''
        }
    }
   
    render() {
        const categories = this.props.tags
        const current = this.props.current
        return (
            <Menu 
                onClick={this.props.changeTag}
                selectedKeys = {[current]}
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
