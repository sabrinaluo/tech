---
title: 如何延迟加载script(defer, async)
date: 2018-05-31 15:18:29 +8
tags: [html, head, script, async, defer]
category: HTML
---

`<script>`的下载和执行都会阻塞页面渲染，因此大多数情况下，我们都把`<script>`放在`<body>`的底部，渲染完前面的 html 内容之后才加载和执行 JS。

然而有时由于某些限制，只把某些`<script>`放在`<head>`里，但又不希望页面渲染被阻塞，这种情况下，可以使用`async`或`defer`属性来延迟加载、渲染。

一张图胜过千言万语[^1]
![image](https://i.stack.imgur.com/wfL82.png)

## `<script/>`

如果没有加任何与延迟加载相关的属性，浏览器会先加载、然后执行。这个过程会阻塞后面内容的渲染，也就是说，要等`<script>`加载并执行之后，才会开始渲染之后的内容。

#### 原因

因为可能存在类似需求：在执行脚本时，使用`document.write`，因此需要阻塞渲染

### async

如果添加了`async`属性，浏览器会并行的一边渲染页面一边加载脚本。一旦脚本加载完成，就会执行脚本，执行脚本的过程会阻塞后续内容的渲染。

**!!!注意: 由于是加载完成就立刻执行，因此执行顺序是无法保证的！**
`async`是 html5 中才有的属性，因此需要注意旧的浏览器不支持此属性

### defer

如果添加了`defer`属性，浏览器会并行的一边渲染页面一边加载脚本。等到页面内容完全渲染完成之后才开始执行，能够节约一点加载时间（因为是并行的）。这么看来使用`defer`跟放在`body`底部效果差不多，甚至更胜一筹，那么为什么现在还有很多人还在使用后者(body 底部)这种方式呢，这两种方式到底有什么区别呢？[^2]

## 历史小知识

最早实现`defer`的是 IE4，然而在 IE4-9 中的实现并没有按照 WHATWG 的标准[^3]，这个 bug 使得执行脚本时的**顺序无法得到保证**。

> deferred scripts should run after the document had parsed, in the order they were added. [^4]

> The defer attribute may be specified with the async attribute, so legacy browsers that only support defer (and not async) fall back to the defer behavior instead of the default blocking behavior [^4]

**!!!注意：**
为了避免在旧的 IE 浏览器上，脚本的执行顺序不符合预期，因此大多数时候还是使用将脚本放在`body`底部的方式

## IMPORTANT

> The `defer` and `async` attributes **must not** be specified if the src attribute is **absent** [^5]

### body bottom

将`<script>`放在`body`底部，能够保证脚本按照顺序加载及执行，缺点是无法节约加载时间

[^1]: https://stackoverflow.com/a/39711009/3821392
[^2]: https://stackoverflow.com/questions/5250412/how-exactly-does-script-defer-defer-work
[^3]: https://www.html5rocks.com/en/tutorials/speed/script-loading/
[^4]: https://html.spec.whatwg.org/multipage/scripting.html#attr-script-defer
[^5]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement#
