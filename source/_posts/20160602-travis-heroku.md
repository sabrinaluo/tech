---
title: 利用travis进行heroku部署
date: 2016-06-02 15:27:46
tags: [travis, heroku, 持续集成, 自动部署]
category: DEVOPS
---

好久么有写东西了，总感觉一直忙的跟狗一样，身心俱疲，但是又不知道到底在忙什么。

最近实践了一下利用 travis 部署到 heroku 的流程，又莫名其妙的尝试了新的编辑器 atom，安装了 markdown-preview-plus 插件，当然要来写点东西试一试， 也不知道英文的 linux 下到底是什么问题，webstorm 和 sublime 居然不能打中文，所以之前每次写东西都要去简书边预览边写。

atom 还是很好用的，可能因为我（后）天生就对 JS 写的东西有好感，记不住快捷键的我，不能徒手写 html 的我还是需要 IDE 的帮助，atom 就用来写点简单的东西吧。

travis 和 heroku 都有自己的命令行工具（CLI），尤其 travis cli 用起来总比徒手写.travis.yml 方便许多

### 安装 travis-cli

travis-cli 是 ruby 写的，所以安装之前需要安装 ruby

```
sudo apt-get install ruby-full
```

详细的安装教程可以看官方的这个https://github.com/travis-ci/travis.rb#installation

```
gem install travis -v 1.8.2 --no-rdoc --no-ri
```

### 安装 heroku-cli

heroku-cli 也是 ruby 写的……有点不懂为啥都喜欢用 ruby 写 cli？js 不是挺好的吗，有啥 cli 是`npm install -g` 解决不了的吗？…
具体的安装教程看

- https://toolbelt.heroku.com
- https://devcenter.heroku.com/articles/heroku-command#installing-the-heroku-cli

```
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
```

### 登陆

```
travis login
```

```
heroku login
```

### .travis.yml

在项目的根目录下执行以下命令，将会生成`.travis.yml`文件

```
travis init
travis setup heroku
```

> 注意：一定要通过命令行登陆 heroku，否则 travis 会卡住，也不报错啥的反正就一直没反应

打开`.travis.yml`文件可以看到除了基本的信息之外，还有`deploy`相关的信息，其中比较让人疑惑的是`api_key`，这个`api_key`其实是你的 heroku 账户的 token 加密之后的一个字符串。heroku 的 token 看起来是一个类似 uuid5 的字符串，可以通过以下命令查看

```
heroku auth:token
```

有一个问题我不太明白的是，之前用 travis 加密文件`travis encrypt-file path/of/file --add`的时候，可以在 travis 网站对应 repo 的 setting 里看到多出的环境变量，用来加密的 key value，然后需要用`openssl`命令来解密。

但加密 heroku 的 token 后，并没有生成任何新的环境变量，而且也无需在`.travis.yml`中执行解密的相关操作。

那么用来加密的 key value 到底存在哪里了呢？！

### 为什么要在 travis 做部署，而不直接利用 heroku 提供的 github 自动部署？

首先，heroku 似乎不能跑测试…

其实，大多数简单的项目其实都可以用 github 的方式，如果需要编译和生成的，都在`package.json`里添加`prepublish`脚本即可

我这次又是搞了一个奇怪的事情，做了一个前后端分离项目，后端提供 RESTful API,前端是 SPA，但是又想把 SPA 和 API 放在同一个服务器，而且分了两个 repo 来放前端和后端。

所以我的需求是，当前端或后端 push 之后，trigger travis 去把前后端都克隆下来，并且编译和 Build 前端代码，放到指定文件夹，然后部署。
