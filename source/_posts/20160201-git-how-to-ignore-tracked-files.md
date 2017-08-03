title: git如何ignore已经track的文件
date: 2016-02-01 14:01:03
tags: [git, gitignore, 'update index']
---
我也不想中英文混杂的取标题……但我实在翻译无能…\_(:з」∠)\_

### 基本知识
在git中文件有两类，共三种状态：
- untracked
- tracked
  - changes not staged for commit
  - changes to be committed
我们都知道，在`.gitignore`文件里添加相应的文件夹或文件就能忽略掉不想被track的文件。
但是，`.gitignore`文件只能忽略**Untracked files**。

### 适用场景
参考这样一个例子：
一个项目因为一些莫名其妙的原因对`node_modules`文件夹进行了track，然后每次check out出来`npm install`的时候，很可能这些依赖包就更新了，然后又因为一些莫名其妙的原因，始终没有人把这个文件夹移出git的index，于是你也不好意思删除这个文件夹做一次commit。然而，每次都有几十上百条`modified: node_modules/xxx`，根本找不到自己真正修改和添加的文件…

于是问题来了，怎么样才能把`node_module` ignore，但又不commit这些change呢？

### 解决方法
正常情况，跑以下的命令就能忽略掉已经track的**文件夹**：
``` bash
git ls-files -z node_modules/ | xargs -0 git update-index --assume-unchanged
```

如果只需要忽略**单个文件**，则以下命令就能搞定。
``` bash
git update-index --assume-unchanged <file name>
```

因为update-index不支持递归`-r`，所以只能通过上面提到的方法来实现忽略文件夹
（憋问我为什么不支持…我也不知道）

### 另一种情况：将tracked文件移出index，但仍然保留在本地
终于有一天，大家想通了，决定将`node_modules`文件夹移出git index，但是如果删除了整个文件夹commit之后，项目要跑起来，又要重新`npm install`，懒癌患者倒地不起…

下面这个命令可以解决上述问题：
``` bash
git rm --cached -r node_modules
```

### 吐槽
我反正是无法理解把诸如npm包，bower包，composer包等等等的第三方依赖放到git里去track，那么还要package.json干啥=，=
