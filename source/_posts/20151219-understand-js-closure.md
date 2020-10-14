---
title: 对JS闭包(Closure)的一些理解
date: 2015-12-19 19:22:27 +8
tags: [JS, closure, 闭包]
category: JS
---

昨天无聊在 github 上看代码，看到如下片段，反正看不太懂这是在干啥，但这就是传说中的闭包了…

```js
function isType(type) {
  return function (obj) {
    return {}.toString.call(obj) === '[object ' + type + ']';
  };
}
```

_以上来自目测是个阿里女神的 repo: [utilx](https://github.com/fool2fish/utilx/blob/master/lib/index.js)_

很久之前就听过**闭包**这个概念，看了一些相关的资料，依旧无法明白到底是个什么东东。各种作用域 scope，看得我头都大了。\_(:з」∠)\_

我在这里呢，也不会讲继续什么变量作用域，什么从外部读取局部变量之类的！@#￥%…的东东，我试图用最简单粗暴连隔壁卖红薯的大妈都能理解的方法，来说说我对闭包的理解。

###闭包长什么样子？

```js
function bibao(a) {
  return function (b) {
    return a + b;
  };
}
```

上面的例子就是一个闭包。
我的理解是，闭包有这么几个元素：

1. 最外层是一个有名字的函数，通常都需要传入参数或者在这一层定义一些变量。
2. 这个有名字的函数返回一个匿名函数，通常都需要传入参数或者定义一些变量。
3. 这个匿名函数返回的值通常跟上面两点中的入参或者变量有关。

### 如何使用闭包？

这个问题其实也就是说，当你调用闭包的时候你其实是在调用什么？
我觉得搞清楚这个问题对于简单粗暴的理解闭包非常有用。

用上面的闭包作为例子，通常闭包是这么用的：

```
//例1，分两次传入参数
var hello = bibao('你好')；
var text = hello('小白妹妹');
console.log(text); //你会看到 你好小白妹妹
```

上面这个例子，其实就是：

```
//例2，一次传入两个参数
var text = bibao('你好')('小白妹妹')
```

所以基本上可以理解为，有这么一个函数`bibao(a)(b)`，调用的时候需要传入两个参数`a`和`b`，你可以**分开传**，也可以**一起传**。

大多数情况下，都是像例 1 一样，分开两次传入参数的。当你分开传的时候，第一次传入参数`a`，也就是`var hello = bibao('你好');`其实等于：

```js
var hello = function (b) {
  return '你好' + b;
};
```

所以当你给`hello()`传入参数`b`的时候，`var text = hello('小白妹妹')`，返回的是“你好小白妹妹”。也就等于说，当你在调用`hello()`这个函数的时候，其实访问到了 bibao()这个函数中的变量`a`，值为'你好'。

闭包中`a`是定义在匿名函数外部的，这就是传说中的：**内部函数可以访问外部函数的变量**。

### 为什么要使用闭包？使用闭包有什么好处？

我有一个强烈的感觉闭包是一个懒人发明的…（当然我是瞎说的\_(:з」∠)\_）
假如我的老板认识了一大堆妹子，要我写个程序跟她们每个人说早安、午安、晚安，并告诉他们昨天是几号，最后还要问候他的老婆，“吃饭了吗？亲爱的”
通常我会这么实现：

```js
function yesterday() {
  return new Date().getDate() - 1;
}
function goodmorning(name) {
  return '早安' + name + '昨天是' + yesterday() + '号';
}
function goodafternoon(name) {
  return '午安' + name + '昨天是' + yesterday() + '号';
}
function goodnight(name) {
  return '晚安' + name + '昨天是' + yesterday() + '号';
}
//eating()这个函数不一定非要定义，可以直接console.log()也能满足需求，
//但是想到老板将来又会去问候其他的人，吃饭了吗？xxx，
//所以定义了一个函数，以便将来可以偷懒
function eating(name) {
  return '吃饭了吗？' + name;
}
var list = ['小白妹妹', '小红妹妹', '小黑妹妹', '小灰妹妹'];
list.forEach(function (item) {
  console.log(goodmorning(item));
  console.log(goodafternoon(item));
  console.log(goodnight(item));
});
console.log(eating('亲爱的'));
```

使用闭包这么实现：

```js
function yesterday() {
  return new Date().getDate() - 1;
}
function bibao(greeting) {
  return function (name) {
    return greeting + name + '昨天是' + yesterday() + '号';
  };
}
var goodmorning = bibao('早安');
var goodafternoon = bibao('午安');
var goodnight = bibao('晚安');
var list = ['小白妹妹', '小红妹妹', '小黑妹妹', '小灰妹妹'];
list.forEach(function (item) {
  console.log(goodmorning(item));
  console.log(goodafternoon(item));
  console.log(goodnight(item));
});
var eating = bibao('吃饭了吗？');
console.log(eating('亲爱的'));
```

可以看到，使用了闭包就不用重复定义**行为类似**的函数，`+ name +'昨天是' + yesterday() + '号';`这个也只用写一遍就可以了，免去了很多重复劳动，看起来简洁了很多，最重要是…显得逼格高…

### 什么时候用闭包？

我自己的感觉是，当你需要定义很多行为类似的函数的，重复写很多基本类似的内容的时候，就可以考虑用闭包来让整个代码的结构更加简洁。（总觉得使用闭包，可读性就不那么强了，毕竟我这种小白还是不太一眼就看得出来一个闭包到底输入啥返回啥的…）

另外就也不太清楚具体的使用场景了，反正我平时很少用到…少用到的可能有这么几个：

- 对闭包的理解不够深入，其实还是不太知道这个东东到底干啥用的
- 通常用别的简单粗暴的方法来代替闭包实现的功能，简单的来说比如一个人不知道 switch，但是知道 if else，于是用 if else 来实现跟 switch 一样的功能

我不知道有没有什么情况是除了闭包就没办法解决的…如果没有…那么用其他方法代替实现就可以了，实在搞不明白也没什么关系…

### 使用闭包的坏处？

据说是可能出现内存泄露的问题[^1]，这个就更高深了…以后有了深入的理解再来补充吧

[^1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript#内存泄露
