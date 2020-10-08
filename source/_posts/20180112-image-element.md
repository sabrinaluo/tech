---
title: HTML DOM Element - image
date: 2018-01-12 16:42:54
tags: [HTML, DOM, image]
category: HTML
---

忘了是去年还是前年写了一个 urbtix 抢演唱会票的 chrome 小插件 https://github.com/sabrinaluo/urbtix-helper （每次都进不去网站，一次都没抢到 😂），逻辑其实很简单，就是当用户设置了`event_id` `perfomence_id` `seat_type` `ticket_amount`之后，凡是自动点击的就由程序自动点击，以加快整个购票过程。

为了让界面和用户体验更好，所以在界面加了一个图片，来展示对应的演唱会海报（海报是通过 urbtix 的 url 扒来的，e.g. https://ticket.urbtix.hk/internet/p_image/cover/34505.jpg ）。一直以来 urbtix 都是用`.jpg`图片文件，今天忽然发现，他们居然有些图片是`.jpeg`的 🙄

于是问题就来了，如果不爬取 urbtix 的 html 是无法知道正确的图片格式的，所以一个代替的方案是，在`.jpg`下载失败时尝试使用`.jpeg`来下载，这就涉及到怎么检测图片是否加载成功…

搜了一下 google，发现是非常基础的知识，这种时候就觉得自己基础实在是太差了…☹

```js
var image = new Image();
// 相当于 document.createElement('img')
```

### image.onload

当图片加载完成时，触发 image.onload

### image.onerror

当图片加载出现错误时，触发 image.onerror

```js
// 继续上面的例子
image.onload = function () {
  console.log('ok');
};
image.onerror = function () {
  console.log('error');
};

image.src = 'https://ticket.urbtix.hk/internet/p_image/cover/34505.jpg';
// → 'error'
```

以上，就是辣么简单啦。

### Reference:

https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/image
