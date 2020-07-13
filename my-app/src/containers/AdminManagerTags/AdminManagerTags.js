import React, {Component} from 'react'
import './style.css'
import {Tag, Input, Tooltip, Button} from 'antd'
import _ from 'lodash'
import {getData, postData} from '../../fetch/fetch'
export default class AdminManagerTags extends Component{
    constructor(props) {
        super(props)
        this.saveInputRef = React.createRef();
        this.state = {
            tags: [],
            inputVisible: false,
            inputValue: '',
        }
    }
    async componentDidMount() {
        getData('/getAllTags').then(data => {
            this.setState({
                tags: data.data, 
            })
        })
    }
    //显示输入框
    showInput = () => {
        this.setState({
            inputVisible: true
        }, () => {
            this.saveInputRef.current.focus()
        })
    }

    handleInputChange = (e) =>{
        this.setState({
            inputValue: e.target.value
        })
    }
    handleInputConfirm = (e) => {
        if(this.state.inputValue.length > 0) {
            postData('/admin/tags/addTag', {
                name: this.state.inputValue
            }).then(data => {
                if(data.code === 0) {
                    this.state.tags.push(data.data)
                    this.setState({
                        tags: this.state.tags
                    })
                    console.log('tags', this.state.tags)
                }
            })
            
        }
        this.setState({
            inputVisible: false,
            inputValue: ''
        })
    }
    handleDelete = (id) => {
        getData('/admin/tags/delTag', {
            _id: id
        }).then(data => {
            if(data.code === 0) {
                _.remove(this.state.tags , tag => tag._id === id)
                this.setState({
                    tags: this.state.tags
                })
            }
        })
    }
    render() {
        const { inputVisible, inputValue } = this.state;
        const {tags} = this.state
        return (
            <div>
                <h2>标签管理</h2>
                {tags.map((tag,index) => {
                    const isLongTag = tag.length > 20
                    const tagElm = (
                        <Tag className="tagStyle" key={index}  visible={true} closable={tags.length > 1 }  onClose={() => this.handleDelete(tag._id)}>
                            {isLongTag ? `${tag.name.slice(0,20)}...` : tag.name}
                        </Tag>
                    )
                    return isLongTag ? <Tooltip key={tag.name} title={tag.name}>{tagElm}</Tooltip> : tagElm
                })}
                {inputVisible && (
                    <Input 
                        className="tagStyle"
                        ref = {this.saveInputRef}
                        type="text"
                        size="small"
                        style={{width: 108}}
                        value = {inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Button
                     className="tagStyle"
                     size="small"
                     type="dashed"
                     onClick={this.showInput}
                     >
                         + New Tag
                     </Button>
                )}
            </div>
        )
    }

}