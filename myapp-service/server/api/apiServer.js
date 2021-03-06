/**
 * api请求server
 *
 * 0：成功
 * 1：数据不合法
 * 2：客户端数据错误
 * 3：后端错误
 * 
 * 
 * 新起一个http server
 * 使用express.router来路由API请求的路由
 * 使用 mongoose 来连接 MongoDB 数据库
 * 使用 bodyParse 中间件来解析post请求的请求体数据。

 */

 const Express = require('express')
 const config = require('../../config/config')
 const bodyParser = require('body-parser')
 const mongoose = require('mongoose')
 const cookieParser = require('cookie-parser')
 const session = require('express-session')

 const port = config.apiPort

 const app = new Express()

 app.use(bodyParser.urlencoded({extended:true}));  //支持编码的主体

 app.use(bodyParser.json());  //支持json编码的主体
 app.use(cookieParser('express_react_cookie'))
 app.use(session({
     secret: 'express_react_cookie',
     resave: true,
     saveUninitialized: true,
     cookie: {maxAge: 60 * 1000 * 30} //过期时间
 }))

 app.use('/', require('./main'))
 //管理页面路由
 app.use('/admin', require('./admin'))

 mongoose.Promise = require('bluebird')
 mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, err => {
     if(err) {
         console.log(err, '数据库连接失败')
         return
     }
     console.info(`===> db server is running at ${config.dbHost}:${config.dbPort}`)

  /*    var dbo = db.db("blog");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbo.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    }); */

     app.listen(port, err => {
         if(err) {
            console.log('err:', err)
         }else {
            console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
         }
     })
 })

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/blog";
 
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var myobj = { name: "菜鸟教程", url: "www.runoob" };
//     dbo.collection("site").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("文档插入成功");
//         db.close();
//     });
// });