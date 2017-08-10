---
title: 递归实现按顺序执行Promise
date: 2016-01-18 17:23:18
tags: [promise, 递归]
categories: JS
---
**2016-01-24更新**
我还是觉得嵌套多层的promise是反模式，不推荐使用，机智的我学会了另一种不嵌套不递归的方法，请看这里：
(Promise的顺序执行和并行执行](tech/2016/01/23/excecute-parallel-promise-and-sequential-promise)

**以下为原文：**

之前我一直有个疑问，当我有一堆promise的时候，怎么按顺序执行它们呢？

网上搜到的大多数教程都是建一个数组`array`，把promise对象放到数组里，然后数组中的promise全部执行完毕时调用`Promise.all(array)`。然而这只适用于数组中的**promise对象不互相依赖**的情况。

### 问题
我之前提到过一个典型的例子是Facebook的Graph API 中的分页问题（ [Cursor-based Pagination](https://developers.facebook.com/docs/graph-api/using-graph-api#paging)），API的Response如下：
```
{
  "data": [
     ... Endpoint data is here
  ],
  "paging": {
    "cursors": {
      "after": "MTAxNTExOTQ1MjAwNzI5NDE=",
      "before": "NDMyNzQyODI3OTQw"
    },
    "previous": "https://graph.facebook.com/me/albums?limit=25&amp;before=NDMyNzQyODI3OTQw",
    "next": "https://graph.facebook.com/me/albums?limit=25&amp;after=MTAxNTExOTQ1MjAwNzI5NDE="
  }
}
```
简单的一个例子是，当我想要获取一个人的完整好友列表（Friend List），但是这个人好友太多了，分成了很多页。显然这些结果是互相依赖的。我必须先拿到第一页的`paging.next`，才能进行下一次请求。（别跟我说改query string `limit`后面的值，limit是有最大限制的=，=）

### 解决方案
##### 当知道总共有多少页的时候
(假设request是一个返回promise对象的函数,resolve的是上面的json)
- 普通程序员这么做
```
var url = 'http://xxx'; //first page
request(url)
  .then(function(data) {
    return request(data.next);
  })
  .then(function(data) {
    return request(data.next);
  }) //....then then then...
```
其实这么一直then下去也是可以的…

- 二逼程序员这么做
回调函数层层嵌套…Callback Hell。

##### 当不知道总共多少页的时候
不停then的方法就不行了，于是有了文艺的程序员
- 文艺程序员这么做
首先要知道的一点是，当没有下一页的时候，返回的`next=null`，于是我们就有了递归的终止条件。
```
function run(url) {
  if (!url) return;
  while (url) {
    return request(url).then(function(data) {
      run(data.paging.next);
    })
  }
}
var url = 'http://xxx'; // first page
run(url);
```

### 瞎扯
嵌套的Promise其实**可能**是反模式（anti-pattern）[^1]，但是本文中的情况，如果不递归用嵌套的promise，我实在想不出别的办法来了（ (๑•́ ₃ •̀)宝宝心里苦，但宝宝不说）

为什么说可能是呢，因为谷歌一搜“promise anti pattern nesting”，总能搜出一大堆关于嵌套promise是反模式的文章。然而bluebird的wiki[^2]中，并没有提到嵌套的promise是反模式。

所以到底是不是反模式，我也不知道=，=大概的想法是，在能不嵌套的时候就不要嵌套，否则还不如用callback。

能不嵌套的情况是说，then的都是完全不同的promise，如果都是then类似的promise，那么，懒人还是递归吧…

[^1]: http://taoofcode.net/promise-anti-patterns/
[^2]: https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns
