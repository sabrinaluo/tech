---
title: GitHub Page如何绑定域名
date: 2015-12-13 00:34:42 +8
tags: [github, github page, custom domain, 域名绑定, 二级域名, 域名解析]
category: DevOps
---

本文假设你已经在 github 建立了一个 yourname.github.io 的网站，为了看起来逼格更高，更好记，更 professional，所以要绑定域名？！
我本来的 github page 是[sabrinaluo.github.io](http://sabrinaluo.github.io)，花了一百多大洋把这个域名变成[sabrinaluo.com](http://sabrinaluo.com)，github.io 到.com，为了省 6 个字符，居然要花一百多大洋 QAQ

---

~~只讨论一级域名的绑定，不讨论二级域名的绑定（因为我不会呀）~~
**先讨论一级域名的绑定，假设是www.abc.com**

1. 首先…你要有一个~~男盆友~~域名…没有的话就去 godaddy 买一个；
2. 然后打开你的 cmd console，ping 一下你的 github page，也就是输入`ping yourname.github.io`，你会看到你的页面所在的主机的 IP 地址，下面的例子 IP 是 103.245.222.133，不知道是不是所有人的 IP 都一样呢。

```bash
C:\>ping yourname.github.io
正在 Ping github.map.fastly.net [103.245.222.133] 具有 32 字节的数据:
来自 103.245.222.133 的回复: 字节=32 时间=5ms TTL=58
来自 103.245.222.133 的回复: 字节=32 时间=6ms TTL=58
来自 103.245.222.133 的回复: 字节=32 时间=8ms TTL=58
来自 103.245.222.133 的回复: 字节=32 时间=12ms TTL=58
103.245.222.133 的 Ping 统计信息:
数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
最短 = 5ms，最长 = 12ms，平均 = 7ms
```

3. 登录你的 godday 账号，设置一下 DNS 的 A 记录：

- 找到你的 domain，点 manage DNS
- 进入 DNS 设置页面后点 Add Record，在弹出的对话框选 A(Host)
  > RECORD TYPE: A(Host)
  > HOST: 这里填你在 godday 买的域名，例如 abc.com
  > POINTS TO: 这里填第三步获取到的 IP 地址
  > TTL: 生效的时间，不知道最短是多久，我反正是选 custom 之后填了 600，也就是 10 分钟

4. 然后就等等等，等 10 分钟左右，在浏览器里访问一下你新买的域名，如果看到 github 的 404 页面，就说明 DNS 的设置已经成功了
5. 最后，在你的 yourname.github.io 这个 repo 创建一个名为`CNAME`的文件，没有后缀名。文件内容如下：

```
abc.com
```

是的，你没看错，就是辣么简单！

**二级域名的设置**
假如你有两个 github page，一个是 blog，一个是 news，那你的两个二级域名分别就是：

- blog.abc.com
- news.abc.com

1. 到 godday 设置两条**A 记录**，分别设置 blog 及 news 指向 github page 的 IP
2. 到对应的 git repo 下面添加对应的 CNAME 文件，例如在 blog 这个 repo 下的 CNAME 是

```
blog.abc.com
```

整个过程其实做的事情大概可以理解为：

- 告诉 godday，当别人访问我的域名 abc.com 的时候，请带他们去 github
- 告诉你的 github page，当别人是被 abc.com 带来 github 的时候，没错他们都是我派来的，请接收他们的访问
- 告诉你的 github page，当别人直接访问 github page，也就是 yourname.github.io 的时候，请穿上花了一百多大洋买的马甲 abc.com…（这其实是说，当你添加了 cname 记录之后，访问 yourname.github.io，你在浏览器里看到的域名会自动变成 abc.com）
