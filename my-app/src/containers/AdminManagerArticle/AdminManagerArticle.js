import React, {Component} from 'react'
import './style.css'
import {ManagerArticleCell} from '../../components/ManagerArticleCell/ManagerArticleCell'
import _ from 'lodash'
import { Modal} from 'antd'
const confirm = Modal.confirm

const articleList = [{
    title: '标题',
    author:'echo',
    viewCount: '12',
    time: '2020-06-29',
    _id: '1111',
    isPublished: true
},{
    title: '标题222',
    author:'echo2',
    viewCount: '112',
    time: '2020-06-29',
    _id: '2222',
    isPublished: false
},]

export default class AdminManagerArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: articleList
        }
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
                _.remove(self.state.articleList, article => article._id === id)
                self.setState({
                    articleList: self.state.articleList
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