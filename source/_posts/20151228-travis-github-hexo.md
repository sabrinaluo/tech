---
title: 利用travis自动部署hexo搭建在github的博客
date: 2015-12-28 12:00:56
tags: [travis, github, hexo, 博客, 自动部署, 持续集成]
category: DEVOPS
---

这篇应该属于不务正业系列…
自从知道了持续集成（Continuous Integration）这个概念之后感觉开启了新世界的大门。

[Travis](https://travis-ci.org)是一套持续集成的服务器解决方案，也就是等于把 jenkins 能够实现的都放在了云端，不用自己搭服务器安装了，懒人的福音～

最初知道 travis 是因为总在 github 商看到这种小图标，虽然不知道是什么东东，但是觉得逼格特别高…
[![Build Status](https://travis-ci.org/sabrinaluo/tech.svg?branch=master)](https://travis-ci.org/sabrinaluo/tech)

关于 Hexo 和 github page 这里就不讨论了，教程网上一搜一大堆。用 travis 属于进阶内容了，能搜到这篇文章的，应该也都具备了最基础的知识。

为什么需要 travis 来自动部署博客呢，像我这种废话多的人，倾诉欲随时随地会喷发…然后如果当时手边没有电脑，或者有电脑了但不是我的电脑，欲火就被一盆水浇灭了…而有了 travis 之后呢，只要给我一台能上网的电脑，分分钟就能发博客并且更新到自己的网站…

[具体教程（来自 Hexo 的作者 Tommy）](https://zespia.tw/blog/2015/01/21/continuous-deployment-to-github-with-travis/)网上已经有一些了，但不是很多，这里主要说一说其中容易遇到的坑。

### Prerequisite

注册一个 travis 账号，绑定 github，并为相应的 repo 开启 travis 服务
在 repo 中添加`.travis.yml`文件，下面是我个人的配置。我是将 source 和 public 放在同一个 repo 的不同分支里，源文件放在 master 分支，生成后的网页放在 gh-pages 分支。

{% gist d905eeed53d9368fdee6 %}

```
## 目录结构如下，其中.travis文件夹用于存放github的sshkey加密文件，以及ssh的相关配置
└── blog
    ├── _config.yml
    ├── package.json
    ├── README.md
    ├── scaffolds
    ├── source
    │   └── _posts
    ├── .travis
    │   ├── id_rsa.enc
    │   └── ssh_config
    └── .travis.yml
```

### 注意事项

```
before_install:
- openssl aes-256-cbc -K $encrypted_e011a6d7eebf_key -iv $encrypted_e011a6d7eebf_iv -in .travis/id_rsa.enc -out ~/.ssh/id_rsa -d
```

- **\$encrypted_e011a6d7eebf_key**这一串加密的 key 每个人都不同，请不要直接复制。请使用
  `$ travis encrypt-file ssh_key --add ` 这条命令将相应的 key 写入`.travis.yml`中。
- **记得检查`.travis.yml`文件**，因为在自动写入文件的过程中很可能出现了**自动换行**的问题（我是 linuxmint 用 webstorm 遇到了这个问题），如果有换行的问题把换行符删除即可，否则会导致 travis 在命令跑到这里的时候出问题使得 building failed。
- 另外如果有将相应的文件移到相应的文件夹中，请记得在命令中修改相应的 path
- 如果你最后 deploy 的不是 master 分支，请在`packag.json`中使用下面的依赖

```
"hexo-deployer-git": "hexojs/hexo-deployer-git#495fc6d"
```

hexo-deployer-git 在 0.0.4 及之前的版本都是 hardcode 了默认使用 master 分支来 deploy，当使用非 master 分支来进行 deploy 时（本文例子中使用 gh-pages 分支中的内容）则会报错，上述版本修复了该问题。

### `.travis.yml`文件解释

整个配置其实是告诉 travis：

1. 使用 node 4.0 版本来 build 我的程序
2. 只有当 master 分支有 commit 的时候才自动部署
3. 在安装之前先解密 ssh key 以便获得 github 的写权限（这样才能 push 到 gh-pages 分支）；全局安装 hexo（这样才能直接执行 hexo 命令）；配置 git 设定（这样才能用 git）
4. 克隆主题
   > （如果想省略这一步，你可以把主题`themes`文件夹也放在博客 repo 的 master 分支中）
5. 克隆 gh-pages 分支到`.deploy_git`文件夹
   > （hexo 默认会将生成的用于 deploy 的文件都放在这个文件夹；如果不需要 gh-pages 分支的相关 commit 记录，这一步可以省略。省略后该分支永远只有最近的一次 commit…）
6. 跑一下`hexo g`命令，看看是否会有错
   > 请注意，这一步并不能保证博客生成的样式问题，只是查看主题是否有错误。如果你每次都是克隆主题，并不能保证你克隆的版本每次都能顺利生成所有文件，可能会存在 bug
7. 如果能够顺利生成网页则执行`hexo d`，将博客 push 到 gh-pages 分支
