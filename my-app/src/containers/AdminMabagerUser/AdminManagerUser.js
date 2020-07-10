import React, {Component} from 'react'
import './style.css'
import {Table} from 'antd'
import {getData, postData} from '../../fetch/fetch'
/* const dataSource = [
    {key:'1', username:'echo', _id: '111111', password: '1234565', type:'admin'},
    {key:'1', username:'echo2', _id: '22222', password: '56232323', type:'user'},
] */
const columns = [
    {title: '姓名', dataIndex: 'username', key: 'name'},
    {title: 'ID', dataIndex: '_id', key: 'ID'},
    {title: '密码（加密后）', dataIndex: 'password', key: 'password'},
    {title: '身份', dataIndex: 'type', key: 'address'},
]

export default class AdminmanagerUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
    }
    render() {
        return(
            <div>
                <h2>用户管理</h2>
                <Table
                className="table"
                pagination={false}
                columns={columns}
                dataSource={this.state.dataSource}
                rowKey={(record, index) => index}
                />
            </div>
        )
    }
    async componentDidMount() {
        getData(`/admin/getUsers`, {
            method: "GET",
            mode: 'cors'
        }).then(data => {
            this.setState({
                dataSource: data.data.list
            })
            console.log('data', this.state.dataSource)
        }).catch( err=> {} )
        
    }
}