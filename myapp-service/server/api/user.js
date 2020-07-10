//user.js
const Express = require('express')
const router = Express.Router()
const User = require( '../../models/User')
const  {MD5_SUFFIX, responseClient, md5} = require( '../../utils/utils')

router.post('/login', (req, res) => {
    let {username, password} = req.query
    if(!username) {
        responseClient(res, 400, 2, '用户名不能为空')
        return
    }
    if(!password) {
        responseClient(res, 400, 2, '密码不能为空')
        return
    }
    User.findOne({
        username, 
        password: md5(password + MD5_SUFFIX)
    }).then(userInfo => {
        if(userInfo) {
            let data = {}
            data.username = userInfo.username
            data.userType = userInfo.type
            data.userId = userInfo._id
            req.session.userInfo = data
            responseClient(res, 200, 0, '登录成功', data)
            return
        }
        responseClient(res, 400, 1, '用户名或密码错误')
    }).catch(err => {
        responseClient(res)
    })
})

router.post('/register', (req, res) => {
    let {username, password, passwordRe} = req.body
    if(!username) {
        responseClient(res, 400, 2, '用户名不可为空')
        return
    }
    if(!password) {
        responseClient(res, 400, 2, '密码不可为空')
        return
    }
    if(password != passwordRe) {
        responseClient(res, 400, 2, '两次密码不一致')
        return
    }
    User.findOne({username: username})
        .then(data => {
            if(data) {
                responseClient(res, 200, 1, '用户已存在')
                return
            }
            let user = new User({
                username: username,
                password: md5(password + MD5_SUFFIX),
                type: 'user'
            })
            user.save()
                .then(() => {
                    User.findOne({username})
                        .then(userInfo => {
                            let data = {}
                            data.username = userInfo.username
                            data.userType = userInfo.type
                            data.userId = userInfo._id
                            responseClient(res, 200, 0, '注册成功', data)
                            return
                        })
                }).catch(err => {
                    responseClient(res)
                })
        })
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.direct('/')
})

module.exports = router