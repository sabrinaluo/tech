---
title: AWS EC2 SSH访问 & mongodb 安装
date: 2016-03-14 18:33:31
tags: [AWS, EC2, ssh, mongodb]
categories: AWS
---
环境：Ubuntu

### SSH连接 EC2
windows下通常用putty
ubuntu下先打个命令`ssh`看看能否识别命令，如果能就方便很多

要连接EC2通常都会有一个`.pem`的**私钥**文件，另外还会有一个**Public IP**
首先设置权限（并不知道这个有什么用，chmod 400使得文件只能被该文件的拥有者读取）
```
chmod 400 /*path*/my-key-pair.pem
ssh -i /*path*/my-key-pair.pem username@59.64.123.1
```
其中username默认如下：[^1]

|OS|username|
|---:|---:|
|Linux|ec2-user|
|RHEL5|root 或 ec2-user|
|Ubuntu|ubuntu|

### mongodb安装及配置
有了apt-get一切真是轻松如放屁…连解压缩都不用！也不用再设置环境变量什么的（根部记不住解压缩的命令…）
```
sudo apt-get install mongodb
```
安装好了之后，去**根目录**下创建`data`文件夹即可，然后打`mongod`命令，应该就启动了，此时访问`localhost:27017`，如果看到以下文字，就成功启动了芒果DB
> You are trying to access MongoDB on the native driver port. For http diagnostic access, add 1000 to the port number

如果有error通常是没有data文件夹，设置`dbpath`后再尝试启动
```
mongod --dbpath=./path_of _data
```

[^1]: http://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html
