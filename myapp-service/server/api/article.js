//user.js
const Express = require('express')
const router = Express.Router()
const Article = require( '../../models/article')
const {MD5_SUFFIX, responseClient, md5} = require('../../utils/utils')

router.post('/addArticle', (req, res) => {
    let {title, content, desc, time, tags, isPublish} = req.body
    console.log('body', req.body)
    const author = req.session.userInfo.username
    const coverImg = ''
    const viewCount = 0
    const commentCount = 0
    tags = tags || ''
    let templateArticle = new Article({
        title,
        content,
        desc,
        isPublish,
        viewCount,
        commentCount,
        time,
        author,
        coverImg,
        tags: tags.split(',')
    })
    templateArticle.save()
        .then(data => {
            responseClient(res,200,0,'保存成功',data); 
        }).catch(err => {
            responseClient(res);
        })
})
router.post('/updateArticle', (req, res) => {
    const { title, content, desc, time ,tags, isPublish, id } = req.body;
    Article.update({
        _id:id},{
        title,
        content,
        desc,
        time,
        tags:tags.split(','),
        isPublish
      }).then(result => {
          console.log(result);
          responseClient(res,200,0,'更新成功',result)
      }).cancel(err => {
          console.log(err);
          responseClient(res);
      });
})

//删除文章
router.get('/delArticle',(req,res) => {
    let id = req.query.id;
    Article.remove({_id:id})
        .then(result => {
              if(result.result.n === 1){
                  responseClient(res,200,0,'删除成功');
              }else {
                  responseClient(res,200,1,'文章不存在');
              }
        }).cancel(err => {
            responseClient(res);
        });
});

module.exports = router