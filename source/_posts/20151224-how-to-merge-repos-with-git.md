---
title: git merge repo 如何合并两个仓库
date: 2015-12-24 14:58:32
tags: [git, merge repo, 合并仓库]
category: GIT
---

为什么我每天都会有一些奇奇怪怪的需求…

我之前在 github 上用 hexo 搭了一个静态博客，每次 hexo deploy 的时候，就会在 gh-pages 分支提交一个 commit。但是由于 hexo-deployer-git 本身的逻辑是，每次都是强推`push -f`，于是每当我换电脑（比如从家里换到公司里）的时候，我的 commit 记录就会丢失…但是像我这种虚荣心强的人，一个错别字都要 commit 一次来增加我在 github commit 的次数…所以，我家里的电脑和公司的电脑，两个 repo 的 commit log 都不能丢！！一个都不能少！！

### 如何合并两个仓库

假设现在有两个 repo：repo1，repo2，每个 repo 中都已经有一堆提交记录了，现在想把 repo2 中的记录合并到 repo1 中，命令如下：

```bash
cd repo1
git remote add other ../repo2
git fetch other
git checkout -b repo2 other/master
git checkout master
git merge repo2
```

解释：

1. 进入 repo1 文件夹
2. 添加 repo2 作为 repo1 的远程仓库，并命名为 other
3. 将 repo2 的内容获取到 repo1
   > 注意，使用 fetch 而不是 pull，关于 fetch 和 pull 的区别[请戳这里](https://stackoverflow.com/questions/292357/what-are-the-differences-between-git-pull-and-git-fetch)
4. 在 repo1 中创建名为 repo2 的新分支，同时切换到该分支，并且使用上一步获取的内容中的 master 分支的内容
5. 切换到 repo1 的 master 分支
6. 将 repo2 分支的内容合并到 master 分支

### 一句话总结

将一个仓库的内容 checkout 到另一个仓库的一个分支，将该分支与 master 分支合并

参考：
[1] http://blog.csdn.net/gouboft/article/details/8450696
