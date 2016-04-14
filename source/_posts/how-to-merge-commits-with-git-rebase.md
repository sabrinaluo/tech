title: git merge commits 如何合并多个提交为一个
date: 2015-12-24 15:08:49
tags: [git, merge commits, 合并提交]
---
因为我是那种经常改一个错别字就忙着要提交一次的人…所以总是会产生很多无意义的提交，于是合并多个提交为一个就成了我的刚性需求。

关于合并多个提交，主要是要搞清楚`rebase`的用法。
### 查看提交历史，git log
首先你要知道自己想合并的是哪几个提交，可以使用`git log`命令来查看提交历史，假如最近4条历史如下：
``` 
commit ada2cd944fc81cf0051c6b6cac62fad9ae6830d3
commit 0e25f1237eeaf9ae02b5b48b888a844ed288e7e3
commit ddbd8fd1d52aec0bbedc65a1a0add159344d4ae2
commit 2aad0182a613b2e73b44ebbf0d5536126f714cb9
``` 
历史记录是按照时间排序的，时间近的排在前面。
### git rebase
想要合并1-3条，有两个方法

1. 从HEAD版本开始往过去数3个版本
``` 
git rebase -i HEAD~3
``` 
2. 指名要合并的版本之前的版本号
``` 
git rebase -i 2aad018
``` 
> 请注意**2aad018**这个版本是不参与合并的，可以把它当做一个坐标

### 选取要合并的提交
执行了rebase命令之后，会弹出一个窗口，头几行如下：
``` 
pick ada2cd9
pick 0e25f12
pick ddbd8fd
...
``` 
将`pick`改为`squash`或者`s`，之后保存并关闭文本编辑窗口即可。改完之后文本内容如下：
``` 
s ada2cd9
s 0e25f12
s ddbd8fd
...
``` 
参考：
[1] https://git-scm.com/docs/git-rebase
[2] http://blog.csdn.net/yangcs2009/article/details/47166361
