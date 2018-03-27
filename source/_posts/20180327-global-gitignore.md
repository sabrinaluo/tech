---
title: global .gitignore
date: 2018-03-27 12:39:44
tags: [Git, gitignore]
category: Git
---
### 为什么需要全局 `.gitignore`
通常来说，在repo中提交跟IDE相关的文件并非最佳实践，所以大多数时候会在`.gitignore`中加入IDE相关的文件pattern，然而市面上的IDE很多，不同程序员对IDE也有着自己的偏好，似乎不太可能把市面上所有的IDE都列出来。

除此之外，可能还有一些其他情况下，希望在本地ignore某些文件，但却不希望提交到远程的`.gitignore`中。

这种时候就该Git的 **global ignore** 上场啦！

添加全局`gitignore`之后会在本地所有的repo中都ignore在其中列出的文件，以达到本地忽略特定文件的效果，通常都是IDE啦…例如，本地ignore 与 `.idea` 相关的所有文件，但我们并不需要修改repo中的`.gitignore`文件。

### 如何设置全局 `.gitignore`
首先在根文件夹`~`下创建一个`.gitignore_global`文件，（也可以在其他文件夹创建，但通常习惯于根文件夹下），然后运行以下命令：
```
git config --global core.excludesfile ~/.gitignore_global
```

如果使用sourcetree就更简单了：
**menu > sourcetree > preference > git**
将会看到 **global ignore list:** 字样，添加刚刚创建的`.gitignore_global`文件即可

### 参考
https://help.github.com/articles/ignoring-files/
https://stackoverflow.com/questions/30907829/sourcetree-adding-files-in-global-gitignore-not-in-repository-gitignore