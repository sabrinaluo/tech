---
title: css中使用 object-fit 来控制可替换元素的样式
date: 2020-02-20 23:46:35
tags: [object-fit, replaced element]
category: css
---

偷懒很久了，昨天好不容易花点时间做了一下css的一些测验，发现自己居然连 `object-fit` 都不会用，连 `replaced element`都没听过，居然也能测出expert水平…但有进步总是比什么都不做强一些。

> object-fit 是用于控制可替换元素(replaced element[^2])在容器中如何显示的属性[^1]

## 可替换元素 replaced element
可替换元素是独立于CSS的外部对象，其展现效果不由所继承的父文档css所控制，例如 `<iframe>` 本身有自己的样式，其样式不会受父文档中样式的影响

### 典型的可替换元素
典型可替换元素有以下几种：
- `<iframe>`
- `<video>`
- `<embed>`
- `<img>`

某些元素在特定情况下也被视为可替换元素，例如 `<option>`, `<audio>`, `<canvas>`, `<object>`, `<applet>`（这个我都不知道是啥）

## CSS控制控制可替换元素的样式
`object-fit` 控制可替换元素在容器中如何显示，有以下几种值，以图片做例子进行说明：

- `fill` 不按物件本身的宽高比的填充，而是按容器的大小填充，会出现图片变形等情况
- `cover` 在保持物件本身宽高比，填充整个容器大小
- `contain` 保持物件宽高比，当容器宽高比与物件宽高比不同时，物件的宽或高只有其中一个与容器相等
- `none` 保持物件宽高比，不缩放，直接填充，图片较大容器较小时，只截取部分图片
- `scale-down` 保持物件宽高比，与 `none` 或 `contain` 其中物件显示较小时相同

`object-position` 控制在容器中的位置，类似 `bakcground-position`


一张图胜过千言万语
![image](https://user-images.githubusercontent.com/5300359/74955610-db787980-543f-11ea-911f-9ef0f30788ea.png)


[^1]: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit  
[^2]: https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element
