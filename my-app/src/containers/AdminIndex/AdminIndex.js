import React, {Component} from 'react'
import {Input, Button} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import './style.css'
import {getData, postData} from '../../fetch/fetch'
export default class AdminIndex extends Component{
    constructor(props) {
        super(props)
        this.state = {
            usrName: '',
            psd: '',
            regusrName: '',
            regpsd: '',
            regrepsd: ''
        }
    }
    usrNameChange(e) {
        this.setState({
            usrName: e.target.value
        })
    }   

    psdChane(e) {
        this.setState({
            psd: e.target.value
        })
    }
    regusrNameChange(e) {
        this.setState({
            regusrName: e.target.value
        })
    }   

    regpsdChane(e) {
        this.setState({
            regpsd: e.target.value
        })
    }
    regrepsdChane(e) {
        this.setState({
            regrepsd: e.target.value
        })
    }


    login() {
        postData('/user/login', {
            username: this.state.usrName,
            password: this.state.psd
        }).then(data => {
            console.log('登录结果', data)
        })
    }
    register() {
        postData('/user/register', {
            username:this.state.regusrName, 
            password:this.state.regpsd, 
            passwordRe:this.state.regrepsd
        }).then(data => {
            console.log('注册结果', data)
        })
    }
    render() {
        return(
            <div>
                <h1>首页</h1>
                <div className='login-wrp'>
                    <Input size='samll' 
                    prefix={<UserOutlined/>} 
                    value={this.state.usrName}
                    onChange={this.usrNameChange.bind(this)}/>
                    <Input size='samll' type="password" prefix={<LockOutlined/>} 
                    value={this.state.psd}
                    onChange={this.psdChane.bind(this)}/>
                    <Button type='primary' size='large' block='true' onClick={this.login.bind(this)}>登录</Button>
                </div>
                <div className='login-wrp'>
                    <Input size='samll' 
                    prefix={<UserOutlined/>} 
                    value={this.state.regusrName}
                    onChange={this.regusrNameChange.bind(this)}/>
                    <Input size='samll' type="password" prefix={<LockOutlined/>} 
                    value={this.state.regpsd}
                    onChange={this.regpsdChane.bind(this)}/>
                    <Input size='samll' type="password" prefix={<LockOutlined/>} 
                    value={this.state.regrepsd}
                    onChange={this.regrepsdChane.bind(this)}/>
                    <Button type='primary' size='large' block='true' onClick={this.register.bind(this)}>注册</Button>
                </div>
            </div>
        )
    }
}