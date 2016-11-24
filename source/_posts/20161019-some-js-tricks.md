title: 一些js小技巧
date: 2016-10-19 15:08:33
tags: [js, tricks, js小技巧]
---
一直以为这篇已经发过了，结果前两天搜的时候发现搜不到。一直扔在草稿里，今天整理一下之前和最近学到的一些JS小技巧

### 利用位运算取整
利用位运算，与、或、异或、左右移位，`&` `|` `^` `>>` `>>>` `<<` ，舍去小数点后的数字[^1][^2]，[jsPerf](http://jsperf.com/coercion-vs-casting/3)
```
var a = 6.54321;
console.log(a | 0); //6
console.log(a & 0); //6
```
> 按位**非非**运算也是可以的，所以你也可以用**呻吟号**把代码写成这样`~~a`

### + 字符串转换为数字
利用加号 `+` 将数字字符串转换为数字类型
```
var a = "56789";
var b = +a;
console.log(typeof b); //number
console.log(b); //56789
```
> - 只能是十进制
- 如果`a`是非数字字符串，则会返回`NaN`

### !! 强制转换为布林类型
利用`!!`将变量类型强制转换为`boolean`类型

``` 
var a=123;
typeof a; //nmuber
typeof !!a; //boolean
```

### 避免`can not read property ‘xxx’ of null`的小技巧
经常会遇到的一个情况是下面的代码会报错`can not read property 'c' of null`

```
if(a.b.c === 1){
    //do something
}
```

以前自己的写法以及经常见到的写法是这样

```
if(a && a.b && a.b.c === 1){
    //do something
}
```

前几天看到一个逼格很高的写法，不过我觉得括号太多了，容易写错，而且也没有上面的那种写法简单。不过还是要记录一下，以免以后见到不知道是什么意思。

```
if(((a||{}).b||{}).c === 1){
    //do something
}
```

### || 设置默认值

```
function abc(a, b){
    a = a || 1; 
    b = b || 2;

    return a + b;
}

abc(); //3
abc(5); //7
```

有一些情况下函数中需要设置默认值，经常看到有人的写法是`typeof`先判断这个参数是不是`undefined`然后再赋值，这种写法实在是太麻烦了……上面的是懒人写法

感觉善用`||`和`&&`还是能搞出很多黑科技的。

以上，是为打酱油博客一篇。

[^1]: https://github.com/hexojs/hexo-cli/blob/master/lib/goodbye.js
[^2]: http://www.cnblogs.com/kkun/archive/2012/01/30/2332309.html