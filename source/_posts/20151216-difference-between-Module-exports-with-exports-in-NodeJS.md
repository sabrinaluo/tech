---
title: 对module.exports和exports的一些理解
date: 2015-12-16 11:00:27 +8
tags: [NodeJS, Module.exports, exports, 模块导出]
category: NodeJS
---

可能是有史以来最简单通俗易懂的有关 Module.exports 和 exports 区别的文章了。

**`module.exports`和`exports`的区别就是`var a={}; var b=a;`，a 和 b 的区别**

看起来木有什么太大区别，但实际用起来的时候却又有区别，这是为啥呢，请听我细细道来

关于 Module.exports 和 exports 有什么区别，网上一搜一大把，但是说的都太复杂了…
听说 exports 是 Module.exports 对象的一个引用(reference)[^1]，什么是引用？！…\_(:з」∠)\_

当然啦，如果要彻底理解这两个导出的区别，最好肯定是去看源码，看看都是怎么封装的，功力深厚的童鞋应该一看就懂了。不过，源码我也是看不懂的…(ಥ_ಥ)

但是最近感觉杂七杂八看了好多文章做了好多实验之后，像是打开了任督二脉，机智的我好像有点上道了…

# module

首先要明确的一点，module 是一个**对象** `{Object}`。
当你新建一个文件，比如 mo.js，文件内容如下：

```js
console.log(module);
```

然后在 CMD 里执行这个文件`node mo.js`，就能看到 module 其实是一个 Module 实例，你可以这么理解，NodeJS 中定义了一个 Module 类，这个类中有很多属性和方法，exports 是其中的一个属性：

```js
function Module {
  id : 'blabla',
  exports : {},
  blabla...
}
```

当每个 js 文件在执行或被 require 的时候，NodeJS 其实创建了一个新的实例`var module = new Module()`，这个实例名叫`module`。
**这也就是为什么你并没有定义`module`这个变量，却能 console.log 出来而不会报错的原因**。

# module.exports

假设我有一个 JS 文件内容如下：

```js
console.log(module); //你会看到Module中的exports为空对象{}
module.exports = {
  print: function () {
    console.log(12345);
  },
};
console.log(module); //你会看到Module中的exports对象已经有了print()方法
```

有了上面的基础，很容易理解`module.export`其实是**给 Module 实例中的 exports 对象中添加方法/属性**。

# exports

通常使用 exports 的时候，是这么用的：

```js
exports.print = function () {
  console.log(12345);
};
```

假设我有一个 JS 文件内容如下：

```js
console.log(module); //你会看到Module中的exports为空对象{}
console.log(exports); //你会看到Module中的exports为空对象{}
module.exports = {
  print: function () {
    console.log(12345);
  },
};
console.log(module); //你会看到Module中的exports对象有了print()方法
exports.name = '小白妹妹';
console.log(module); //你会看到Module中的exports对象不仅有了print()方法，还有了name属性
```

由此也能看出，传说中的**`exports`其实是`module.exports`的引用**，你可以这么理解，NodeJS 在你的代码**之前**悄悄的加了以下代码：

```js
var module = new Module();
var exports = module.exports;
```

**这也就是为什么你并没有定义`exports`这个变量，却能 console.log 出来而不会报错的原因**。

# require

当你从外部调用某个模块，require 其实是在 require 什么？[^2]
require 的时候 NodeJS 会~~到处~~去找有没有这个模块，如果有，return 的就是 module.exports 里的东东。

# DOs & DONTs

- √ 你可以这样：

```js
module.exports.name = '小白妹妹';
exports.age = 10;
module.exports.print = function () {
  console.log(12345);
};
```

如果只是使用`.`来添加属性和方法，`module.exports`和`exports`混用是完全可以的，这种情况下，感觉`exports`就是给懒人用的…毕竟能少写几个 7 个字符呢！

- √ 也可以这样：

```js
module.exports = {
  name = '小白妹妹';
};
exports.age = 10;
module.exports.print = function(){console.log(12345)};
```

- **× 但不可以这样**：

```js
module.exports = {
  name = '小白妹妹';
};
exports = {age:10}; // exports现在是{age:10}这个对象的引用，不再是module.exports的引用了
console.log(module); //你会看到Module的exports中只有name属性！！！
```

- **× 也不可以这样**：

```js
exports.age = 10;
console.log(module); //你会看到Module的exports中多了age属性
module.exports = {
  name = '小白妹妹';
};
console.log(module); //你会看到Module的exports中还是只有name属性！！！
```

# 总结

还是那一句话，`module.exports`和`exports`的区别就是`var a={}; var b=a;`，a 和 b 的区别

> - 改变`exports`的指向后所添加的`exports.xxx`都是无效的。因为 require 返回的只会是`module.exports`

- 不能在使用了`exports.xxx`之后，改变`module.exports`的指向。因为`exports.xxx`添加的属性和方法并不存在于`module.exports`所指向的新对象中。

感觉自己说的还是挺清楚哒～
不管你清不清楚，我反正是清楚了。\_(:з」∠)\_
[^1]: https://nodejs.org/dist/latest-v4.x/docs/api/modules.html#modules_exports_alias
[^2]: https://nodejs.org/dist/latest-v4.x/docs/api/modules.html#modules_module_require_id
