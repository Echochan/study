import React from 'react'
import ReactDOM from 'react-dom'
import  './style.css'
import Header from '../../components/Header/Header'
import Menus from '../../components/Menus/Menus'
import ArticleList from '../../components/ArticleList/ArticleList'
import {Redirect } from 'react-router-dom'
import {getData} from '../../fetch/fetch'
import _ from 'lodash'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            currentTag: '',
            articleList: []
        }
    }
    async componentDidMount() {
        getData('/getAllTags').then(data => {
            console.log('allTags', data)
            if(data.code === 0) {
                let tags = _.map(data.data, 'name')
                this.setState({
                    tags: tags,
                    currentTag: tags[0]
                })
                this.getArticle(tags[0])
            }
        })
    }
    changeTag(e) {
        console.log(e)
        let currentTag = e.key
        this.setState({
            currentTag: currentTag
        })
        this.getArticle(currentTag)
    }
    getArticle(tag) {
        getData('/getArticles', {
            tag: tag
        }).then(data => {
            console.log('getArticle', data)
            this.setState({
                articleList: data.data.list
            })
        })
    }
    render() {
        return (
            <div className="h_container">
                <Header />
                <div className="nav">
                    <Menus history={this.props.history} tags={this.state.tags} current={this.state.currentTag} changeTag={this.changeTag.bind(this)}/>
                </div>
                <div className="main">
                    <ArticleList history={this.props.history} tags={this.state.tags} items={this.state.articleList}/>
                </div>
            </div>
        )
    }
}

export default Home