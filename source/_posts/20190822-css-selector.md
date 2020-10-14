---
title: css selector 选择器
date: 2019-08-22 23:23:30 +8
tags: [css, 'css selector', 面试复习]
category: css
---

写了快两年 `styled-components` 的本宝宝，压根就用不到什么选择器了。可想而知那帮搞出 css-in-js 的工程师肯定都是不喜欢没逻辑的 css。

我来复习复习，css 选择器是面试大概率会问的问题吧 😝

## 基本选择器[^1]

| 类型    | 选择器  | 例子        |
| ------- | ------- | ----------- |
| element | element | e.g. `div`  |
| id      | #       |             |
| class   | .       | e.g. `.btn` |
| 全部    | \*      |             |

### 属性选择器[^2]

属性选择器有以下几种语法，一般也就前两个比较常用

1. `[attr]` 所有包含 attr 属性的元素
2. `[attr=value]` 属性等于 xx 的元素，e.g. `a[target="_blank"]`
3. `[attr~=value]` 属性包含 xx 完整“单词”的元素，xx 必须是完整的**“单词”**，与其他用空格分开，e.g. `[class~=top]` 将会选中`class="abc top"`，但不会选中`class="abc ttoppic"`
4. `[attr|=value]` 属性由 xx 开始的元素，e.g. `[class|=top]`，将会选中类似`class="top"` `class="top-btn"`的元素，value 必须是一个完整的**“单词”**，在这个选择器下，`class="topic"`**不会被选中**
5. `[attr^=value]` 以 xx 开始的元素，类似正则 6.`[attr$=value]` 以 xx 结尾的元素，类似正则
6. `[attr*=value]` 包含 xx 的元素，与上面例 3 不同，e.g. `[class*=top]` 将会选中`class="abc top"` 以及`class="abc ttoppic"`

学习了以上，就会有关于**引号**的问题，有时候见到属性选择器中的 value 是有引号的，有时候又是没有引号的。关于引号的问题，css 中有一套规则，满足规则的情况下可以不使用引号，否则则需要使用[^3]。通常情况下，为了保险起见，就全都加上引号吧。

### 结合选择器 Combinators

| 选择器    | 英文                        | 例子                                |
| --------- | --------------------------- | ----------------------------------- |
| `div p`   | desendant combinator        | div 里的所有 p                      |
| `div > p` | child combinator            | div 的直接孩子 p，direct child      |
| `div + p` | adjacent sibling combinator | 同一层级兄弟选择器，紧跟 div 的 p， |
| `div ~ p` | general sibling combinator  | div 的所有兄弟 p                    |

### 伪类 Pseudo-class[^4]

比较常用的伪类有`a:link,a:hover,a:visited`,`button:focus`, 各种 child 系列`:first-child, :last-child, :nth-child()`

### 伪元素 Pseudo-element

比较常用的有`::before ::after`

第一次知道居然还有这种 `p::first-line` 和这种 `p::first-letter`!简直不可思议，以及看到这两个伪元素的时候，在一次 convince 了**很多事情其实并不需要 js，css 就完全可以搞定了！**

关于伪元素的冒号问题`::`，平时写 styled-component 不管是伪类还是伪元素，都写一个冒号，但是有时候会看到有的地方是两个冒号 🤔。简单的来说[^5]

- 历史原因，CSS2 中所有都是一个冒号，CSS3 中一个冒号是伪类，两个冒号是伪元素
- 在现代浏览器（>IE8）中一个冒号是伪类，两个冒号是伪元素
- 由于大量网页仍然使用旧的写法，浏览器为了向后兼容，所以伪元素可以使用一个冒号或两个冒号，两种都可以

虽然写一个冒号可以减少一个字节，但是如果应用本身并不兼容 IE8 及以下，那么为了让代码更清晰，个人偏向于伪元素应该使用两个冒号。

[^1]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
[^2]: https://www.w3schools.com/css/css_attribute_selectors.asp
[^3]: https://stackoverflow.com/a/5578880/3821392
[^4]: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
[^5]: https://css-tricks.com/to-double-colon-or-not-do-double-colon/
