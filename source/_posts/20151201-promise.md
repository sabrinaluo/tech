---
title: 我所理解的Promise
date: 2015-12-01 18:46:26
tags: promise
categories: JS
---
（嫌我话多的可以直接看分割线之后的部分…）
以前高中的时候自己捣腾博客，一直也就只会用JQuery写点按钮事件什么的，连表单提交都没写过，后来误打误撞做了前端码农旧觉得JS的异步模式实在是太坑爹，当你搞清楚异步回调的时候，又会发现[回调地狱(Callback Hell)](http://callbackhell.com/)太坑爹…
为什么觉得异步坑爹？看看下面这个例子：

``` javascript
//以下用setTimeout()模拟一个请求
function getName() {
  return "小白妹妹";
}

function greeting(name) {
  console.log("你好，" + name);
}

//生成一个0到1000的随机数，模拟不确定的等待时间0-1秒
var randomTime = function () {
  return Math.random() * 1000;
};

var name = "";
//1秒之内给name赋值为 小白妹妹，但不知道具体时间
setTimeout(function () {
  name = getName();
}, randomTime());

greeting(name); //以为得到name之后就可以开心的去打招呼啦，然而…
```

### 这是错的！这是错的！这是错的！

可能很多新手都犯过这个错误，错的时候还不知道为啥错了…深究原因的话跟JS的机制有关，长篇大论的就不在这里多说了（其实是我说不清楚…）

再有点经验，就会知道，应该把 `greeting(name)` 写在回调函数里，这样就能保证在得到数据之后才运行 `greeting()` 函数，于是…当你有多个请求并且之间是有这种依赖关系的时候，可怕的回调地狱就出现了！
而解决回调地狱其中一个很优雅的方法，就是使用传说中的promise！

关于promise这个概念我前前后后看了有一年了，周围也没有认识的人可以给我讲，只能自己看看网上的文章，然而…~~并没有什么卵用~~…网上的文章都是众说纷纭，有一上来就defer的[^1]，也有一上来就说如果你还在用defer你就理解错了Promise的[^2]，就所以我到现在也不知道究竟什么样的理解才是对的…

关于[Promise以及A+规范](http://segmentfault.com/a/1190000002452115)就不在此详述了，那些概念的东东，我也还没完全理解。我想做的是让跟我一样的小白都能明白Promise最基本的用法。

---
举个栗子…
有一个第三方提供的API，访问API能够得到一些用户数据（每访问一次得到一页，假设由于某些限制一页只返回3个用户）以及下一页的index；除了第一页之外，其他的页面都需要下一页的index参数才能访问到。（先不管这个API设计的合不合理…Facebook就有这样的API）
http://example.com/user  *-->访问第一页的用户数据*
http://example.com/user?next=xzmca  *-->访问第二页的用户数据*
请求第一页时返回结果如下：
``` json
{
"items" : [{
  "name" : "小白妹妹",
   "age" : 10
  }, 
  {...},
  {...}],
"nextPage" : "xzmca",
"lastPage" : null
}
```

你可能会有这样的需求：你的APP一次需要显示6个甚至更多个的用户数据。而根据之前的API，一次只能拿到3个数据，那么就只能发出两次请求，并且**第二次请求依赖于第一次请求的结果**，由于异步的原因我们并不知道第一个请求什么时候才完成，~~而我最初入坑时是让程序发完第一个请求后强制等2秒再发第二个请求我会告诉你们吗…~~

下面为了方便，使用`setTimeout()`函数和[bluebird](http://bluebirdjs.com/)库进行说明:
``` javascript
//生成一个0到3000的随机数，模拟不确定的等待时间0-3秒
var randomTime = function () {
  return Math.random() * 3000;
};

//只考虑最简单的情况promise被resolve，暂时不考虑promise被reject的情况
function req1() {
  return new Promise(function (resolve) {
    //使用setTimeout()来模拟发送请求，data为请求得到的数据
    setTimeout(function () {
      var data = {
        "items": [{
          "name": "小白妹妹",
          "age": 10
        }, {
          "name": "小白",
          "age": 100
        }, {
          "name": "妹妹",
          "age": 111
        }],
        "nextPage": "asdfa",
        "lastPage": null
      };
      resolve(data);
      console.log("请求1完成");
    }, randomTime());
  })
}

function req2(dataFromReq1) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      var data = {
        "items": [{
          "name": "小黑姐姐",
          "age": 20
        }, {
          "name": "小黑",
          "age": 233
        }, {
          "name": "姐姐",
          "age": 250
        }],
        "nextPage": "gwdfx",
        "lastPage": "asdfa"
      };
      console.log(dataFromReq1);
      var finalUserData = dataFromReq1.items.concat(data.items); //将两次得到的用户数据合并
      resolve(finalUserData);
      console.log("请求2完成");
    }, randomTime());
  })
}

//让数据在promise链上欢快的传递吧～
req1().then(req2).then(function (data) {
  console.log(data);
});
```

* Q: 什么时候需要返回一个promise呢？
A: 当你的需求逻辑是，XXX的执行需要依赖OOO的结果，此时OOO就应该返回一个promise

* Q: 为什么req1要打括号，而req2不打括号？
A:这个我也没太搞清楚XD，我的理解是，```req1()```打括号执行后才会返回promise，不打括号就只是一个没有执行的函数，```req2```不打括号是因为then的入参只能是一个**函数**，如果打了括号执行后就不是函数了。

* Q: 最后一个then的function(data) data是哪里来的？
A: ```req2```的定义中，有一句```resolve(finalUserData)```，在Promise Chain中，每个then的入参的入参也就是function(data)中的data都是由前一个promise resolve时传递而来的

[^1]: https://github.com/alsotang/node-lessons/tree/master/lesson17
[^2]: http://web.jobbole.com/82601/