title: 箭头函数的作用域和this
date: 2016-04-01 16:38:12
tags: [es6, 箭头函数, this, 作用域, 词法作用域]
categories: ES6
---
JS里的作用域和this一直是一件令人头疼的事情，以前接触的不太多，毕竟面向过程编程的我基本上都不会使用“类”这个概念。

自从开始学习ES6，很长一段时间都认为箭头函数(Arrow Function)[^1]就是给懒人用的**简写的匿名函数**而已。后来看到有人挑战阮一峰老师[《ECMAScript 6入门》](http://es6.ruanyifeng.com/)中关于箭头函数this的一些问题[^2]，才对箭头函数有了一丁点的理解。

我平时的工作基本上都是各种第三方的API整合，于是各种异步请求，promise都是家常便饭。由于SalesForce没有直接的nodejs sdk，所以自己写一个自定义的类就不可避免了。在写的过程中，关于this踩到坑里了，所以就有了这篇文章。

### 场景
其中一个简单的功能是，查找用户是否存在，若存在则发送欢迎邮件（整个流程对应`onBoardFlow`）。实际场景比这个要复杂，可能需要连续发送好几个请求，为了避免*回调地狱*，所有的请求我都用promise包了起来。

```
'use strict';
class SalesForce {
  constructor(email, username) {
    this.email = email;
    this.username = username;
  }
  checkUser(){
    return getUserByName(this.username); //发送一个请求到salesforce，返回一个promise
  }
  sendEmail(){
    return send(this.email); //发送一个请求通知salesforce发送邮件，返回一个promise
  }
  onBoardFlow(){
    //....
  }
}
```
### 方案

**在`onBoardFlow`中，搞不清this和作用域的我首先这么写：**
```
//例1
this.checkuser().then(this.sendEmail);  //Cannot read property 'email' of undefined
```
然后想到了在promise链中，this指向的是global；
> Q: **为什么能找到`this.sendEmail()`方法，却找不到`this.email`属性呢？**
A: 我的理解是：因为`this.sendEmail`是作为参数传入，传入的this是then外部的this，也就是`SalesForce`对象；
而this.sendEmail函数的作用域中产生了**新的this**，而这个this指向global（浏览器中为window对象）；在严格模式下this为undefined；

**然后容易想到的就是各种_this self，然后bind(this) call(_this)之类的**
```
//例2
this.checkuser().then(this.sendEmail.bind(this));  //it works !
```
这样是可以正常工作的，但感觉怪怪的，每个then都要`bind(this)`真是一点也不优雅。

**匿名函数和箭头函数原来不一样啊**
```
//例3
this.checkuser().then(function(){
  return this.sendEmail();
});  //Cannot read property 'updateFunnelData' of undefined
```
此时`this.sendEmail`的this是then中的匿名函数新产生的promise作用域下的this，非严格模式下指向global
> 在箭头函数出现之前，每个新定义的函数都将新产生自己作用域下的this, arguments等对象[^1]

```
例4
this.checkuser().then(()=>this.sendEmail());  //it works!
```
### 词法作用域
作用域内可以嵌套作用域，从而形成作用域链，在最外层的也就是全局作用域，当在内部查找一个对象时，会顺着作用域链最内层，层层向外寻找，直到找到为止。

在例3中，匿名函数的作用域中产生了新的`this`，该`this`指向global
在例4中，箭头函数的作用域中没有产生新的this，所以顺着作用域链层层往外寻找`this`，找到`onBoardFlow()`的作用域时，找到了`this`，而此时`this`就是`SalesForce`对象

### 为什么promise中的this指向global
这个，我还没学会…

[^1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[^2]: https://github.com/ruanyf/es6tutorial/issues/150
[^3]: http://www.cnblogs.com/Quains/archive/2011/04/12/2013121.html
