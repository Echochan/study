/*
    单线程和异步
    应用场景
    callback hell 和 promise
*/

/*
    单线程和异步
    js是单线程语言，只能同时做一件事
    webworker 启动进程
    js 和 dom渲染共用同一个线程
    遇到等待不能卡主（网络请求，定时任务） 
    需要异步
    回调 callback
    异步不会阻塞代码执行
    同步会阻塞代码执行
*/
/* console.log(100)
setTimeout(() => {
    console.log(200)
}, 0) //异步
alert(200) //同步
console.log(300) */


//应用场景
    //网络请求 ajax 图片加载
    //定时任务 setTimeout


// Promise 解决回调地狱


//同步和异步的区别
//是否阻塞
const url = 'http://file.cesfutures.com/lhmj/webPic/6045efdc-1cfc-4e29-92f3-fba74caee794.png'
const url2 = 'https://www.lhmj.org/static/img/cover-3.png'

function loadImg(src) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            reject(new Error('图片加载失败'))
        }
        img.src = src
    })
} 

loadImg(url).then((resolve) => {
    console.log(resolve.width)
    return resolve //普通对象
}).then(img1 => {
    console.log(img1.height)
    return loadImg(url2) //promise实例
}).then(img2 => {
    console.log(img2.width)
    return img2
}).then(img2 => {
    console.log(img2.height)
}).catch(err => {
    console.log('err')
})