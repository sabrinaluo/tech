---
title: 对generator和yield的一些理解
date: 2016-01-12 17:11:28
tags: [ES6, generator, yield]
category: ES6
---

于是也是入了 ES6 的坑，为什么只有 babel 这种 ES6 转 ES5 的工具，而没有 ES5 转 ES6 的工具呢？可能有，但是我不知道。如果有的话，就能把 5 转成 6，起码看起来逼格高了一大截，也能让我这种还不习惯 ES6 的小白假装会写 ES6…

简单的看了一下相关的概念，觉得还不太理解…就好像最开始看*原型链*一样，花了一年多才慢慢理解继承啊什么的，但`constructor`和`__proto__`之类的东东我也还（4 声）没整明白…真是资质愚钝 QAQ

### generator function

一个 generator 函数大概长这样：

```
function* foo() {
  console.log(111);
  yield 123;
  console.log(222);
  yield 456;
  console.log(333);
}

var a = foo(3); //此时函数不会执行
a.next(); //此时函数执行到第一句含有yield的语句时就暂停了，也就是只打印了 111
a.next(); //此时函数执行到第二句含有yield的语句时暂停，打印了 222
a.next(); //已经没有yield语句了，将会打印333，函数执行完毕
a.next(); //已经没有yiedl语句了，什么也不会打印
```

- 定义的时候多加一个星星号**function\***
- generator 函数中通常都会有 yield，如果没有 yield 那就定义一个普通函数就好了
- 函数不会立即执行，使用`.next()`方法时，函数才会执行；

### yield

yield 到底是一个什么东东呢？操作符？对象？还是别的什么，这个我还没搞明白。

看看阮一峰老师的这个例子，有助于理解参数的一些问题：

```
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next(); // Object{value:6, done:false}
a.next(); // Object{value:NaN, done:false}
a.next(); // Object{value:NaN, done:false}

var b = foo(5);
b.next(); // { value:6, done:false } ，此时x=5，var y还没执行
b.next(12); // { value:8, done:false }，此时x=5，y=24，var z还没执行
b.next(13); // { value:42, done:true }，此时x=5，y=24，
```

当上面的函数运行`b.next(12)`这一句时，x=5，y=24，var z 还没执行，返回对象为{ value:8, done:false }

> Q: 为什么 y=24？
> A: 因为第二个 next 方法的参数传给*上一个 yield*，也就是第一个 yield，所以 var y = 2 \* 12

> Q: 为什么返回对象 value 为 8？
> A: 因为第二个 yield 后面跟的表达式是 y/3，y=24，所以返回的对象 value 为 8

- yield 是一个**暂停的标记**，使用`.next()`方法运行函数时，遇到 yield 就会暂停
- yield 用在表达式中必须加括号扩起来，比如这样`var a = 1 + (yield 1+1)`
- 调用`.next()`方法时会返回一个对象，长这样：`{ value: xxx, done: false }`
  - 有两个 key，一个是 value，一个是 done
  - value 的值是，该次暂停遇到的这个`yield` 后面跟的表达式的值。比如上面的例子中第一次调用`b.next()`时，遇到第一个 yield 而暂停，`var y = 2 * (yield (x + 1));`，yield 后面跟的表达式是(x+1)，所以返回的对象 value 是 6
  - 当`done`为`true`说明后面没有 yield 了，之后再调用`.next()`方法返回的 value 都是`undefined`
  - 如果 generator 函数没有返回值，那么最后一个 yield 之后再调用的`.next()`方法返回的就是`{ value:undefined, done: true }`
  - 如果 generator 函数有返回值，那么最后一个 yield 之后再调用`.next()`方法返回的对象 value 是函数的返回值
- 调用`.next()`方法时，可以传入参数
  - 该参数是传给**上一个 yield**，所以第一次调用`.next()`时不能传入参数。_可能会报错，也可能参数会被忽略，取决于浏览器是怎么实现的_
- 不传入参数时，yield 语句返回的值为`undefined`

### 瞎扯

- 感觉 yield 像一个“函数”，执行的时候遇到这个函数就会暂停
- 这个函数返回的值等于`.next(xxx)`调用时传入的参数 xxx，如果没有参数，返回值就是`undefined`

```
function* foo() {
  console.log(yield);
  console.log(yield);
}
var a=foo();
a.next(); // 遇到第一个yield暂停，什么也不打印
a.next(); // 遇到第二个yield暂停，打印上一句console.log(yield)，由于没有传入参数，yield返回undefined
a.next('hello'); //后面没有yield了，函数执行完毕，打印第二个console.log，由于传入参数，将会打印出hello
```

- yield 用在表达式中必须加括号扩起来，比如这样`var a = 1 + (yield 1+1)`，有点类似于把一个函数写到表达式中要用括号括起来

```
var a = 1 + (function(){return 123}());
```

### 好奇宝宝

- 往`next()`里传入参数的用法，在什么场景下适用？
- 通常是不是都通过`.next().value`来获取当前暂停的`yield`后面的表达式？
