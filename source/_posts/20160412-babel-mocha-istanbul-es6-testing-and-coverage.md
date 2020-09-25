---
title: 结合使用Babel Mocha Istanbul进行ES6代码测试和覆盖率测试
date: 2016-04-12 12:32:01
tags: [ES6, mocha, istanbul, babel, 测试, 代码覆盖率]
category: TOOLS
---

题外话：
一直以为 mocha 读作“抹茶”并且一直这么读了很久，直到最近看了一个 mocha 的教学视频，才知道这是摩卡咖啡的摩卡…而抹茶的抹茶应该是 matcha…

在还没有 babel 的时候，一切都很简单，基础的问题就先不讨论了，这里主要记录一下 Babel 转码和 Istanbul 测覆盖率的一些坑。

### 基本设置

通常我们会有好几个文件夹，例如

- `src`用来存放源文件，也就是包含 es6,7 的代码；
- `lib`用来存放编译后的代码
- `test`用来放测试脚本

在`test`文件夹下，通常有一个`mocha.opts`文件用来存放 mocha 的参数

```
--compilers js:babel-register
--require babel-polyfill
```

如果用到了需要用 babel-polyfill 才能实现的方法就需要加上第二句，别忘了`npm install babel-polyfill --save-dev`

生成覆盖率的测试命令：（`_mocha` 是有下划线的）[^1]

```
istanbul cover _mocha --  --opts ./test/mocha.opts
```

### 编译

```
babel src/ -d lib/ --presets es2015 --source-map both
```

使用`--source-map both`参数将会生成 source map，有了 source map，istanbul 就能够追踪到`src`下的源代码的覆盖率

### 正确的 require

在 mocha 中，一定要 require `src`文件夹下的文件，而不是`lib`文件夹下的文件。虽然两个文件夹下的文件 mocha 都能测，但是覆盖率会有一些问题。

### 可能的问题

- 出现以下错误提示时，很可能因为 istanbul 的版本过低，使用`1.0.0-alpha.2`版本可以正常运行

```
No coverage information was collected, exit without writing coverage information
```

- istanbul 生成的覆盖率文件里代码几乎都是**红色**的，这是因为编译时没有 `--source-map both` 参数，追踪的是`lib`文件夹下的覆盖率
- istanbul 生成的覆盖率文件总是显示 100%，就算有些地方没测，也显示 100%，这是因为在 Mocha 里 require 的是`lib`而非`src`

### 其他

我最喜欢 mocha 的报告形式是`-R nyan`，一只可爱的喵星人，没有错的时候是这样的^\_^，有错的时候是这样的 O_O，反正就是萌萌萌。

然而最实用的报告形式可能是`-R mochawesome`，需要`npm i mochawesome`安装插件，生成直观的 html 测试报告[^2]

平时遇到的问题十有八九一搜都能找到阮一峰老师的教程…这覆盖率也太高了？！

### 参考

[1] http://www.ruanyifeng.com/blog/2015/06/istanbul.html
[2] http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html
[^1]: http://www.ruanyifeng.com/blog/2015/06/istanbul.html
[^2]: http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html
