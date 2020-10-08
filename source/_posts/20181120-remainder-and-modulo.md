---
title: 取模(mod)和取余(rem) 在数学和计算机中的不同
date: 2018-11-20 12:18:29
tags: [mod, remainder]
category: Math
---

(前几天心情差到爆:(，今天终于心情明媚可以填坑了)

我第一次知道不同语言对于`mod`的不同实现会导致结果不同，真是黑人问号…然后又了解到，在计算机界，取模和取余大都是混为一谈的…

了解取模和取余问题的起因是，想要实现类似循环链表中`tail.next === head`, `head.prev === tail` 的类似功能，由于平时都会用一些 ramda, lodash 之类的 util 库，所以也没想着用 js 自带的`%`，而是直接用了`R.mathMod`[^1]，并且完全没有意识到这两个运算的结果会不同。

先看个 🌰

```js
-5 % 3; // ➡> -2
R.mathMod(-5, 3); // -> 1
```

通常情况下，正数都是没问题的，一般也很少考虑负数的情况，但一旦遇上需要使用负数的时候，就一定掉坑(pitfalls)里了。JS 的话还可以说是不同库的实现方法不同导致结果不同，但是在不同语言里，比如 Python 里和 JS 里，同样是`-5 % 2`，Python 返回的结果是`1`？！

在数学界，取余的方法是统一的，其结果是欧几里得除法(Euclidean division)的余数[^2]；而计算机界，由于编程语言的实现不同或者硬件的不同会导致结果不同。

不过所有的求余方法都满足以下 3 点：

- a = n \* q +r
- q ∈ Z (q 属于整数集合)
- |r| < |n|

但是仅满足这三点的话，当遇到负数时，还是会有正负号的问题，余数的符号到底跟除数还是被除数呢？可能这也是为什么会有不同结果的原因，毕竟这个定义就是不完善的。

## 欧几里得除法 Euclidean division

欧几里得除法中定义，余数永远不为负，r≥0。然后经过哐哐一顿推倒，最终：

```js
r = a - |n| * floor(a/|n|)

e.g.
1 = 7 - |-3| * floor(7 / |-3|) -> 7 - 6
2 = -7 - 3 * floor( (-7) / 3)  -> -7 - (-9)
```

## 截断除法 truncated division

截断除法中，商向 0 取整，余数可以为负，JS 中的`%`使用该定义

```js
r = a - n * trunc(a/n)

e.g.
 1 = 7 - (-3) * trunc(7/(-3)) -> 7 - (-3) * (-2)
-1 = -7 - 3 * trunc((-7)/3) -> - 7 - (3) * (-2)
```

## 取底除法 floored division

```js
r = a - n * floor(a/n)

e.g.
-2 = 7 - (-3) * (-3)
2 = (-7) - 3 *(-3)
1 = 7 - 3 * 2
```

## 常见问题

判断一个数是否为奇数的时候，通常都会想到`x%2===1`，当 x 为负的奇数时，使用这个等式就有问题了…当然啦，不考虑正负数又要正确判断的最简单的还是使用偶数大法，永远也不会出错

```js
function is_odd(x) {
  return x % 2 !== 0;
}
```

## 其他

在不同的语言或库中可能存在各种情况，使用的时候需要特别留意：

- 有些语言中，被除数(dividend)可以为负，但除数(divisor)不能为负。e.g. `R.mathMod(7,-3) -> NaN`
- 有些语言中，可能会有`mod`、`rem`两种方法来区分截断除法和欧几里得除法的不同结果

wiki 抄来的图，红色为商，绿色为余数，其实我不是很看得懂 😅
![img](https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Divmod.svg/250px-Divmod.svg.png)

总的来说，求商的时候会分为向零取整、向下取整、欧几里得除法，读书的时候就最烦数学定义这种东西了，然而现在发现“定义”才是一切的根本，真是悔不当初…

## 参考

[1] https://ramdajs.com/docs/#mathMod
[2] https://en.wikipedia.org/wiki/Modulo_operation#Remainder_calculation_for_the_modulo_operation
[3] http://blog.thpiano.com/?p=1023

[^1]: https://ramdajs.com/docs/#mathMod
[^2]: https://en.wikipedia.org/wiki/Modulo_operation#Remainder_calculation_for_the_modulo_operation
[^3]: http://blog.thpiano.com/?p=1023
