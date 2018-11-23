---
title: angular指令什么情况下只能有一个根元素(root element)
date: 2017-12-05 15:28:03
tags: [angular, directive]
category: AngularJS
---
好久么有记录什么有用的知识了，总是猴子掰玉米似的学点忘点:(

### 问题
在写自定义指令(custom directive)的时候，经常遇到下面这个错误：
```
Error: [$compile:tplrt] Template for directive 'xxx' must have exactly one root element. 
```

但有时候又发现别人写的指令超过一个根元素，却并没有报错，真是非常的confusing🤔

### 文档
官访文档在directive一节是找不到任何和replace有关的东西，后来是在$compile一节找到的，然而又已经弃用了……(又要感叹了，前端圈真特喵难混)

以下为文档说明
> replace (DEPRECATED)  
- replace will be removed in next major release - i.e. v2.0).  
- Specifies what the template should replace. Defaults to false.  
  - true - the template will replace the directive's element.  
  - false - the template will replace the contents of the directive's element.  
- The replacement process migrates all of the attributes / classes from the old element to the new one. See the Directives Guide for an example.

大概是说这个replace属性没什么卵用…实际使用的时候也觉得没什么场景是非要replace不可的，不过为了避免在jq selector里使用一堆莫名其妙的dom名称，replace一下让Html看起来更正常一点（对，我们就是jQuery和angular混用，就是这么任！性！🤷‍）

### 感悟
在写组件template的时候用根元素把其他元素wrap起来，其实一个很好的习惯，这样一来，根元素上可以有css class，在使用sass之类的css预处理器时，有根类会使得维护成本变低

那么为什么会存在有多余一个根元素的组件呢？

我个人的感觉是，组件在最初设计时，并没有考虑到之后的扩展性，比如要写一个dropdown组件，首先想到的肯定是把select元素作为根元素，于是模板成了这样：
```
<select class="xxxx">
...
</select>
```
之后来了个需求：当所选的选项是某一些特定选项时，显示一个error message。这一下就比较尴尬了……

error message这个`div`只能和`select`同一个level才行，因为加在`select`里是肯定不会显示的。而一旦新加一个wrapper把之前的模板包起来，之前的css可能都要重写才会看起来没有变化。此时影响最小的做法就是移除指令中的`replace:true`属性，然后加多一个根元素了😂

Angular本身compile的机制是，如果没有replace:true，默认就是false，**会自动创建一个`<directive-name>`元素作为根元素**包裹住模板中的全部内容。

以上。
