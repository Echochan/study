// article表结构
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
    title: String,
    content:String,// 文章内容
    viewCount:Number,// 浏览次数
    commentCount:Number,// 评论次数
    time:String,// 发表时间
    coverImg:String,// 封面图片
    author:String,// 作者
    tags:Array,// 标签
    isPublish:Boolean,// 是否发布
    desc:String// 文章简介
})