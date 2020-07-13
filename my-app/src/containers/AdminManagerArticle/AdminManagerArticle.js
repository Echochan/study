import React, {Component} from 'react'
import './style.css'
import {ManagerArticleCell} from '../../components/ManagerArticleCell/ManagerArticleCell'
import _ from 'lodash'
import { Modal} from 'antd'
import {getData, postData} from '../../fetch/fetch'
const confirm = Modal.confirm

export default class AdminManagerArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: []
        }
    }
    async componentDidMount() {
        getData('/getArticles')
        .then(data => {
            console.log('文章', data)
            this.setState({
                articleList: data.data.list
            })
        })
        
    }

    edit_article = (id) => {
        console.log('编辑文章', id)
    }
    getArticleDetail = id => {
        console.log('跳转到文章详情', id)

    }
    delete = id => {
        debugger
        var self = this
        confirm({
            title: '确定要删除文章吗？',
            content: '删除后将无法恢复',
            okText: "确定",
            okType: 'danger',
            cancelText: '再想想',
            onOk() {
               
                getData('/admin/article/delArticle', {
                    id: id
                }).then(data => {
                    console.log('删除', data)
                    if(data.code == '0') {
                        _.remove(self.state.articleList,  article => article._id === id)
                        self.setState({
                            articleList: self.state.articleList
                        })
                    }
                })
            },
            onCancel() {
                console.log('Cancle')
            }
        })
    }

    render() {
        return (
            <div>
                <h2>文章列表</h2>
                <div className="adminArticleListContainer">
                    {
                        this.state.articleList.map((article, index) => {
                            let id = article._id
                            return (
                                <ManagerArticleCell 
                                    edit_article={id => this.edit_article(id)}
                                    history={this.props.history}
                                    getArticleDetail={id => this.getArticleDetail(id)}
                                    delete={(id) => this.delete(id)}
                                    key = {index}
                                    data = {article}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}