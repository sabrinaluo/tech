title: git merge repo 如何合并两个仓库
date: 2015-12-24 14:58:32
tags: [git, merge repo, 合并仓库]
---
为什么我每天都会有一些奇奇怪怪的需求…

我之前在github上用hexo搭了一个静态博客，每次hexo deploy的时候，就会在gh-pages分支提交一个commit。但是由于hexo-deployer-git本身的逻辑是，每次都是强推`push -f`，于是每当我换电脑（比如从家里换到公司里）的时候，我的commit记录就会丢失…但是像我这种虚荣心强的人，一个错别字都要commit一次来增加我在github commit的次数…所以，我家里的电脑和公司的电脑，两个repo的commit log都不能丢！！一个都不能少！！

### 如何合并两个仓库
假设现在有两个repo：repo1，repo2，每个repo中都已经有一堆提交记录了，现在想把repo2中的记录合并到repo1中，命令如下：
``` bash
cd repo1
git remote add other ../repo2
git fetch other
git checkout -b repo2 other/master
git checkout master
git merge repo2
```

解释：
1. 进入repo1文件夹
2. 添加repo2作为repo1的远程仓库，并命名为other
3. 将repo2的内容获取到repo1
> 注意，使用fetch而不是pull，关于fetch和pull的区别[请戳这里](https://stackoverflow.com/questions/292357/what-are-the-differences-between-git-pull-and-git-fetch)
4. 在repo1中创建名为repo2的新分支，同时切换到该分支，并且使用上一步获取的内容中的master分支的内容
5. 切换到repo1的master分支
6. 将repo2分支的内容合并到master分支

### 一句话总结
将一个仓库的内容checkout到另一个仓库的一个分支，将该分支与master分支合并

参考：
[1] http://blog.csdn.net/gouboft/article/details/8450696
