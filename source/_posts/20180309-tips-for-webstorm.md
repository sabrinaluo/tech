---
title: WebStorm的一些小技巧
date: 2018-03-09 12:06:02
tags: [WebStorm, IDE, shortcut]
category: IDE
---
从我最开始学js，就一直用的是webstorm，因为很穷，一直都是用lanyu的盗版……我也很想买正版啊，但真的是太贵了。去年年底终于用上了正版了（用学校的邮箱注册的学生版）🤦‍♀️

因为比较懒，一直不想背各种快捷键，所以一直忍受着IDE的蜗牛速度，也没有换sublime vsc什么的，然而渐渐发现，有时候记点常用的快捷键还是非常有用的…(能让人更懒…)，看来所有的程序员到了一定阶段都都无法避免要折腾IDE啊…

总结一下webstorm的一些使用小技巧，防止以后又忘记了…

### 快捷键技巧
#### search
全局搜索文件、文件夹、关键字...全部： <kbd>shift</kbd> + <kbd>shift</kbd>
全局搜索关键字： <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>F</kbd>
查看函数、变量在哪里定义的： <kbd>cmd</kbd> + click 或者 <kbd>cmd</kbd> + <kbd>B</kbd>
当前文件下查找：  <kbd>cmd</kbd> + <kbd>F</kbd>
当前文件下查找并替换：  <kbd>cmd</kbd> + <kbd>R</kbd>

#### 文件
关闭当前标签： <kbd>cmd</kbd> + <kbd>w</kbd>
重新打开刚才关闭的标签： 这个没有默认的快捷键，需要在preference里面搜索reopen后设置
最近使用的文件列表： <kbd>cmd</kbd> + <kbd>E</kbd>
收起所有文件夹： <kbd>cmd</kbd> + <kbd>-</kbd>
打开所有文件夹： <kbd>*</kbd>

### code
自动补全： <kbd>tab</kbd>
格式化： <kbd>cmd</kbd> + <kbd>alt</kbd> + <kbd>L</kbd>

选中更大的代码块：<kbd>opt</kbd> + <kbd>↑</kbd>， *例如有一个switch代码块，光标定位在case处，按下快捷键选中整个case块（一下不行就多按几下，不太明白选中的机制），再按一下选中switch代码块*
放置多个光标： <kbd>alt</kbd> + click
在当前行下添加一行： <kbd>shift</kbd> + <kbd>enter</kbd>  这样不需要特意将光标放在行末
删除行line：<kbd>cmd</kbd> + <kbd>back</kbd> 
复制并粘贴行line： <kbd>cmd</kbd> + <kbd>D</kbd>
复制行： <kbd>cmd</kbd> + <kbd>C</kbd>
剪切行： <kbd>cmd</kbd> + <kbd>X</kbd>
移动行： <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>↑ or ↓</kbd> 
缓存去粘贴： <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>V</kbd>

注释/取消注释： <kbd>cmd</kbd> + <kbd>/</kbd>
展开代码块： <kbd>cmd</kbd> + <kbd>+</kbd>
折叠代码块： <kbd>cmd</kbd> + <kbd>-</kbd>

返回上次编辑的地方： <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>back</kbd>

#### 重构
变量名、函数名重构： <kbd>shift</kbd> + <kbd>F6</kbd> 或右击需要重构的变量/函数，选择refactor - rename

代码校验：<kbd>F2</kbd> 切换到下一个错误的那行

### 非快捷键小技巧
#### VSC 版本控制
开启blame view： 在行号与代码之间的空白处右击弹出菜单中选`Annotate`可以打开blame view，查看当前版本都是谁修改的哪一行代码
关闭blame view： 在与上面相同的位置右击弹出菜单中选`Close Annotations`

#### 窗口
多标签显示： 在标签出右击，可选`split vertically` 或 `split horizontally`

TBC...

### 参考
[1] https://blog.jetbrains.com/webstorm/2015/06/10-webstorm-shortcuts-you-need-to-know/
