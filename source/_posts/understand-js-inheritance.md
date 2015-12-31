title: 对JS类和继承的一些理解
date: 2015-12-31 11:36:54
tags: [JS, prototype, 继承, 原型]
---
本文只总结最常用的实现方法，不具体讨论各种实现方法的优缺点（这些具体可以看[《JavaScript高级程序设计》](http://book.douban.com/subject/10546125/)）。

直到ES5，JS也还是一个没有类的语言，虽然ES6中可以使用class关键字，但据说也只是语法糖。(不知道好不好吃ԅ(¯﹃¯ԅ))
### 类的实现
类的两个基本元素就是**属性**和**方法**。

JS中类的实现有很多种，构造函数模式、原型模式等等，各有各的优缺点，最常用的是混合了构造函数和原型模式的混合模式。
```
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  console.log('Hi, ' + this.name)
}
```
使用构造函数来构造**属性**，然后往原型对象添加**方法**。这样的好处是：
* 每个实例之间不用共享属性，拥有各自独立的属性。也就可以避免当属性为引用类型（数组、对象）时，修改一个实例的属性会影响到其他实例的情况。
* 每个实例之间共用原型对象上的方法，实现了函数复用。

### 继承的实现
JS中继承的实现也有很多种，借用构造函数，原型链等等。
子类继承父类，当然继承的就是父类的**属性和方法**。JS中继承的实现，最常用的也是混合模式。
```
function Student(name, age) {
  Person.call(this, name);
  this.age = age;
}

console.log(Student.prototype.constructor); // Student

Student.prototype = new Person();
console.log(Student.prototype.constructor); // Person

Student.prototype.constructor = Student; // 重写constructor

Student.prototype.sayAge = function() {
  console.log("I'm " + this.age)
}
```
使用**借用构造函数**的方式来继承**属性**，然后使用**原型链**来继承**方法**。通过将子类的原型对象指向父类的实例，子类的实例就可以通过原型链向上查找到父类原型上的方法。


### 重写子类构造函数的意义
`Student.prototype = new Person();`这一步完全改变了Student原型对象的引用，`Student.prototype.constructor` 变为了Person原型对象的constructor。
个人觉得重写`Student.prototype.constructor = Student;`没有什么实际意义，可能只是**约定俗成的一种潜规则**。
人们通常可能已经习惯了使用new操作符的时候，构造函数的一致性
```
// Student.prototype.constructor = Student; 在上面的代码中注释掉这一句
var xiaobai = new Student('小白妹妹', 10);
xiaobai.constructor; // Person
```
当你在代码中遇到上面这种情况，如果不去查看之前的代码的话，肯定会觉得奇怪，为什么明明通过Student构造函数new了一个Student实例，而这个实例，却说自己的构造函数是Person？！？！WTF？！

### 参考
[1] http://stackoverflow.com/questions/4012998/what-it-the-significance-of-the-javascript-constructor-property
