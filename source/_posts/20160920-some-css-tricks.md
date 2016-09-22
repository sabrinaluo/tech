title: CSS的几个小技巧: pointer-events, transform垂直居中,nth-child
date: 2016-09-20 16:44:46
tags: [css, tricks]
---
> 千万不要用没有自动保存功能的编辑器！千万不要用没有自动保存功能的编辑器！千万不要用没有自动保存功能的编辑器！:(

好久没有写什么东西了，可能是因为最近一直做的事情都是在重复搬砖，没有什么新鲜的东西…更可能是因为太懒了…

总结一下前段时间学到的几个css小技巧，以免过几天又忘记了

### CSS控制超链接是否可点击：pointer-event
一开始我听说CSS可以disable超链接的时候我是拒绝的，因为通常在有`href`属性的时候，都是用js来禁止超链接的。
然鹅…CSS里居然有pointer-events[^1]这种黑科技！

```
a{
    pointer-events: none;
}
```

### transform 垂直居中 [^2]
CSS垂直居中一直是一个蛋疼的问题，常常需要用到，却没有一个所有浏览器，在所有情况下都适用的解决方案。等我以后有空了，应该专门写一篇讨论CSS垂直居中各种解决方案的博客……别问我以后是什么时候…XD
```
<style>
.bbb{
    position: relative;
    transform: translateY(-50%);
    top: 50%
}
</style>
<div class="aaa">
  <div class="bbb">qqq</div>
</div>
```

### nth-child
通常一个列表里，总是回遇到需要高亮某几个item的情况，CSS居然还可以通过公式来控制样式，我又涨姿势了。

以前只知道可以控制奇数偶数这种简单的，后来发现，只要是有规律的，能够写成an+b的公式，都可以适用`nth-child`[^3]
- `li:nth-child(even)` 选中偶数
- `li:nth-child(odd)` 选中奇数
- `li:nth-child(3n+2)` 从第2个开始，每3个选中一个
- `li:nth-child(3)` 直选中第3个

[^1]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events
[^2]: http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/
[^3]: https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child