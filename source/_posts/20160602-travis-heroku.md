title: 利用travis进行heroku部署
date: 2016-06-02 15:27:46
tags: [travis, heroku, 持续集成, 自动部署]
---
好久么有写东西了，总感觉一直忙的跟狗一样，身心俱疲，但是又不知道到底在忙什么。

最近实践了一下利用travis部署到heroku的流程，又莫名其妙的尝试了新的编辑器atom，安装了markdown-preview-plus插件，当然要来写点东西试一试， 也不知道英文的linux下到底是什么问题，webstorm和sublime居然不能打中文，所以之前每次写东西都要去简书边预览边写。

atom还是很好用的，可能因为我（后）天生就对JS写的东西有好感，记不住快捷键的我，不能徒手写html的我还是需要IDE的帮助，atom就用来写点简单的东西吧。

travis和heroku都有自己的命令行工具（CLI），尤其travis cli用起来总比徒手写.travis.yml方便许多

### 安装travis-cli
travis-cli是ruby写的，所以安装之前需要安装ruby

```
sudo apt-get install ruby-full
```

详细的安装教程可以看官方的这个https://github.com/travis-ci/travis.rb#installation

```
gem install travis -v 1.8.2 --no-rdoc --no-ri
```

### 安装heroku-cli
heroku-cli也是ruby写的……有点不懂为啥都喜欢用ruby写cli？js不是挺好的吗，有啥cli是`npm install -g` 解决不了的吗？…
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

> 注意：一定要通过命令行登陆heroku，否则travis会卡住，也不报错啥的反正就一直没反应

打开`.travis.yml`文件可以看到除了基本的信息之外，还有`deploy`相关的信息，其中比较让人疑惑的是`api_key`，这个`api_key`其实是你的heroku账户的token加密之后的一个字符串。heroku的token看起来是一个类似uuid5的字符串，可以通过以下命令查看
```
heroku auth:token
```

有一个问题我不太明白的是，之前用travis加密文件`travis encrypt-file path/of/file --add`的时候，可以在travis网站对应repo的setting里看到多出的环境变量，用来加密的key value，然后需要用`openssl`命令来解密。

但加密heroku的token后，并没有生成任何新的环境变量，而且也无需在`.travis.yml`中执行解密的相关操作。

那么用来加密的key value到底存在哪里了呢？！

### 为什么要在travis做部署，而不直接利用heroku提供的github自动部署？
首先，heroku似乎不能跑测试…

其实，大多数简单的项目其实都可以用github的方式，如果需要编译和生成的，都在`package.json`里添加`prepublish`脚本即可

我这次又是搞了一个奇怪的事情，做了一个前后端分离项目，后端提供RESTful API,前端是SPA，但是又想把SPA和API放在同一个服务器，而且分了两个repo来放前端和后端。

所以我的需求是，当前端或后端push之后，trigger travis去把前后端都克隆下来，并且编译和Build前端代码，放到指定文件夹，然后部署。
