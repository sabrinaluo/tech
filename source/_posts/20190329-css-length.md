---
title: css长度单位及font-size
date: 2019-03-29 10:51:55
tags: [css, 长度单位, font-size, font]
category: css
---

## 长度单位

### 字体相对长度

em - 通常 1em = 16px；但如果父元素设置了 font-size，则 1em=1 倍父元素的字体大小
rem - 根元素的 font-size，根元素通常为`<html>`

ch - 0 字的宽度
ex - x 小写字母的高度

### viewport 百分比长度

vh 1%的视窗高度
vw 1%的视窗宽度

vmax - vm 和 vh 中较大值
vmin - vm 和 vh 中较小值

### 绝对长度

1px 对应屏幕中的一个点的大小
1cm = 96px/2.54 厘米
1mm = 1/10cm 毫米
1in = 2.54cm - 通常等于 96px，但不同浏览器中可能不同
1pc = 12pt
1pt = 1/72in - 转换为对应的`px`时，则与 dpi(dots per inch)有关；使用 pt 为单位能确保在不同设备上字体大小看起来是一样的，而使用 px 为单位，则可能因为设备的分辨率不同而导致字体大小不同。

## font-size 字体大小

font-size 的单位可以为以上长度单位 或 百分比%，通常`1em = 12pt = 16px = 100%`

### `em` vs `%`

通常来说没有区别，但当用户设置浏览器字体大小时，则会出现显著的差别。当浏览器设为'字体最小'时，1em 比 100%看起来更小；而
当浏览器设为'字体最大'时，1em 比 100%看起来更大。虽然`em`在 web 设计中更常用，但`%`能够提供更加一致的体验。

桌面浏览器默认字体大小为`16px`, 所以未经调整的浏览器在显示`1em=16px`，也就是说`1px=0.0625em`。为了简化 font-size 的换算，可以在 css 中的 body 中先全局声明`font-size=62.5%`，也就是定义了默认字体大小为 16px\*0.625=10px,子元素会继承父级元素的字体大小，于是 1em=10px

### 62.5% vs 10px

Q: 为什么是`font-size: 62.5%`而不是`font-size: 10px`?  
A: 在不同的设备中，默认字体大小可能不同，10px 的大小在对于高 dpi 的设备可能看起来非常小，并非我们想要的效果，因此使用百分比根据默认字体的大小来设置其他字体的大小会得到更好的体验。

---

- ★☆☆ https://developer.mozilla.org/en-US/docs/Web/CSS/length
- ★★★ https://kyleschaeffer.com/css-font-size-em-vs-px-vs-pt-vs-percent
- ★★☆ https://segmentfault.com/q/1010000002411895
