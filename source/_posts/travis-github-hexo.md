title: 利用travis自动部署hexo搭建在github的博客
date: 2015-12-28 12:00:56
tags: [travis, github, hexo, 博客, 自动部署, 持续集成]
---
这篇应该属于不务正业系列…
自从知道了持续集成（Continuous Integration）这个概念之后感觉开启了新世界的大门。

[Travis](https://travis-ci.org)是一套持续集成的服务器解决方案，也就是等于把jenkins能够实现的都放在了云端，不用自己搭服务器安装了，懒人的福音～

最初知道travis是因为总在github商看到这种小图标，虽然不知道是什么东东，但是觉得逼格特别高…
[![Build Status](https://travis-ci.org/sabrinaluo/tech.svg?branch=master)](https://travis-ci.org/sabrinaluo/tech)

关于Hexo和github page这里就不讨论了，教程网上一搜一大堆。用travis属于进阶内容了，能搜到这篇文章的，应该也都具备了最基础的知识。

为什么需要travis来自动部署博客呢，像我这种废话多的人，倾诉欲随时随地会喷发…然后如果当时手边没有电脑，或者有电脑了但不是我的电脑，欲火就被一盆水浇灭了…而有了travis之后呢，只要给我一台能上网的电脑，分分钟就能发博客并且更新到自己的网站…

[具体教程（来自Hexo的作者Tommy）](https://zespia.tw/blog/2015/01/21/continuous-deployment-to-github-with-travis/)网上已经有一些了，但不是很多，这里主要说一说其中容易遇到的坑。

### Prerequisite
注册一个travis账号，绑定github，并为相应的repo开启travis服务
在repo中添加`.travis.yml`文件，下面是我个人的配置。我是将source和public放在同一个repo的不同分支里，源文件放在master分支，生成后的网页放在gh-pages分支。

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
* **$encrypted_e011a6d7eebf_key**这一串加密的key每个人都不同，请不要直接复制。请使用
`$ travis encrypt-file ssh_key --add ` 这条命令将相应的key写入`.travis.yml`中。
* **记得检查`.travis.yml`文件**，因为在自动写入文件的过程中很可能出现了**自动换行**的问题（我是linuxmint 用webstorm遇到了这个问题），如果有换行的问题把换行符删除即可，否则会导致travis在命令跑到这里的时候出问题使得building failed。
* 另外如果有将相应的文件移到相应的文件夹中，请记得在命令中修改相应的path
*  如果你最后deploy的不是master分支，请在`packag.json`中使用下面的依赖
```
"hexo-deployer-git": "hexojs/hexo-deployer-git#495fc6d"
```
hexo-deployer-git在0.0.4及之前的版本都是hardcode了默认使用master分支来deploy，当使用非master分支来进行deploy时（本文例子中使用gh-pages分支中的内容）则会报错，上述版本修复了该问题。

### `.travis.yml`文件解释
整个配置其实是告诉travis：
1. 使用node 4.0版本来build我的程序
2. 只有当master分支有commit的时候才自动部署
3. 在安装之前先解密ssh key以便获得github的写权限（这样才能push到gh-pages分支）；全局安装hexo（这样才能直接执行hexo命令）；配置git设定（这样才能用git）
4. 克隆主题
> （如果想省略这一步，你可以把主题`themes`文件夹也放在博客repo的master分支中）
5. 克隆gh-pages分支到`.deploy_git`文件夹
> （hexo 默认会将生成的用于deploy的文件都放在这个文件夹；如果不需要gh-pages分支的相关commit记录，这一步可以省略。省略后该分支永远只有最近的一次commit…）
6. 跑一下`hexo g`命令，看看是否会有错
> 请注意，这一步并不能保证博客生成的样式问题，只是查看主题是否有错误。如果你每次都是克隆主题，并不能保证你克隆的版本每次都能顺利生成所有文件，可能会存在bug
7. 如果能够顺利生成网页则执行`hexo d`，将博客push到gh-pages分支 
