title: jQuery中利用JSONP进行跨域GET请求
date: 2016-02-17 12:31:55
tags: [jQuery, CORS, JSONP, 跨域]
---
每次遇到跨域的问题真是！@#￥%

我对`JSONP`的一些浅显的理解就是，有时候会看到类似`http://xxx.xx.com/?callback=xxx`这样的请求（`callback=`也可能是`jsonp=`也可能是`jsonpcallback=`，这个取决于服务器端是怎么实现jsonp的），这样的请求做的事情简单的来说就是等得到所有数据之后就执行回调函数。

由于这个回调函数已经发给了服务器，返回的结果其实是一个函数，函数的入参是获取的数据。

jQuery的ajax请求其实能很简单的在客户端进行跨域GET请求，具体如下：
```
var options = {
  url: 'http://xx.xx.com/xxx',
  method: 'GET',
  dataType: 'jsonp',
  //jsonp: 'callback',
  success: function(data){
    //do something here;
  }
};

$.ajax(options);
```

其中需要注意的是，一定要声明**`dataType`**，然后把回调函数写在success后面就可以了。
另外一开始提到，服务器端对jsonp的实现可能不同，所以在`options`中，有时候需要声明`jsonp`对应的字符串，默认是`"callback"`。例如：如果服务器实现jsonp是通过``http://xxx.xx.com/?jsonpcallback=xxx``，那么就需要在`options`中声明`jsonp:'jsonpcallback'`

原理据说和`<script src="...">`差不多，我现在还不是很明白=，=

参考
http://www.runoob.com/json/json-jsonp.html
