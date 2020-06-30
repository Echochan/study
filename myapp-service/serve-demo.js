//基础设置
//==============================================================
//引用需要的package
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

//添加bodyParser配置
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var port = process.env.PORT || 8080 //设置端口

//api中的需要的route
//==============================================================
var router = express.Router()
//中间件  收到请求后和发送响应之前这个阶段执行的一些函数
router.use((req, res, next) => {
    console.log('something is happenning')
    next()
})
var Member = require('./models/member')
 //测试服务是否正常运行
 router.get('/', (req, res) => {
     res.json({message: 'nice,服务器来了！'})
 })

 //more API 
 router.route('/members')
    .post((req, res) => {
        var member = new Member()
        member.name = req.body.name
        member.save(err => {
            if(err) {res.send(err)}
            res.json({message: 'Member created'})
        })
    })
    .get((req, res) => {
        Member.find((err, members) => {
            if(err) {res.send(err)}
            
        })
    })

router.route('/members/:member_id')
    .get((req, res) => {
        Member.findById(req.params.bear_id, (err, member) => {
            if(err) {res.send(err)}
            res.json(member)
        })
    })
    .put((req, res) => {
        Member.findById(req.params.bear_id, (err, member) => {
            if(err) {res.send(err)}
            member.name = req.body.name
            member.save(err => {
                if(err) {res.send(err)}
                res.json({message: 'Member updated'})
            })
        })
    })
    .delete((req, res) => {
        Member.remove({
            _id: req.params.bear_id
        }, (err, member) => {
            if(err) {res.send(err)}
            res.json({message: 'Successfully deleted!'})
        })
    })
 //注册路由
 app.use('/api', router)

 
 //启动服务
 //===========================================================
 var mongoose = require('mongoose')
const member = require('./models/member')
 mongoose.connect('mongodb://localhost:27017/member', (err) => {
    if(err) {
        console.log(err, '数据库链接失败')
        return
    }
    console.log(err, '数据库链接成功')

    app.listen(port, err=> {
        if(err) {
            console.log('err:' , err)
        }else {
            console.info(`===> api server is running at localhost:27017`)
        }
    })
 })
 console.log(`服务器正常运行在端口：port${port}`)