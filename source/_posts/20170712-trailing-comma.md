---
title: 尾逗号(Trailing Comma)的意义
date: 2017-07-12 11:01:13
tags: ['trailing comma', 'comma-dangle', 尾逗号, 版本控制]
categories: 'CODE STYLE'
---
以前在网上看别人写的代码，有时候会看到这样，数组的最后一个元素后面多一个逗号：
```
var foo = [
    1,
    2,
    3,
];
```
作为一个懒癌晚期患者，觉得要多加一个逗号，真是好麻烦！那是naive的我，当然还不知道有版本控制diff这种高级工具，还停留在复制粘贴文件夹的人工版本控制低级阶段…

后来看到几家大厂的代码规范[^1], [^2]中都有相应的规范。Airbnb的JS代码规范是非常火的，然而最开始的时候我个人比较喜欢的是Google的JS代码规范，就因为A家有我不喜欢的trailing comma。没想到，过了一段时间之后，G家也采用了这一条…而恰好也是这段时间，我一直在思考为什么有的人要把代码写的那么不clean？多年的经验告诉我，所有规则一定都是有原因的！

传图好麻烦…我就文字描述一下吧。凡是用过git的人应该都知道有diff view这种东西，用来比较两个版本的代码有什么区别。没有尾逗号的时候，当你需要添加一个元素，就需要在最后一个元素的**1. 末尾加上一个逗号，2.换行添加新内容**，如下面的例子所示。

Before
```
var foo = [
    1,
    2
];
```

After
```
var foo = [
    1,
    2,
    3
];
```

这样一来，diff view中就会显示修改了**两行**代码。如果使用尾逗号，则添加一个元素只需要**1.换行添加新内容**即可，diff view中显示只修改（添加）了一行代码。

### 一点人生感悟
这个世界上，凡事都是trade off，算法复杂度里要么时间换空间要么空间换时间。  
尾逗号也一样，想要diff view clean，代码就不那么clean；想要代码clean，diff view就不那么clean。  
所以搞清楚自己想要什么，又有什么可以去trade off，就很重要了。

### Reference
[1] https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8
[2] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas

[^1]: https://github.com/airbnb/javascript#functions--signature-invocation-indentation
[^2]: https://google.github.io/styleguide/jsguide.html#features-arrays-trailing-comma


