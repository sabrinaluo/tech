---
title: Jenkins集成github pull request插件
date: 2016-07-14 14:41:02 +8
tags: [jenkins, github, CI, 持续集成]
category: DEVOPS
---

前不久给 bootstrap 提了个[issue](https://github.com/twbs/bootstrap/issues/19997)，然后被他们的高科技自动回复机器人吓萌比了。
有印象之前给，某些 repo 提 PR 的时候，如果是用的 Travis CI，也会有相应的提示该 PR 是否 pass 了所有 test case。

如果使用 cloud based CI，很多功能都已经整合了，所以可以很方便的使用。如上 travis 的例子，只要在 travis 配置里开启 pull request 选项，允许 PR 过来的时候自动跑测试，就可以实现。

然而，如果使用的是 jenkins 这种自己服务器上的 CI，配置就稍微有点麻烦了。

### 整合 push 和 jenkins

github repo 页面 > Settings > webhooks & services

这里有两个选项：

1. add webhook，可自定义触发事件，可定制程度较高
2. add service，选好对应的服务，只填一个 url 即可，可定制程度较低。

第一个比较复杂，但是点进去看看有哪些选项也就比较清晰明了大概用法了。
第二个，如果使用 jenkins，需要你的 jenkins 服务器装有对应的插件。

整个流程的原理是，当 github 收到任何事件（比如 push, pr 等等），就会将对应的信息发送到你填的那个 url 中。这个 url 是你 jenkins 服务器用来接受信息的。Jenkins 收到信息之后，就会根据 job 的配置做相应的事情，比如构建、测试、部署等等。

### 整合 pull request

这里重点说一下怎么整合 jenkins 和 github 的 pull request，**实现每当有 pull request 时，触发 CI 跑测试，并将测试结果显示在 github 上**。

这里需要分别在 github 和 jenkins 做相应的设置。

github 中的设置与上部分提到的相同，主要是填 url

jenkins 服务器中：
首先需要安装 [github pull request builder plugin](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+pull+request+builder+plugin)

添加用户名、密码、token 等等 credentials 相关的需要在 jenkins 的管理面板添加

- source code management，除基本选项外，需要填写 advanced 选项。
  - repo name: `origin`
  - repo refspec: `+refs/pull/*:refs/remotes/origin/pr/*`
  - repository browser 选择 githubweb
- Build Triggers:
  - 勾选 Github Pull Request Builder
  - 勾选 Use github hooks for build triggering
  - Admin List 里可以填写 github 用户名，这样该用户就会有对应的权限
  - advanced 选项中，需要在 White List 以及 List of organizetions 填写相应的用户名，这样 PR 才能被自动 build，不在白名单里的用户提交的 pr 需要管理员审核后才会 build
  - 如果没有勾选 Build every pull request automatically without asking (Dangerous!)，每次有 pr 时，机器人账号会自动评论*"Can one of the admins verify this patch?"*，之后管理员回复相应的语句来触发 Jenkins 操作 - "ok to test" 允许该 pr 之后自动触发 jenkins build - "test this please" 只 build 一次，该 pr 之后的改动不会自动触发 Build - "add to whitelist" 将该 pr 的作者假如白名单 - "retest this please" 重新 bulid 一次
    **其他选项都保持默认不要更改！**
- 构建、环境相关的设置例如`npm install` `npm test`等，跟平时一样即可。

最后保存设置，提交一个 pr，如果设置都正确的话，在提交 pr 的页面将能看到一个“正在 checking...”的提示，当测试跑完之后将能看到 check passed 或者 check failed。另外也能够在 pr overview 页面看到 pr 后面会有个绿色的小勾或红色的小叉。

于是谁提交的 pr 不通过测试就能一目了然，再也不用帮别人 fix test case 啦！

### 参考

http://jakubstas.com/github-and-jenkins-pull-request-checking
http://jakubstas.com/github-and-jenkins-integration
https://www.theguild.nl/building-github-pull-requests-with-jenkins
https://wiki.jenkins-ci.org/display/JENKINS/GitHub+pull+request+builder+plugin
https://github.com/jenkinsci/ghprb-plugin
