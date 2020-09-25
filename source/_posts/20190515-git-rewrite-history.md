---
title: git重写历史
date: 2019-05-15 23:50:46
tags: [git]
category: git
---

前几天在家写公司的代码，自己电脑上 git 全局设置用的是私人邮箱，太懒了懒得改，直接 commit 以后被公司的 bot check 到是非公司邮箱提交的代码，PR 都不让开，真是很严格呢，气人 😤

以前只知道怎么修改单个 commit 的信息，而且只知道用`git commit --amend`修改最新提交的 commit。学习了一下怎么修改多个 commit 的提交信息以及如何重设作者。

## 修改多个 commit 的提交信息

如果是要调整顺序啊之类的需求，都知道要用`git rebase -i`啦，弹出的编辑窗口中，以前只会用`pick` `squash` `fixup` `drop`，其他的基本上不清楚不了解不关心…那么怎么修改作者呢？

1. 把需要修改的 commit 前面改成`edit`并保存
2. 之后 cmd 就会跳到最早的那个 commit，`git commit --amend --no--edit --author "aa <aa@aa.com>"` (using the standard `A U Thor <author@example.com>` format)[^1]
3. `git rebase --continue` 然后会跳到下一个刚刚标记为`edit`的 commit，重复第二步，直到所有 commit 都修改完成即可

p.s. 刚刚上面提到，要使用`A U Thor <author@example.com>`格式，这到底是什么鬼格式呢？根本搜不到什么是`A U Thor`, 测试了一下，大概应该是说：

- first name, second name, last name 之间用空格隔开
- email 要用`<>`括起来
- 名字和 email 之间要有空格

然而好像还是不 work，因为虽然 author 改了，但是 committer 的信息，还是没有变化。而且刚刚的 step2 中，每次都要输入名字和邮箱，真是好麻烦啊，有没有什么更好的办法呢？👇

## 修改 commit 作者

针对 repo 设置 committer，再`--reset-author`

```
$ git config --local user.name "John Doe"
$ git config --local user.email johndoe@example.com
```

大家应该都见过类似的设置，通常刚刚安装 git 的时候，都会设置一个`--global`的 config，将 global 换做`--local`就可以只针对某个 repo 设置 committer 用户的相关信息

设置好之后，还是需要根据刚才的 3 个 step，其中 1，3 步都相同，只是第二步的步骤改成`git commit --amend --no-edit --reset-author`即可

[^1]: https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---authorltauthorgt
