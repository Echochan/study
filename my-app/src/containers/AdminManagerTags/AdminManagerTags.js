import React, {Component} from 'react'
import './style.css'
import {Tag, Input, Tooltip, Button} from 'antd'
import _ from 'lodash'
export default class AdminManagerTags extends Component{
    constructor(props) {
        super(props)
        this.saveInputRef = React.createRef();
        this.state = {
            tags: ['首页', 'IOS', 'Python'],
            inputVisible: false,
            inputValue: '',
        }
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
            this.state.tags.push(this.state.inputValue)
            this.setState({
                tags: this.state.tags
            })
        }
        this.setState({
            inputVisible: false,
            inputValue: ''
        })
    }
    handleDelete = (removeTag) => {
        _.remove(this.state.tags , tag => tag === removeTag)
        console.log( ' this.state.tags', this.state.tags)
        this.setState({
            tags: this.state.tags
        })
        console.log( ' this.state.tags222', this.state.tags)
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
                        <Tag className="tagStyle" key={index} visible={true} closable={index!=0}  onClose={() => this.handleDelete(tag)}>
                            {isLongTag ? `${tag.slice(0,20)}...` : tag}
                        </Tag>
                    )
                    return isLongTag ? <Tooltip key={tag} title={tag}>{tagElm}</Tooltip> : tagElm
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