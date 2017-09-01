---
title: Angular directive指令相关的scope问题(= @ & ?)
date: 2017-09-01 15:59:44
tags: [angular, directive, scope, 'isolated scope']
category: AngularJS
---
### 老生常谈之 isolated scope
每次说到directive, isolated scope总是要被提起的…官方的例子已经很好的说明了为什么我们需要isolated scope。当没有isolated scope的时候，directive依赖于controller的scope，这样每次使用directive，都需要创建新的controller。
``` html
<div ng-controller="NaomiController">
  <my-customer></my-customer>
</div>
<hr>
<div ng-controller="IgorController">
  <my-customer></my-customer>
</div>
```
``` Javascript
angular.module('docsScopeProblemExample', [])
.controller('NaomiController', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.controller('IgorController', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Igor',
    address: '123 Somewhere'
  };
}])
.directive('myCustomer', function() {
  return {
    restrict: 'E',
    template: '<div>Name: {{customer.name}} Address: {{customer.address}}</div>'
  };
});
```

Isolated scope 其实就是当你在directive里要return的那个object里，定义一个scope属性，这个`scope`会override controller中的`$scope`，从而实现isolated。
```
angular.module('docsIsolateScopeDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
  $scope.igor = { name: 'Igor', address: '123 Somewhere' };
}])
.directive('myCustomer', function() {
  return {
    restrict: 'E',
    scope: {
      customerInfo: '='
    },
    templateUrl: 'my-customer-iso.html'
  };
});
```

### `=` `&` `@` `?`
通常在写Angular的时候经常看到别人的指令scope里会有下面着这样`=` `@` `&`的符号，我自己呢，90%的时候都是用`=`，也不知道其他符号到底是干什么用的。今天无心工作，仔细研究了一下。
``` JavaScript
app.directive('myDirective', function(){
    return {
        scope: {
            optionOne: '=',
            optionTwo: '=?',
            optionThree: '@',
            optionFour: '&'
        }
    }
})
```
#### `=` 双向绑定(two way binding)
这个好理解，父子两个scope，任何一个改变，剩下的一个也跟着一起改变

需要注意的是，传入参数时，是没有花括号的
```
<my-directive options="options"></my-directive>
```

#### `@` 单向绑定(one way binding)
首先，单向绑定传入的是一个**字！符！串！**；其次，父scope改变子scope跟着变，但子scope改变时，父scope不会改变！

由于传入的是一个字符串，所以是需要花括号的，如下，假如父scope中`name='Lucy'`，第一个指令接收到的是`'name'`这个字符串，第二个指令接受的才是`'Lucy'`这个字符串
```
<my-directive name="name"></my-directive>
<my-directive name="{{name}}"></my-directive>
```

#### `&` 绑定函数
> The `&` binding allows a directive to trigger evaluation of an expression in the context of the original scope

`&`绑定允许指令触发原始scope(指令所在的父元素的scope)中的函数

> Best Practice: use `&attr` in the `scope` option when you want your directive to expose an API for binding to behaviors.

可以理解为传入一个**回调函数**给指令，指令触发该函数，但该函数并不定义在指令的scope中。因为如果该函数定义在directive的scope中，则逻辑是固定的，从外部传入的话，可以传入任意逻辑的函数。

我的一些**Anti-pattern**
- 关于函数绑定这个事，我通常直接用`=`绑定函数，也能用……但这个肯定有什么潜在的问题我没发现；  
- 我的另一种用法是，仍然用`=`绑定一个对象，把函数放在对象里，比如绑定的是`options`这个对象，但对象中有`options.sayHi`这个属性（其实是个函数）。

我能想到的潜在的问题就是，会存在`undefined is not a function`，但如果检查一下属性是否存在是否类型function不就可以了？？？我知道可能会有问题，但到底会有什么问题呢？🤔

#### `?`
问号这个挺简单的，跟glob啊，正则的里面的`?`意思相似，就是说该属性是否是必需选项，当有问号的时候，说明对应的属性可以省略，而不会报错`NON_ASSIGNABLE_MODEL_EXPRESSION `

### 无关感言
我第一次知道AngularJS大约是3年前，除了学校的一些酱油小项目外完全没有任何开发经验，对于JS只知道jQuery却又要去找一份程序员的工作。面试的时候人家问我：会Angular吗？我：？？？当然是没有面上，回去之后到code school学完了入门课程，在官网学完了那个卖手机的demo。当然之后我也没有直接去做一份跟Angular有关的工作。

如今，在我终于做着一份Angular1.x的工作时，Angular5都快发布了，（再次感叹，前端圈真难混），而我连TypeScript也还没学会，关于Angular的很多基本问题也还是云里雾里……但这并不妨碍我能写出能在生产环境使用的应用🙄，基础和工程经验这是没什么必然关系，（当然也可能是我天赋异禀而不自知🤣）。其实我现在是很不想写Angular1.x的，总觉得是非常outdated的东西，然而🤷‍

另外，这篇真是50%以上都是抄袭官网…但是不抄根本记不住…

### 参考
[1] https://docs.angularjs.org/guide/directive  
[2] https://blog.coding.net/blog/angularjs-directive-isolate-scope  
[3] https://stackoverflow.com/questions/14908133/what-is-the-difference-between-vs-and-in-angularjs  
[4] https://stackoverflow.com/questions/20447786/whats-the-meaning-of-in-angularjs-directive-isolate-scope-declaration  