title: Cookie在前端和后端的设置
date: 2016-02-29 14:04:57
tags: [cookie]
---
http协议什么的，不知道跟通信有没有关系…作为一个通信科班出身的硬~~汉~~妹，对各种协议基本上只能说出名字，别的一窍不通=，= 所以当我知道cookie原来是在header里的时候，当时我就震惊了…

在服务器端，各种框架都已经包装好了方便设置cookie的方法，比如nodejs的express，php的codeignitor、laravel（我居然都被迫写过php了，真是逼良为娼…）

为什么要了解设置cookie的原理呢？了解了才能在某些时候用最原始的方法来设置cookie，比如没有框架可用的时候，以及框架提供的方法不适用于某些场景的时候。
我是在使用laravel设置cookie的时候踩了坑，现在的项目里因为要配合使用GTM（google tag manager），所以cookie是不加密的raw data，但通过laravel设置的cookie都是加密了的。于是只能学习PHP原生的添加cookie方法。`setcookie(NAME, VALUE, EXPIRES)`

另外就是因为用AWS API Gateway时候的一些需求，想要通过gateway直接设置cookie，这个时候就不得不了解http cookie的运作方式。

### response cookie 从服务器端返回新cookie
设置cookie是通过在响应的头部加入`Set-Cookie`来设置的，
> - 一个请求通常包含header和body
- 与请求有关的cookie分为request cookie和response cookie
  - request cookie是浏览器已储存的cookie
  - response cookie是服务器端返回的新的cookie，也就是将会储存在浏览器端的新cookie

#### 一个完整的cookie header
一个完整的cookie头长这样
```
Set-Cookie: NAME=VALUE; expires=DATE; path=PATH; domain=DOMAIN
```
NAME VALUE是一对键值
expires是过期日期，通常用当前时间的毫秒数加上一段时间：`new Date().getTime()+30*24*60*60*1000)`，然后**需要调用`toUTCString()`方法**
如果不设置expires，在浏览器中这个cookie将被当做session对待，也就是关闭了浏览器cookie就消失
path和domain这个…感觉不太用得到，具体可以看[这篇文章](http://blog.sina.com.cn/s/blog_70c4d9410100z3il.html)

如果要同时设置多个cookie，同时返回多个`Set-Cookie`头即可

#### maxAge
有一些服务器端的框架会提供maxAge属性来设置cookie的过期时间，但是原始的Set-Cookie头是不支持maxAge的，所以在通过头部来设置cookie还是乖乖用回expires吧

###  浏览器端读取cookie
JS原生方法：
```
var cookies = document.cookie;
```
读取的cookie是一个分号分隔的包含所有cookie键值字符串，可以通过正则表达式来提取需要的cookie
```
var cookieA = document.cookie.replace(/(?:(?:^|.*;\s*)cookieA\s*\=\s*([^;]*).*$)|^.*$/, "$1");
```
### request cookie 浏览器端设置cookie
```
document.cookie = 'cookie_example=123'+';expires='+expire+';path=/';
```
如果要设置多个cookie，多次调用`document.cookie`即可

#### document.cookie
这个document的behavior有点奇怪，明明返回的是个字符串，本来以为每次设置cookie得用新的字符串连接旧的字符串，但其实直接等于新的值也并不会覆盖旧的值，不知道实现这个属性&方法混用的原理是什么0,0

####NOTE
通常设置cookie的时候都会把path设置为`/`，这样同一个域名下，所有路径都共用一个cookie
如果没有设置path，某些框架可能默认会使用创建cookie时的路径作为path，这样就可能存在多个path不同的同名cookie。

####工具
- 在浏览器端，可以使用chrome的扩展*EditThisCookie*来查看和编辑cookie
- 如果是从服务器端写入的cookie，可以在F12 network 选项卡中选中请求，有cookie的时候会有一个cookie选项，能看到request cookie和response cookie
