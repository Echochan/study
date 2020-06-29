import React, {Component} from 'react'
import './style.css'
import {Table} from 'antd'

const dataSource = [
    {key:'1', username:'echo', _id: '111111', password: '1234565', type:'admin'},
    {key:'1', username:'echo2', _id: '22222', password: '56232323', type:'user'},
]
const columns = [
    {title: '姓名', dataIndex: 'username', key: 'name'},
    {title: 'ID', dataIndex: '_id', key: 'ID'},
    {title: '密码（加密后）', dataIndex: 'password', key: 'password'},
    {title: '身份', dataIndex: 'type', key: 'address'},
]

export default class AdminmanagerUser extends Component {
    render() {
        return(
            <div>
                <h2>用户管理</h2>
                <Table
                className="table"
                pagination={false}
                columns={columns}
                dataSource={dataSource}
                />
            </div>
        )
    }
}