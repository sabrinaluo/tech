title: Jenkins集成github pull request插件
date: 2016-07-14 14:41:02
tags: [jenkins, github, CI, 持续集成]
---
前不久给bootstrap提了个[issue](https://github.com/twbs/bootstrap/issues/19997)，然后被他们的高科技自动回复机器人吓萌比了。
有印象之前给，某些repo提PR的时候，如果是用的Travis CI，也会有相应的提示该PR是否pass了所有test case。

如果使用cloud based CI，很多功能都已经整合了，所以可以很方便的使用。如上travis的例子，只要在travis配置里开启pull request选项，允许PR过来的时候自动跑测试，就可以实现。

然而，如果使用的是jenkins这种自己服务器上的CI，配置就稍微有点麻烦了。

### 整合push和jenkins
github repo页面 > Settings > webhooks & services

这里有两个选项：
1. add webhook，可自定义触发事件，可定制程度较高
2. add service，选好对应的服务，只填一个url即可，可定制程度较低。

第一个比较复杂，但是点进去看看有哪些选项也就比较清晰明了大概用法了。
第二个，如果使用jenkins，需要你的jenkins服务器装有对应的插件。

整个流程的原理是，当github收到任何事件（比如push, pr等等），就会将对应的信息发送到你填的那个url中。这个url是你jenkins服务器用来接受信息的。Jenkins收到信息之后，就会根据job的配置做相应的事情，比如构建、测试、部署等等。

### 整合pull request
这里重点说一下怎么整合jenkins和github的pull request，**实现每当有pull request时，触发CI跑测试，并将测试结果显示在github上**。

这里需要分别在github和jenkins做相应的设置。

github中的设置与上部分提到的相同，主要是填url

jenkins服务器中：
首先需要安装 [github pull request builder plugin](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+pull+request+builder+plugin)

添加用户名、密码、token等等credentials相关的需要在jenkins的管理面板添加

- source code management，除基本选项外，需要填写advanced选项。
  - repo name: `origin`
  - repo refspec: `+refs/pull/*:refs/remotes/origin/pr/*`
  - repository browser 选择githubweb
- Build Triggers:
  - 勾选 Github Pull Request Builder
  - 勾选 Use github hooks for build triggering
  - Admin List里可以填写github用户名，这样该用户就会有对应的权限
  - advanced选项中，需要在White List以及List of organizetions填写相应的用户名，这样PR才能被自动build，不在白名单里的用户提交的pr需要管理员审核后才会build
  - 如果没有勾选 Build every pull request automatically without asking (Dangerous!)，每次有pr时，机器人账号会自动评论*"Can one of the admins verify this patch?"*，之后管理员回复相应的语句来触发Jenkins操作
    - "ok to test" 允许该pr之后自动触发jenkins build
    - "test this please" 只build一次，该pr之后的改动不会自动触发Build
    - "add to whitelist" 将该pr的作者假如白名单
    - "retest this please" 重新bulid一次
**其他选项都保持默认不要更改！**
- 构建、环境相关的设置例如`npm install` `npm test`等，跟平时一样即可。

最后保存设置，提交一个pr，如果设置都正确的话，在提交pr的页面将能看到一个“正在checking...”的提示，当测试跑完之后将能看到check passed或者check failed。另外也能够在pr overview页面看到pr后面会有个绿色的小勾或红色的小叉。

于是谁提交的pr不通过测试就能一目了然，再也不用帮别人fix test case啦！

### 参考
http://jakubstas.com/github-and-jenkins-pull-request-checking
http://jakubstas.com/github-and-jenkins-integration
https://www.theguild.nl/building-github-pull-requests-with-jenkins
https://wiki.jenkins-ci.org/display/JENKINS/GitHub+pull+request+builder+plugin
https://github.com/jenkinsci/ghprb-plugin