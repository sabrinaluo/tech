title: 关于本地化的一些技巧
date: 2017-05-26 17:59:03
tags: [interpolation, pluralization, localization, 翻译, 本地化, 单复数, ng-pluralize]
---
在香港工作总是能接触到各种“本地化”的需求，大多数网站至少都会有中英文两个版本，有的还会分简体中文和繁体中文。而在实现本地化的过程中，由于英文与中文的文法、语序等差异，会有很多情况需要处理。

### i18n & i10n
一直以来我都混淆使用这两个term，其中i18n是国际化，主要用于世界通用内容的翻译，**使产品无需做大的改变就能够适应不同的语言和地区的需要**，包括时间、日期、货币等；而i10n是本地化，也就是把网站里其他内容进行翻译。

### content key
将需要翻译的位置用**Content Key**占位，在单独的文件里来处理对应的翻译已经成为了本地化的最基本策略。这样做的好处是，1. 保持代码的整洁，无需因为翻译问题不断提交commit，避免污染git history；2. 方便不懂代码的运营人员随时调整翻译内容，而无需增加开发负担。

### 单复数 pluralization
举个栗子，如果需要翻译“x个苹果”，对应的英文会有单复数形式，遇到这种情况的时候，如果缺乏经验，通常是写`if` `else`， 然后用两个不同的key：

| key | zh | en |
| ---- | ---- | ---- |
| webstie.key.apple | 个苹果 | apple |
| webstie.key.apples | 个苹果 | apples | 

但是template里写太多的if else 容易使得逻辑混乱，也不利于维护，机智的我今天忽然发现angular其实有一个专门的指令来做这个事:

```
<ng-pluralize count="personCount"
                 when="{'0': 'Nobody is viewing.',
                     'one': '1 person is viewing.',
                     'other': '{} people are viewing.'}">
</ng-pluralize>
```

这个指令的本质其实跟if else类似，使用了一个hash map来储存对应的翻译，而我们可以利用这个指令，把when的值写到controller里，这样会比较美观 XD

### 插值 interpolation
有时候我们不得不把一整句话打断成多个部分，比如“step 1 of 5 ”，而对应的中文如果要求翻译成“第1步（共5步）”。这种情况下，如果使用断句的方法来翻译，中文需要有3个key，分别对应

| lang | part1 | part2 | part3 |
| -- | --- | --- |
| en | step | of| |
| zh | 第 | 步（共 | 步）|

这样做，不仅不美观，写起来`string + string + string`也非常麻烦，同时代码及翻译文件都增加了维护的难度。

大家应该都有经验，在`console.log`中，可以使用`%s`作为占位符，如果能够使用占位符来进行翻译，以上情况就会简单很多。

Angular原生的`$interpolate`服务，用于编译含有特定标记的字符串，`Hello, {% raw %}{{name}}{% endraw %}`

> Compiles a string with markup into an interpolation function

翻译时，大多时候时候都是用`angular-translate`，这个第三方的服务能很好的处理插值，使用的标记是两个花括号`{% raw %}{{}}{% endraw %}`

```
//基本用法
$translate(translationId[, interpolateParams], interpolationId, defaultTranslationText, forceLanguage);

//例子
$scope.stepInfoText = $filter('translate')('widget-progress-bar.step.text', {currentStep:1, totalStep: 5});

//翻译文件 *.properties
widget-progress-bar.step.text=step {{currentStep}} of {{totalStep}}
//output: step 1 of 5
```

### 参考
1: https://docs.angularjs.org/guide/i18n
2: https://docs.angularjs.org/api/ng/directive/ngPluralize
3: https://stackoverflow.com/questions/27259723/angularjs-pluralization-with-angular-translate-and-ng-pluralize
4: https://docs.angularjs.org/api/ng/service/$interpolate
5: https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate