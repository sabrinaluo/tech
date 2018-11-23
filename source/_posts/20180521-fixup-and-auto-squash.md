---
title: 使用fixup和auto squash修改git commit
date: 2018-05-21 14:38:40
tags: [git, fixup, squash, conventional commit, patch]
category: GIT
---
在写程序的过程中，经常遇到一些刚提交了commit就发现有个错别字这种尴尬的情况，我以前的做法是`git reset HEAD~1` 将HEAD指向提交之前的一个commit然后改完再重新提交‍🤦‍

除此之外，如果是最新的commit中的错误需要修改，其实还可以直接修改，之后使用`git add FILE_TO_CHANGE git comit --amend`，既可以修改最后一次提交的内容，也可以修改commit message。

但还有一些情况是，发现之前的某个commit有错别字或bug，这种情况很多同学（包括我😂）会开个新的普通的commit去fix，而不是`git commit --fixup COMMIT_HASH`

### Conventional Commit [^1]
使用 Conventional Commit 的 repo 可以使用 [standard-version](https://github.com/conventional-changelog/standard-version) 自动根据commit message生成CHANGELOG，并且自动bump version。前提是commit message需要follow相关的一些规定，例如`fix: xxx`， `feat: xxx`

在使用Conventional Commit的repo中经常看到 `!fixup fix:xxx`这样的commit，此类commit会被忽略，而不会影响生成CHANGELOG。

### `--fixup`
然而我并不知道有一个command是`--fixup`，再加上我平时都是用source tree之类的图形界面工具，所以每次需要fix一个commit的时候，都是手写`!fixup xx`这样的message，然后又由于偷懒，也不粘贴复制fixup的提交信息，而是直接写一个相似的短一点的信息🤦‍ （估计这样应该会导致无法`autosquash`）

#### 正确的使用方法及流程[^2]
- `git commit --fixup fb2f677`  
假设fixup后 git log 如下
```
c5069d5 fixup! Feature A is done
733e2ff Feature B is done
fb2f677 Feature A is done
ac5db87 Previous commit
```
- `git rebase -i --autosquash ac5db87`  
需要注意，`autosquash`后面的hash必须是将要squash的commit的前一个

### patch
可能现在的web开发中很少用到patch了，我反正一次也没用过，也没听别人说用过，可能在APP或者客户端中比较常用到吧。

这个功能的作用是能够生成一个补丁文件，用`git apply ./xx.patch` 可以将补丁打到当前的repo中。

在没有github之前的时候，可能人们是通过这种方式玩开源的吧…发现别人有bug，修复之后如果直接发源文件实在太大大麻烦了，于是打一个补丁用email发出去给作者…感谢gayhub的出现，让我们这些小白参与开源社区的门槛降低也很多，操作也方便了很多，真是科技改变生活 :)

[^1]: https://conventionalcommits.org/
[^2]: https://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html
[^3]: https://www.jianshu.com/p/e5d801b936b6