//main.js
const Express = require('express')
const Tags = require ('../../models/tags')
const Article = require ('../../models/article')
const {responseClient}  = require( '../../utils/utils')

const router = Express.Router()

router.use('/user', require('./user'))
//获取全部标签
router.get('/getAllTags', (req, res) => {
    Tags.find(null, 'name')
        .then(data => {
            responseClient(res, 200, 0, '请求成功', data)
        }).catch(err => {
            responseClient(res)
        })
})

//获取文章
router.get('/getArticles', (req, res) => {
    let tag = req.query.tag || null
    let isPublish = req.query.isPublish || true
    let searchCondition = {
        isPublish
    }
    if(tag) {
        searchCondition.tags = tag
    }
    if(isPublish === 'false') {
        searchCondition = null
    }
    let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 10
    let responseData = {
        total: 0,
        list:[]
    }
    Article.count(searchCondition)
        .then(count => {
            responseData.total = count
            Article.find(searchCondition, '_id title isPublish author viewCount commentCount time desc tags', {
                skip: skip,
                limit: 10
            }).then(result => {
                responseData.list = result
                responseClient(res, 200, 0, 'success', responseData)
            }).catch(err => {
                throw err
            })
        }).catch(err => {
            responseClient(res)
        })

})

//获取文章详情
router.get('/getArticleDetail', (req, res) => {
    let _id = req.query.id
    Article.findOne({_id})
        .then(data => {
            data.viewCount = data.viewCount + 1
            Article.update({_id}, {viewCount: data.viewCount})
                .then(result => {
                    responseClient(res, 200, 0, 'success', data)
                }).catch(err => {
                    throw err
                })
                
        }).catch(err => {
            responseClient(res)
        })
})


module.exports = router