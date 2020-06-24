//类型判断 instanceof
console.log([] instanceof Array) //true
console.log([] instanceof Object) //true

console.log({} instanceof Object)
 

//原型
/* 
隐式原型 __proto__
显式原型 prototype
每个class 都有显示原型
每个实例都有隐式原型
实例的__proto__指向对应class 的prototype

#基于原型的执行方法
获取属性xialuo.name或执行方法xialuo.sayhi()时，先在自身属性和方法寻找，如果找不到则自动去_ _proto_ 中查找

#原型链

*/

//手写Jquery

class Jquery {
    constructor(selector) {
        const result = document.querySelectorAll(selector)
        const length = result.length
        for(let i = 0; i<length; i++) {
            this[i] = result[i]
        }
        this.length = length
    }
    get(index) {
        return this[index]
    }
    each(fn) {
        for(let i = 0; i<this.length; i++) {
            const elem = this[i]
            fn(elem)
        }
    }
    on(type, fn) {
        return this.each(elem => {
            elem.addEventListener(type, fn, false)
        })
    }

}

//考虑扩展性
//插件
Jquery.prototype.dialog = function(info) {
    alert(info)
}

//造轮子
class myJQuery extends Jquery {
    constructor(selector) {
        super(selector)
    }
    sayHi() {
        console.log('hahaha')
    }
}

const divs = new Jquery('div')
console.log(divs)


