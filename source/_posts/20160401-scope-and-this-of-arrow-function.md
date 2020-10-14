---
title: 箭头函数的作用域和this
date: 2016-04-01 16:38:12 +8
tags: [es6, 箭头函数, this, 作用域, 词法作用域]
category: ES6
---

JS 里的作用域和 this 一直是一件令人头疼的事情，以前接触的不太多，毕竟面向过程编程的我基本上都不会使用“类”这个概念。

自从开始学习 ES6，很长一段时间都认为箭头函数(Arrow Function)[^1]就是给懒人用的**简写的匿名函数**而已。后来看到有人挑战阮一峰老师[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)中关于箭头函数 this 的一些问题[^2]，才对箭头函数有了一丁点的理解。

我平时的工作基本上都是各种第三方的 API 整合，于是各种异步请求，promise 都是家常便饭。由于 SalesForce 没有直接的 nodejs sdk，所以自己写一个自定义的类就不可避免了。在写的过程中，关于 this 踩到坑里了，所以就有了这篇文章。

### 场景

其中一个简单的功能是，查找用户是否存在，若存在则发送欢迎邮件（整个流程对应`onBoardFlow`）。实际场景比这个要复杂，可能需要连续发送好几个请求，为了避免*回调地狱*，所有的请求我都用 promise 包了起来。

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

**在`onBoardFlow`中，搞不清 this 和作用域的我首先这么写：**

```
//例1
this.checkuser().then(this.sendEmail);  //Cannot read property 'email' of undefined
```

然后想到了在 promise 链中，this 指向的是 global；

> Q: **为什么能找到`this.sendEmail()`方法，却找不到`this.email`属性呢？**
> A: 我的理解是：因为`this.sendEmail`是作为参数传入，传入的 this 是 then 外部的 this，也就是`SalesForce`对象；
> 而 this.sendEmail 函数的作用域中产生了**新的 this**，而这个 this 指向 global（浏览器中为 window 对象）；在严格模式下 this 为 undefined；

**然后容易想到的就是各种\_this self，然后 bind(this) call(\_this)之类的**

```
//例2
this.checkuser().then(this.sendEmail.bind(this));  //it works !
```

这样是可以正常工作的，但感觉怪怪的，每个 then 都要`bind(this)`真是一点也不优雅。

**匿名函数和箭头函数原来不一样啊**

```
//例3
this.checkuser().then(function(){
  return this.sendEmail();
});  //Cannot read property 'updateFunnelData' of undefined
```

此时`this.sendEmail`的 this 是 then 中的匿名函数新产生的 promise 作用域下的 this，非严格模式下指向 global

> 在箭头函数出现之前，每个新定义的函数都将新产生自己作用域下的 this, arguments 等对象[^1]

```
例4
this.checkuser().then(()=>this.sendEmail());  //it works!
```

### 词法作用域

作用域内可以嵌套作用域，从而形成作用域链，在最外层的也就是全局作用域，当在内部查找一个对象时，会顺着作用域链最内层，层层向外寻找，直到找到为止。

在例 3 中，匿名函数的作用域中产生了新的`this`，该`this`指向 global
在例 4 中，箭头函数的作用域中没有产生新的 this，所以顺着作用域链层层往外寻找`this`，找到`onBoardFlow()`的作用域时，找到了`this`，而此时`this`就是`SalesForce`对象

### 为什么 promise 中的 this 指向 global

这个，我还没学会…

[^1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[^2]: https://github.com/ruanyf/es6tutorial/issues/150
[^3]: http://www.cnblogs.com/Quains/archive/2011/04/12/2013121.html
