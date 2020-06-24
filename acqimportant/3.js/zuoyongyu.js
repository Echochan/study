//this的不同应用场景
    //当作普通函数调用 window
    //call bind 
    //class 实例
    //箭头函数


/*手写bind*/


Function.prototype.bindManual = function() {
    //将参数拆解为数组
    const args = Array.prototype.slice.call(arguments)
     
    //获取this
    const t =  args.shift()

    //fn1
    const self = this
    return function() {
        return self.apply(t, args)
    }
}

// function fn1(a, b) {
//     console.log('this', this)
//     console.log('a,b', a, b)
//     return 'this is fn1'
// }
// const fn2 = fn1.bindManual({x: 100}, 10, 20, 30)
// const res = fn2()
// console.log(res)

/*实际开发中闭包的运用场景
//闭包隐藏数据，只提供api

*/



/*作用域
    #全局作用域
    #函数作用域 函数定义时作用域已经确定
    #块级作用域 ES6新增


自由变量
    #一个变量在当前作用域没有定义，但是被使用
    #向上级作用域，一层一层依次查找，直到找到为止
    #如果到全局作用域都没找到，则报错  x is not defined


*/




/* 闭包 
    函数作为参数
    函数作为返回值

自由变量的查找，是在函数定义的地方，向上级作用域查找
不是在执行的地方！！！
*/
// 函数作为返回值
    /* function create() {
        const a = 100
        return function() {
            console.log(a)
        }
    }
    const returnFn = create()
    const a = 200
    returnFn() //100 */

// 函数作为参数
    /* function print(fn) {
        const a = 200
        fn()
    }
    const a = 100
    function fn() {
        console.log(a)
    }
    print(fn) */


/*this
    值是在函数执行时决定的
    箭头函数的this取得是上级作用域的值



*/



/*
原型链的this


*/