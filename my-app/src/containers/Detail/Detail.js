import React from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {getData} from '../../fetch/fetch'
import '../Home/style.css'
import '../../components/Header/style.css'
import './style.css'

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: ''
        }
    }
    async componentDidMount() {
        console.log(this.props)
        const id = (this.props.match.params && this.props.match.params.id) || ''
        getData('/getArticleDetail', { 
            id: id
        }).then(data => {
            if(data.code === 0 ) {
                this.setState({
                    article: data.data
                })
            }
        })
    }
    render() {
        return(
            <div className="h_container">
                <div className="header">
                    <h1>{this.state.article.title}</h1>
                </div>
                <div className="main">
                    <div id='preview' className="main">
                        <div className="markdown_body">
                            {remark().use(reactRenderer).processSync(this.state.article.content).contents}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;