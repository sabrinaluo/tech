---
title: 开发时如何使用本地npm包作为依赖
date: 2018-05-15 15:01:19
tags: [npm, local, link]
category: NPM
---
这个问题我已经遇到两次了。

第一次是我发布了[react-aplayer](https://github.com/MoePlayer/react-aplayer)（第一次发布npm包，好紧张）,然后有人提issue说`npm install`后用不了。我自己在本地开发demo的时候是直接引用`./src`，没有试过真的当做一个package来使用，所以我用的时候是没问题的😅

第二次就是我们有一个把所有API包起来的package，所有请求都添加到这个package里来做，于是除了要写主要的application还要维护这个package，需要测试这个package是否能够正常使用。

根据Stackoverflow[^1]，在本地使用本地package作为dependency有很多方法可以实现，我经常用到的是`npm link`，暂时也还没有遇到什么奇奇怪怪的问题。

官方的例子[^2]已经说的很清楚了，这里就不赘述了
```bash
cd ~/projects/node-redis    # go into the package directory 
npm link                    # creates global link 先在dependency里创建link
cd ~/projects/node-bloggy   # go into some other package directory.
npm link redis              # link-install the package 然后在主项目里安装已连接的dependency
```

### 参考
[^1]: https://stackoverflow.com/questions/15806241/how-to-specify-local-modules-as-npm-package-dependencies
[^2]: https://docs.npmjs.com/cli/link

[1]: https://stackoverflow.com/questions/15806241/how-to-specify-local-modules-as-npm-package-dependencies
[2]: https://docs.npmjs.com/cli/link