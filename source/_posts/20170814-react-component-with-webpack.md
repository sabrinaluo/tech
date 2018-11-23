---
title: 用webpack打包react组件
date: 2017-08-14 10:36:56
tags: [webpack, react, react-component]
categories: WEBPACK
---

### 吐槽
好多人都吐槽Webpack配置太复杂了，然而1.x我都还没学会现在都已经3.x了，前段圈真的好难混啊，真是必须活到老学到老啊…


前段时间闲得无聊看到个播放器叫[APlayer](https://github.com/DIYgod/APlayer)，就想着包起来做个Vue或者React能用的吧，练练手……然后由于我的拖延症，写了好久，就在我写完Vue版本的第二天，还没push，就发现MD已经有别人比我早几天写好了，好气哦…于是只能重头开始写React版


因为从开始就是用`create-react-app`的脚手架，所以也没考虑npm require时候会有什么问题，[Demo](http://sabrinaluo.com/react-aplayer/)更是直接写在`src` 文件夹里，我自己引用的时候当然没有问题啦…不过`create-react-app`没有提供相应的功能也有别人吐槽过了[^1]


发布了之后有人给提了个Issue，说引用之后编译的时候有问题，我一看果然…
```
uncaught ReferenceError: React is not defined
```

### 正经事儿
`/src`里的文件都是`ES6`和`JSX`形式，第一反应是我的文件没有被webpack里的`babel-loader`成功编译，查了一些资料之后发现问题是在`create-react-app`的webpack配置中，只会编译`./src`下的文件，而当我的库作为第三方依赖引入时，是在`./node_modules`下，因此没有被编译。（使用webpack编译时通常都会忽略`./node_modules`下的文件，没理由去编译别人的包呀，也就是说别人发布这个包的时候，就应该是编译好的了，然而偷懒的我没有编译就直接发布了）(⊙﹏⊙)b

``` javascript
// ./react-scripts/config/webpack.config.prod.js
// Process JS with Babel.
{
  test: /\.(js|jsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    // @remove-on-eject-begin
    babelrc: false,
    presets: [require.resolve('babel-preset-react-app')],
    // @remove-on-eject-end
    compact: true,
  },
},
```

为了编译我的文件，我还要专门写一个`webpack.config.js`真是好心累…写的时候遇到的问题更心累


首先就是最基本的配置，相关的`loader`和minify plugin，编译之后文件很大…原来是把`react`也打包进去了，如果所有人都这么写组件的话……最后的APP里有几个组件就会有几份重复的react，肯定是不对的。


之后搜到，要排除某个库，可以用`external`选项
```
  externals: ['react']
```
然而，加上这个时候我的噩梦就来啦，永远都提示`React is undefined`，试了各种各样的`external`写法，对象、数组…都不管用。花了两三天时间，才搜到一个说`libiaryTarget: 'umd'`的[^2]

### 参考
1: https://github.com/facebookincubator/create-react-app/issues/1492
2: https://github.com/zhengweikeng/blog/issues/10

[^1]: https://github.com/facebookincubator/create-react-app/issues/1492
[^2]: https://github.com/zhengweikeng/blog/issues/10