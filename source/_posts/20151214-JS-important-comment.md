---
title: JS注释中的感叹号是干什么用的/*! */
date: 2015-12-14 14:15:06
tags: [js, 重要注释, 感叹号]
category: JS
---

前几天看了一个帖子[我招不到想要的程序员](http://www.jianshu.com/p/fdae559d1ed5)，里面有一点是说**非极端情况下，一本以下的不要**。本来学历这种事情大家都无所谓，毕竟我所认识的大多数都是 985、211 的本硕博。只有当进入了另一个不同的世界，才觉得学历还挺重要的…
我的 JS 基本都是靠自学，我的大神同学们都是搞后端强类型语言的，所以我只能上网搜搜，买点书看看，加几个参差不齐的 QQ 群问一问。然而我这种月亮处女座的强迫症细节好奇宝宝常常会有奇奇怪怪找不到答案的问题……
有一天我看代码的时候发现很多规范的 JS 都会有这样的注释：

```js
/*!
 * EJS
 * Copyright(c) 2012 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
```

以上来自我的男神[TJ 写的 EJS 模板引擎](https://github.com/tj/ejs/blob/master/ejs.js)

我就在 QQ 群里问了这样一个问题：

> 第一个注释中的感叹号是什么意思，为什么第一个有感叹号，第二个没有？

然后似乎没有人知道，并且我到的回答基本都是诸如：那就是行注释没什么特别的意思、在意注释干嘛反正注释也没什么用……

然后我就忽然有点明白了为什么一本以下的不要…

类似这样的问题，为什么在网上很难找答案？可能是因为：

- 搜索引擎对于特殊符号的处理导致难以按照符号来搜索
  包括 google 和 stackoverflow 中输入`/*!`并不能搜到结果
- 因为缺乏经验而无法正确的描述问题，无法命中问题的关键字

像我这样比较懒的人，最希望的就是能有一个在现实生活中认识的经验丰富的大神，这种弱鸡问题，一问就有答案了。然而我并不认识这样的大神。(ಥ_ಥ)

直到后来无意中看到[阮一峰老师的 SASS 教程](http://www.ruanyifeng.com/blog/2012/06/sass.html)，提到**重要注释**这个概念，受到一点启发，然后机智的我想到把感叹号直接翻译成英文，以'exclamation js comment'作为关键字来搜索，果然我不是一个人…（嗯，我变成了一条狗）
http://stackoverflow.com/questions/11248363/the-purpose-of-starting-an-initial-comment-with-in-javascript-and-css-files

> 我不是为了输赢，我就是认真 --罗永浩

---

对前端工程化稍微有点知识的，就会知道在最后 deploy 之前会有一个步骤是 minify / uglify，这个过程中注释都会被删除，而这个以`/*!`开头的重要注释则会被保留，通常重要注释是用来注释版权之类的信息[^1]

[^1]: https://zoompf.com/blog/2009/11/jsmin-important-comments-and-copyright-violations
