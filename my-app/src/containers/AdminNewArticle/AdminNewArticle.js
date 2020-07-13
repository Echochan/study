import React, {Component} from 'react'
import './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd'
import {getData, postData} from '../../fetch/fetch'
import '../Detail/style.css';

// const tags = ['首页', 'iOS', 'Python'];
export default class AdminNewArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            tags: [],
            allTags: [],
            modalVisible: false
        }
    }
    async componentDidMount() {
        getData('/getAllTags').then(data => {
            if(data.code === 0) {
                this.setState({
                    allTags: data.data
                })
            }
        })
    }
    //标题改变
    titleOnchage(e) {
        this.setState({
            title: e.target.value
        })
    }
    //正文改变
    onChanges(e) {
        this.setState({
            content: e.target.value
        })
    }   
    //选择分类
    selectTags(value) {
        this.setState({
            tags: value
        })
    }
    //发表文章
    publishArticle() {
        postData('/admin/article/addArticle', {
            title: this.state.title, 
            content: this.state.content,
            desc: this.state.desc,
            time: new Date().getTime(), 
            tags: this.state.tags.join(','), 
            isPublish: true
        }).then(data => {
            console.log('发表', data)
            if(data.code === 0) {
                this.setState({
                    title: '', 
                    content: '',
                    desc: '',
                    tags: []
                })
            }
        })
    }
    //
    saveArticle() {

    }
    //预览
    preview() {
        this.setState({
            modalVisible: true
        })
    }
    handleOk() {
        this.setState({
            modalVisible: false
        })
    }
    render() {
        return(
            <div className="adminNewArticle">
                <h2>新建文章</h2>
                <div className = "container">
                    <span className="subTitle">标题</span>
                    <Input 
                        className="titleInput"
                        placeholder={'请输入文章标题'}
                        type="text"
                        value={this.state.title}
                        onChange={this.titleOnchage.bind(this)}
                    />
                    <span className="subTitle">正文</span>
                    <textarea
                        className="textArea"
                        value={this.state.content}    
                        onChange={this.onChanges.bind(this)}
                    ></textarea>
                    <span className="subTitle">分类</span>
                    <Select
                        mode="multiple"
                        className="titleInput"
                        placeholder="请选择分类"
                        onChange={this.selectTags.bind(this)}
                        value = {this.state.tags}
                    >
                        {
                            this.state.allTags.map(item => (
                                <Select.Option key ={item.name}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                    <div className="bottomContainer">
                        <Button type="primary" onClick={this.publishArticle.bind(this)} className="buttonStyle">发布</Button>
                        <Button type="primary" onClick={this.saveArticle.bind(this)} className="buttonStyle">保存</Button>
                        <Button type="primary" onClick={this.preview.bind(this)} className="buttonStyle">预览</Button>
                    </div>
                </div>
                <Modal
                    visible = {this.state.modalVisible}
                    title="文章预览"
                    onOk={this.handleOk.bind(this)}
                    width={'900px'}
                    onCancel={this.handleOk.bind(this)}
                    footer={null}
                >
                    <div className="modalContainer">
                        <div id="preview" className="markdown_body">
                            {remark().use(reactRenderer).processSync(this.state.content).contents}
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}