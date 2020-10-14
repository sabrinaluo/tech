---
title: Cookie在前端和后端的设置
date: 2016-02-29 14:04:57 +8
tags: [cookie]
---

http 协议什么的，不知道跟通信有没有关系…作为一个通信科班出身的硬~~汉~~妹，对各种协议基本上只能说出名字，别的一窍不通=，= 所以当我知道 cookie 原来是在 header 里的时候，当时我就震惊了…

在服务器端，各种框架都已经包装好了方便设置 cookie 的方法，比如 nodejs 的 express，php 的 codeignitor、laravel（我居然都被迫写过 php 了，真是逼良为娼…）

为什么要了解设置 cookie 的原理呢？了解了才能在某些时候用最原始的方法来设置 cookie，比如没有框架可用的时候，以及框架提供的方法不适用于某些场景的时候。
我是在使用 laravel 设置 cookie 的时候踩了坑，现在的项目里因为要配合使用 GTM（google tag manager），所以 cookie 是不加密的 raw data，但通过 laravel 设置的 cookie 都是加密了的。于是只能学习 PHP 原生的添加 cookie 方法。`setcookie(NAME, VALUE, EXPIRES)`

另外就是因为用 AWS API Gateway 时候的一些需求，想要通过 gateway 直接设置 cookie，这个时候就不得不了解 http cookie 的运作方式。

### response cookie 从服务器端返回新 cookie

设置 cookie 是通过在响应的头部加入`Set-Cookie`来设置的，

> - 一个请求通常包含 header 和 body

- 与请求有关的 cookie 分为 request cookie 和 response cookie
  - request cookie 是浏览器已储存的 cookie
  - response cookie 是服务器端返回的新的 cookie，也就是将会储存在浏览器端的新 cookie

#### 一个完整的 cookie header

一个完整的 cookie 头长这样

```
Set-Cookie: NAME=VALUE; expires=DATE; path=PATH; domain=DOMAIN
```

NAME VALUE 是一对键值
expires 是过期日期，通常用当前时间的毫秒数加上一段时间：`new Date().getTime()+30*24*60*60*1000)`，然后**需要调用`toUTCString()`方法**
如果不设置 expires，在浏览器中这个 cookie 将被当做 session 对待，也就是关闭了浏览器 cookie 就消失
path 和 domain 这个…感觉不太用得到，具体可以看[这篇文章](http://blog.sina.com.cn/s/blog_70c4d9410100z3il.html)

如果要同时设置多个 cookie，同时返回多个`Set-Cookie`头即可

#### maxAge

有一些服务器端的框架会提供 maxAge 属性来设置 cookie 的过期时间，但是原始的 Set-Cookie 头是不支持 maxAge 的，所以在通过头部来设置 cookie 还是乖乖用回 expires 吧

### 浏览器端读取 cookie

JS 原生方法：

```js
var cookies = document.cookie;
```

读取的 cookie 是一个分号分隔的包含所有 cookie 键值字符串，可以通过正则表达式来提取需要的 cookie

```js
var cookieA = document.cookie.replace(
  /(?:(?:^|.*;\s*)cookieA\s*\=\s*([^;]*).*$)|^.*$/,
  '$1'
);
```

### request cookie 浏览器端设置 cookie

```js
document.cookie = 'cookie_example=123' + ';expires=' + expire + ';path=/';
```

如果要设置多个 cookie，多次调用`document.cookie`即可

#### document.cookie

这个 document 的 behavior 有点奇怪，明明返回的是个字符串，本来以为每次设置 cookie 得用新的字符串连接旧的字符串，但其实直接等于新的值也并不会覆盖旧的值，不知道实现这个属性&方法混用的原理是什么 0,0

####NOTE
通常设置 cookie 的时候都会把 path 设置为`/`，这样同一个域名下，所有路径都共用一个 cookie
如果没有设置 path，某些框架可能默认会使用创建 cookie 时的路径作为 path，这样就可能存在多个 path 不同的同名 cookie。

####工具

- 在浏览器端，可以使用 chrome 的扩展*EditThisCookie*来查看和编辑 cookie
- 如果是从服务器端写入的 cookie，可以在 F12 network 选项卡中选中请求，有 cookie 的时候会有一个 cookie 选项，能看到 request cookie 和 response cookie
