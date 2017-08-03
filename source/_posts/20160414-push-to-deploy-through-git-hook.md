title: 如何通过Git钩子自动部署(Push to Deploy)
date: 2016-04-14 18:59:37
tags: [git, hook, 自动部署]
---
看了好多讲通过git钩子自动部署的，大多讲的绕来绕去乱七八糟思路一点也不清晰…
做了一晚上实验之后大概明白了是怎么工作的。

### 裸仓库（bare）
裸仓库跟我们平时`git clone`得到的仓库不太一样，裸仓库其实相当于通过克隆来的仓库里的`.git`文件夹，整个裸仓库中只有git索引（index），**并没有任何代码相关的东西**。要实现Push to Deploy，首先我们需要一个裸仓库。

在克隆时使用 `--bare`参数来克隆一个裸仓库
```
git init --bare xxx-bare
```
### 钩子（hook）
普通仓库`.git`文件夹下有一个`hooks`文件夹，裸仓库下直接有一个`hooks`文件夹，里面有各种各样以`.sample`结尾的钩子，当把`.sample`后缀删除时，钩子就是激活状态。
```
.git
├───hooks
│   └───post-update.sample   
└─── ...
```
你可以在钩子文件里写一些bash命令，被激活的钩子被触发时会执行你的bash命令。

与deploy相关的通常使用`post-update`钩子或者`post-receive`钩子[^1]，关于这两个钩子到底有什么不同，我是没太看懂，大概的理解是这两个钩子被trigger的时候收到的信息不一样，如果需要用commit的相关信息来做一些事情的话要仔细研究（比如可以设置某个分支收到了推送就做相应的事情之类），其他如果只是通过bash来跑一些node相关的部署命令，两个都可以。这篇文章只给一个最简单的例子，跟分支啊什么的都没关系，只要收到推送就部署。

要实现Push to Deploy，我们需要修改裸仓库中相应的钩子文件

### 裸仓库是怎么工作的
可以在本地同一个文件夹下先创建一个裸仓库名为xxx-remote（模拟远程服务器），再创建一个xxx-local仓库（模拟本地），将xxx-remote添加为本地仓库的远程仓库，在本地仓库写一个`README.md`文件，提交并push
```
git init --bare xxx-remote
git init xxx-local
cd xxx-local
git remote add origin ../xxx-remote
echo test123>README.md
git add .
git commit -m 'add readme file'
git push -u origin master
```
之后切换到远程仓库文件夹，查看git log
```
cd ..
cd xxx-remote
git log
```
将能够看到有一条commit记录，提交信息是 add readme file，远程仓库收到了本地仓库的push

### 钩子是怎么工作的
进入远程仓库，将`hooks`文件夹下的`post-update.sample`改名为`post-update`，打开并编辑为如下内容：
```
#!/bin/sh
set -x #显示每条命令
echo "push push"
```
修改本地仓库的文件，进行一次推送，将会看到远程服务器执行了相应的命令
```
Total 0 (delta 0), reused 0 (delta 0)
remote: + echo push push
remote: push push
To ../xxx
 + 41b78ee...055cec9 master -> master (forced update)
```

### 一个完整的场景举例
假设有一台远程服务器上跑着一个网站，希望每次git push之后这个网站就自动更新。
为了方便：
- 假设远程服务器上放了**裸仓库**和**网站**，自动部署的过程就是裸仓库收到push之后更新一下网站的文件夹
- 假设网站都是静态文件，不需要重启web server
- 假设都只考虑默认的master分支

我们需要：
1. 在这台远程服务器上创建一个裸仓库，假如名叫xxx。克隆repo取名为website，用于存放网站文件
```
git init --bare xxx
git clone ./xxx website
```
2. 修改远程服务器下`hooks`文件夹下的`post-update.sample`改名为`post-update`，编辑为如下内容：
```
#!/bin/sh
set -x #显示每条命令
git reset --hard origin/master #防止因为forced push而导致无法checkout
git checkout
```
3. 在本地repo添加远程仓库
```
git remote add origin ubuntu@59.64.123.123:home/xxx.git
```
4.在本地仓库修改文件并push

至此整个git自动部署的过程就完成了

### 参考
[1]: https://www.kernel.org/pub/software/scm/git/docs/githooks.html

[^1]: https://www.kernel.org/pub/software/scm/git/docs/githooks.html
