title: 微博开放平台的Basic Auth和OAuth2.0认证
date: 2016-06-20 17:59:09
tags: [OAuth2.0]
---
这篇文章不是讲各种认证方式是怎么实现的，只是简单的介绍如何与微博进行整合。

微博开放平台允许使用api来开发一些与微博相关的应用，微博提供**Basic Auth**和**OAuth2.0**两种认证方式，其中Basic Auth只能用于测试环境。

### Basic Auth
跟名字一样，就是很基本很简单。其本质是使用`username:password`进行`base64`加密之后得到一个token，然后发送的请求中添加一个header `Authorization: Basic token`。

### OAuth 2.0
生产环境中，微博只允许使用这种认证方式，这个比起直接用用户名和密码就要复杂一些。

简单的来说OAuth2.0认证的流程大概是这样：
1. 首先发一个请求去微博，告诉它，我要登陆啦
2. 然后微博返回一个登录页面，等待用户用微博账号登陆
3. 用户登陆之后，页面会跳转到**授权回调页**，这个页面的url会有一个query是`code=`，后面跟着的一串code
4. 当进行其他api调用时，在api后加上query`code=xxx`以及其他要求的参数，比如`client_id`，`client_key`等等即可进行调用

- 开放平台>我的应用>应用信息>基本信息，这里能看到app key和 app token
- 开放平台>我的应用>应用信息>高级信息，这里需要填写授权回调页和取消授权回调页

需要注意的是，在第2步和第3步中，授权回调页的链接一定要和在申请app时填写的**一！模！一！样！**，否则会报错。

比如在app填写的是`http://example.com/auth/`，而api请求时参数写为`http://example.com/auth`，少了个斜杠都是错的…

### 参考
[1]: http://open.weibo.com/wiki/Oauth2/authorize