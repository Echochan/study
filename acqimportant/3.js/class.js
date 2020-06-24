/* class Teacher {

}

class Student {
    constructor(name, number) {
        this.name = name
        this.number = number
    }
    sayHi() {
        console.log(`姓名： ${this.name}, 学号：${this.number}`)
    }
    study() {

    }
}
*/


//继承 extends
class People {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`${this.name} eat something`)
    }

}

class Student extends People {
    constructor(name, number) {
        super(name)
        this.number = number
    }
    sayHi() {
        console.log(`姓名： ${this.name}, 学号：${this.number}`)
    }

}
class Teacher extends People {
    constructor(name, major) {
        super(name)
        this.major = major
    }
    teach() {
        console.log(`${this.name} teach ${this.major}`)
    }
} 

//通过类生命实例
const xialuo = new Student('xialuo', '10')
console.log(xialuo)
xialuo.sayHi()
xialuo.eat()

const madongmei = new Student('madongmei', '11')
console.log(madongmei)
madongmei.sayHi() 

const wanglaoshi = new Teacher('wanglaoshi', '语文')
wanglaoshi.teach()
wanglaoshi.eat()