title: X-WSSE验证中关于SHA1编码方式的一些坑
date: 2015-12-11 17:08:38
tags: [X-WSSE, WSSE, auth, SHA1]
---
不知道为什么，关于X-WSSE验证的中文资料很少，英文资料也不是很多，能搜到的资料年代都非常久远，最早可追溯到2003年[^1]，可能这种验证方式太古老而且存在什么弊端，所以在随后的很多年里人们发现、发明了其他更常用的验证方式？

关于HTTP的各种验证方式我其实一种都不知道…X-WSSE这一种奇怪的方式是我在整合Emarsys的API时了解到的。由于自身比较懒，就到Github上搜搜有没有现成的能够生成UsernameToken的包可以用，以省去重复发明轮子的功夫，然而掉进了坑里，与[node-wsse](https://github.com/bouzuya/node-wsse)的作者大战了好几个回合…

此文章不讨论验证的原理，只讨论X-WSSE UsernameToken的生成方式，其中主要是生成**passwordDigest**。
验证嘛，用户名username，密码password肯定是少不了的，此外还需要nonce，timeStamp，有了这几样再按照下面的步骤一步步就可以生成符合WSSE标准的token了。

UsernameToken的生成一共需要**5个步骤**：
1. 生成一个随机字符串nonce。不同公司的API对这个nonce的要求可能会不同，有一些要求采用```base64```编码方式，比如[symfony给出的例子](http://symfony.com/doc/current/cookbook/security/custom_authentication_provider.html#the-authentication-provider)；
2. 时间戳（timeStamp）。对于时间戳，统一采用[ISO-8601](http://baike.baidu.com/view/931641.htm)格式的字符串，但是不同公司的API对时区（timezone）的要求可能会不同，比如Emarsys要求UTC，Adobe要求GMT；
3. 把nonce，timeStamp，password这三个字符串按顺序连接起来形成一个新的字符串，并将这个字符串按照[SHA1](http://baike.baidu.com/view/1228622.htm)方法加密。
**坑来啦，坑来啦，坑来啦！！！**
一个字符串通常加密之后密码摘要默认是binary的，比如Adobe[^2]，但有些公司可能要求以hex方式生成摘要…比如万恶的Emarsys[^3]…而关于这个摘要到底应该是binary还是hex，据说业界也是模糊不清的，只能由着各家公司按自身情况使用两种方式中的某一种来实现验证[^4]；
4. 把上一步得到的密码摘要按照```base64```进行编码，就能得到passwordDigest；
5. 按照以下方式拼接字符串，把各个双引号内换成上面步骤所提到的值，即可得到UsernameToken，看起来长这样：

``` 
UsernameToken Username="username", PasswordDigest="passwordDigest", Nonce="nonce", Created="timeStamp"
```

[^1]: http://www.xml.com/pub/a/2003/12/17/dive.html
[^2]: https://marketing.adobe.com/developer/cn/documentation/authentication-1/wsse-authentication-2
[^3]: http://documentation.emarsys.com/resource/developers/api/getting-started/authentication/
[^4]: http://book.soundonair.ru/web/web2apps-CHP-11-SECT-1.html#web2apps-CHP-11-SECT-1.8
