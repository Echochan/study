//user.js
const Express = require('express')
const router = Express.Router()
const Tags = require('../../models/Tags')
const {MD5_SUFFIX, responseClient, md5} = require('../../utils/utils')

router.get('/delTag', (req, res) => {
    let {name, _id} = req.query
    Tags.remove({_id})
        .then(result => {
            if(result.result.n === 1) {
                responseClient(res, 200, 0, '删除成功')
            }else {
                responseClient(res, 200, 0, '标签不存在')
            }
        }).catch(err => {
            responseClient(res)
        })
})
router.post('/addTag', (req, res) => {
    console.log('sss', req.body)
    let {name} = req.body
    Tags.findOne({name})
        .then(result => {
            if(!result) {
                let tag = new Tags({name})
                tag.save()
                    .then(data => {
                        responseClient(res, 200, 0, '添加成功', data)
                    }).catch(err => {
                        throw err
                    })
            }else {
                responseClient(res, 200, 1, '该标签已存在')
            }
        }).catch(err => {
            responseClient(res)
        })
})

module.exports = router