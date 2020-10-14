---
title: 神奇的toLocaleString, Intl.NumberFormat
date: 2018-01-05 12:00:00 +8
tags: [JS, internationalization, 国际化]
category: JS
---

一如之前提到的，由于我的工作中会接触到很多 internationalization 的内容，对于货币、数字等的 foatmatting 需要特别注意。在我看到这条问题[^1]之前，并不知道`toLocaleString`的用法和作用。我们自己的 codebase 中，关于国际化的部分是写了自己的 service 来实现不同国家的货币格式，经常都有各种 Bug，可以说是非常辣鸡了…

当然也有可能是需要照顾 IE 或者部分手机浏览器，从而限制了`toLocaleString`的使用，具体原因无法追溯…

### 固定整数字符串长度

例如，我们需要显示的数字**值**为 1, 2, 3 ... 10, 11 ..。 100, 200 等等，但希望显示的格式为所有数字都是固定的三位数，001, 002 这样

```js
var number = 1;
number.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false });
// output '001'
```

如果`locale`为`undefined` (上例中为`en-US`)，则默认值为系统的 locale，即`navigator.language`

不使用`toLocaleString`的实现方法：思路是将带转换数字转换为字符串后，在前面补足够多的零，然后用`slice`获取需要的最后若干位数。（我第一次看到这种实现方法的时候觉得，哇，还有这种骚操作！）

```js
var number = 12;
('00' + number).slice(-3);
// → '012'

var number = 1;
('00' + number).slice(-3);
// → '001'
```

### Intl.NumberFormat

当需要格式化的数字较大时（多长算大呢？🤔），为了使性能更好，最好新建一个`Intl.NumberFormat`实例，使用其`format`方法来格式化。

> When formatting large numbers of numbers, it is better to create a NumberFormat object and use the function provided by its `NumberFormat.format` property. [^2], [^3]

```js
var number = 123456.789;
console.log(new Intl.NumberFormat('en-US').format(number));
// → 123,456.789
```

[^1]: https://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit
[^2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
[^3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
