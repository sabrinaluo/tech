---
title: Angular directive指令相关的scope问题(= @ & ?)
date: 2017-09-01 15:59:44 +8
tags: [angular, directive, scope, 'isolated scope']
category: AngularJS
---

### 老生常谈之 isolated scope

每次说到 directive, isolated scope 总是要被提起的…官方的例子已经很好的说明了为什么我们需要 isolated scope。当没有 isolated scope 的时候，directive 依赖于 controller 的 scope，这样每次使用 directive，都需要创建新的 controller。

```html
<div ng-controller="NaomiController">
  <my-customer></my-customer>
</div>
<hr />
<div ng-controller="IgorController">
  <my-customer></my-customer>
</div>
```

```js
angular
  .module('docsScopeProblemExample', [])
  .controller('NaomiController', [
    '$scope',
    function ($scope) {
      $scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre',
      };
    },
  ])
  .controller('IgorController', [
    '$scope',
    function ($scope) {
      $scope.customer = {
        name: 'Igor',
        address: '123 Somewhere',
      };
    },
  ])
  .directive('myCustomer', function () {
    return {
      restrict: 'E',
      template:
        '<div>Name: {{customer.name}} Address: {{customer.address}}</div>',
    };
  });
```

Isolated scope 其实就是当你在 directive 里要 return 的那个 object 里，定义一个 scope 属性，这个`scope`会 override controller 中的`$scope`，从而实现 isolated。

```js
angular
  .module('docsIsolateScopeDirective', [])
  .controller('Controller', [
    '$scope',
    function ($scope) {
      $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
      $scope.igor = { name: 'Igor', address: '123 Somewhere' };
    },
  ])
  .directive('myCustomer', function () {
    return {
      restrict: 'E',
      scope: {
        customerInfo: '=',
      },
      templateUrl: 'my-customer-iso.html',
    };
  });
```

### `=` `&` `@` `?`

通常在写 Angular 的时候经常看到别人的指令 scope 里会有下面着这样`=` `@` `&`的符号，我自己呢，90%的时候都是用`=`，也不知道其他符号到底是干什么用的。今天无心工作，仔细研究了一下。

```js
app.directive('myDirective', function () {
  return {
    scope: {
      optionOne: '=',
      optionTwo: '=?',
      optionThree: '@',
      optionFour: '&',
    },
  };
});
```

#### `=` 双向绑定(two way binding)

这个好理解，父子两个 scope，任何一个改变，剩下的一个也跟着一起改变

需要注意的是，传入参数时，是没有花括号的

```html
<my-directive options="options"></my-directive>
```

#### `@` 单向绑定(one way binding)

首先，单向绑定传入的是一个**字！符！串！**；其次，父 scope 改变子 scope 跟着变，但子 scope 改变时，父 scope 不会改变！

由于传入的是一个字符串，所以是需要花括号的，如下，假如父 scope 中`name='Lucy'`，第一个指令接收到的是`'name'`这个字符串，第二个指令接受的才是`'Lucy'`这个字符串

```html
<my-directive name="name"></my-directive>
<my-directive name="{{name}}"></my-directive>
```

#### `&` 绑定函数

> The `&` binding allows a directive to trigger evaluation of an expression in the context of the original scope

`&`绑定允许指令触发原始 scope(指令所在的父元素的 scope)中的函数

> Best Practice: use `&attr` in the `scope` option when you want your directive to expose an API for binding to behaviors.

可以理解为传入一个**回调函数**给指令，指令触发该函数，但该函数并不定义在指令的 scope 中。因为如果该函数定义在 directive 的 scope 中，则逻辑是固定的，从外部传入的话，可以传入任意逻辑的函数。

我的一些**Anti-pattern**

- 关于函数绑定这个事，我通常直接用`=`绑定函数，也能用……但这个肯定有什么潜在的问题我没发现；
- 我的另一种用法是，仍然用`=`绑定一个对象，把函数放在对象里，比如绑定的是`options`这个对象，但对象中有`options.sayHi`这个属性（其实是个函数）。

我能想到的潜在的问题就是，会存在`undefined is not a function`，但如果检查一下属性是否存在是否类型 function 不就可以了？？？我知道可能会有问题，但到底会有什么问题呢？🤔

---- 更新 ----
大概知道原因了…不用`@`很好理解，用`@`传入的是个字符串不是函数；而不用`=`因为双向绑定存在子 scope 改变父 scope 中的函数的风险，并且也会有`$watch`的开销，一定程度上影响性能。
https://stackoverflow.com/questions/29857998/proper-way-to-pass-functions-to-directive-for-execution-in-link

`&`绑定后，返回的是一个返回父 scope 中对应函数的函数 😂，有点拗口。举个栗子：

```html
<my-directive callback="sayHi(a,b,c)"></my-directive>
```

指令中的`scope.callback`值为`function(locals){ return parentGet(scope, locals);}`

所以`scope.callback({a:1,b:2,c:3})`等价于`parentScope.sayHi(1,2,3)`
需要注意的是:

- `scope.callback({a:1,b:2,c:3})`的入参是一个`object`
- 如果是这样`scope.callback({a:1,b:2})`，则`c`的值会与`parentScope.c`相同。也就是说，如果**子 scope**传入的`obj`中没有定义对应参数，各参数的默认值与`parentScope`中的对应值一致。如果**父子 scope**中都没有定义相关参数，则为`undefined`

#### `?`

问号这个挺简单的，跟 glob 啊，正则的里面的`?`意思相似，就是说该属性是否是必需选项，当有问号的时候，说明对应的属性可以省略，而不会报错`NON_ASSIGNABLE_MODEL_EXPRESSION `

### 无关感言

我第一次知道 AngularJS 大约是 3 年前，除了学校的一些酱油小项目外完全没有任何开发经验，对于 JS 只知道 jQuery 却又要去找一份程序员的工作。面试的时候人家问我：会 Angular 吗？我：？？？当然是没有面上，回去之后到 code school 学完了入门课程，在官网学完了那个卖手机的 demo。当然之后我也没有直接去做一份跟 Angular 有关的工作。

如今，在我终于做着一份 Angular1.x 的工作时，Angular5 都快发布了，（再次感叹，前端圈真难混），而我连 TypeScript 也还没学会，关于 Angular 的很多基本问题也还是云里雾里……但这并不妨碍我能写出能在生产环境使用的应用 🙄，基础和工程经验这是没什么必然关系，（当然也可能是我天赋异禀而不自知 🤣）。其实我现在是很不想写 Angular1.x 的，总觉得是非常 outdated 的东西，然而 🤷‍

另外，这篇真是 50%以上都是抄袭官网…但是不抄根本记不住…

### 参考

[1] https://docs.angularjs.org/guide/directive
[2] https://blog.coding.net/blog/angularjs-directive-isolate-scope
[3] https://stackoverflow.com/questions/14908133/what-is-the-difference-between-vs-and-in-angularjs
[4] https://stackoverflow.com/questions/20447786/whats-the-meaning-of-in-angularjs-directive-isolate-scope-declaration
[5] https://stackoverflow.com/questions/29857998/proper-way-to-pass-functions-to-directive-for-execution-in-link
