//admin.js
const Express = require('express')
const router = Express.Router()
const User = require('../../models/user')
const {responseClient} = require('../../utils/utils')

router.use((req, res, next) => {
    if(req.session.userInfo) {
        next()
    }else {
        res.send(responseClient(res, 200, 1, '身份信息已过期，请重新登录'))
    }
})

router.use('/tags', require('./tags'))
router.use('/article', require('./article'))

router.get('/getUsers', (req, res) => {
    let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum -1) * 10
    let responseDta = {
        total: 0,
        list: []
    }
    User.count()
        .then(count => {
            responseDta.total = count
            User.find(null, '_id username type password', {skip: skip, limit: 10})
                .then(result => {
                    responseDta.list = result
                    responseClient(res, 200, 0, responseDta)
                })
                .catch(err => {
                    responseClient(res)
                })
        })
})

module.exports = router