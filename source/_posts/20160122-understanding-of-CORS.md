title: 对浏览器跨域问题的一些理解
date: 2016-01-22 15:08:33
tags: [CORS, corss domain, 同源策略, 跨域, 浏览器]
---
### 问题宝宝
#### 1 移动应用开发
之前用Ionic写mobile app，移动app自然是少不了调用RESTful API的数据。
开发的时候用浏览器进行调试，然后console里不停的出现下面的提示(**Access-Control-Allow-Origin**)：
```
XMLHttpRequest cannot load http://samlino.local/cag/get_leads. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:63342' is therefore not allowed access.
```
而我当时的解决方法是，在chrome装了一个叫[Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)的扩展，启用之后就不报错了。

也不知道什么什么原理，反正就这么一直用着。（不思进取）

#### 2 网络应用开发
后来写单页应用（SPA），静态文件的js里调用各大公司的API， github、facebook什么的，反正从来没有报过上面的错…
另外还写过用NodeJS做中间层，从NodeJS去API拿数据然后渲染再发到前端，也从来没报过错…

最近的一个case是，我们有用AWS API Gateway, Lambda, DynamoDB搭建的API，API被调用的时候就会trigger一系列的任务。然后有个小哥偷懒不想写PHP，想在前端直接请求AWS的API。于是问题来了…
- 浏览器不停的提示No 'Access-Control-Allow-Origin'的错误， 拿不到任何返回的数据。
- 但是！服务器该做的job却都做了！

这根本不科学啊！！！所以？到底是什么鬼？！

### 同源策略(Same Origin Policy) 
同源策略就是只有访问的内容来自**相同协议、相同主机、相同端口**的内容[^1]时，才会加载访问得到的内容。**浏览器是同源策略的一种实现**

- 协议：`location.protocol`，http和https是两种不同的协议
- 主机：`location.host`，不同子域名之间都算跨域，例如www.baidu.com, tieba.baidu.com是两个不同的源
- 端口：`location.port`


### CORS 
之前脑子里大概有个[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)的概念，然后一直以为是服务器拒绝从浏览器跨域访问…因为要解决自己call自己不同域名下的API问题，就是去服务器设置一下header…但其实是都是浏览器在作怪…

在浏览器中，允许跨域访问的资源的一些例子[^2]：
`<script src="..."></script>`
`<link rel="stylesheet" href="...">`
`<img>` `<video>` `<audio>`
`<object>` `<embed>` `<applet>`
`@font-face`
`<frame>` `<iframe>`

### Response Headers
先看看可以在浏览器中跨域请求的别人家(github)的API返回的header：
```
Access-Control-Allow-Credentials:true
Access-Control-Allow-Origin:*
Access-Control-Expose-Headers:ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval
...
```
看看自家API返回的header
```
Connection:keep-alive
Content-Encoding:gzip
Content-Type:text/html
Date:Fri, 22 Jan 2016 07:07:01 GMT
...
```
差别就在于别人家的API返回了**Access-Control-Allow-Origin:\***
浏览器读到这个头部之后，才会加载请求的结果。

### 跨域的时候服务器收到请求了吗？
服务器当然收到请求了，不然怎么能返回头部…而且我上面举的诡异的例子中，请求trigger的job都完成了。

所以也就是说，服务器其实收到了你的请求，并且给你返回了全部的数据，但是浏览器看到头部就把body藏起来了，然后抛出错误提示…

### 为什么浏览器不允许跨域访问？
当然是为了安全……但是这个有点不太好理解，api拿点数据有什么不安全的？！

下面这个例子比较清楚的说明同源策略是如何避免安全问题的：[^3]
网站A：利用iframe伪装的银行网站
网站B：真正的银行网站
如果没有同源策略：
1.当用户来到A网站，以为是真的银行网站，然后输入自己的账号、密码（此时用户的账号、密码已经被网站A获取了）
2.网站A利用ajax把账号密码发到真正的银行网站B，然后银行网站返回一个带有token的form需要用户输入手机验证码。
3.网站A获得这个form之后显示出来，让用户填入手机验证码……至此，网站A获得了账号、密码、手机验证码，已经可以登陆用户的账号了。

而当有同源策略时，到第2步的时候，网站A根本无法获取银行网站返回的带token的form，所以就算有了账户和密码，也无法操作用户的账户。

当然啦，银行的加密机制肯定没有我描述的这么弱智，不然还要U盾之类的东东干嘛，这只是一个为了方便理解安全问题而杜撰的例子…

### 好奇宝宝
不知道chrome的这个插件[Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)，是怎么实现允许跨域请求的。
之前发现启用插件的时候，github上的小图标全都不显示了…

[^1]: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
[^2]: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Cross-origin_network_access
[^3]: http://stackoverflow.com/questions/9222822/why-do-browser-apis-restrict-cross-domain-requests
