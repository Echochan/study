import React from 'react'
import ArticleCell from '../ArticleCell/ArticleCell'

const items = [
    {
        key: '1111',
        title: '标题111',
        time: '2020-06-29',
        viewCount: '100',
        commentCount: '23'
    },{
        key: '2222',
        title: '标题222',
        time: '2020-06-29',
        viewCount: '10',
        commentCount: '3'
    }
]

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {tags} = this.props
        return(
            <div>
                {
                    items.map((item, index) => (
                        <ArticleCell history={this.props.history} key={index} data={item} tags={tags}/>
                    ))
                }
            </div>
        )
    }
}