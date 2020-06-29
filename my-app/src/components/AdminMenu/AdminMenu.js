import React, {Component} from 'react'
import {Menu} from 'antd'
import * as allIcons from '@ant-design/icons/es';


const menus = [
    {url: '/', name:'首页', iconType:'HomeOutlined'},
    {url: '/managerUser', name:'用户管理', iconType:'UsergroupDeleteOutlined'},
    {url: '/managerNewArticle', name:'发文', iconType:'FileTextOutlined'},
    {url: '/managerTags', name:'标签管理', iconType:'TagsOutlined'},
    {url: '/managerArticle', name:'文章管理', iconType:'EditOutlined'},
    {url: '/managerComment', name:'评论管理', iconType:'MessageOutlined'},
]

export default class AdminMenu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            url: '/admin'
        }
    }
    render() {
        return(
            <div>
                <Menu
                    selectedKeys={[this.props.url]}
                    mode="inline"
                    theme="dark"
                    onClick={({key}) => {
                        this.props.history.push(`/admin${key}`)
                        this.setState({
                            url: key
                        })
                    }}
                >
                    {
                        menus.map((item, index) => {
                            let Icon = allIcons[item.iconType]
                            let button =<Icon />
                            return (
                                <Menu.Item key={item.url}>
                                    {button}
                                    <span>{item.name}</span>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        )
    }
}