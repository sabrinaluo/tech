---
title: AWS EC2 SSH访问 & mongodb 安装
date: 2016-03-14 18:33:31
tags: [AWS, EC2, ssh, mongodb]
category: AWS
---

环境：Ubuntu

### SSH 连接 EC2

windows 下通常用 putty
ubuntu 下先打个命令`ssh`看看能否识别命令，如果能就方便很多

要连接 EC2 通常都会有一个`.pem`的**私钥**文件，另外还会有一个**Public IP**
首先设置权限（并不知道这个有什么用，chmod 400 使得文件只能被该文件的拥有者读取）

```
chmod 400 /*path*/my-key-pair.pem
ssh -i /*path*/my-key-pair.pem username@59.64.123.1
```

其中 username 默认如下：[^1]

|     OS |         username |
| -----: | ---------------: |
|  Linux |         ec2-user |
|  RHEL5 | root 或 ec2-user |
| Ubuntu |           ubuntu |

### mongodb 安装及配置

有了 apt-get 一切真是轻松如放屁…连解压缩都不用！也不用再设置环境变量什么的（根部记不住解压缩的命令…）

```
sudo apt-get install mongodb
```

安装好了之后，去**根目录**下创建`data`文件夹即可，然后打`mongod`命令，应该就启动了，此时访问`localhost:27017`，如果看到以下文字，就成功启动了芒果 DB

> You are trying to access MongoDB on the native driver port. For http diagnostic access, add 1000 to the port number

如果有 error 通常是没有 data 文件夹，设置`dbpath`后再尝试启动

```
mongod --dbpath=./path_of _data
```

[^1]: http://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html
