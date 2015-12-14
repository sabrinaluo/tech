title: AWS DynamoDB的本地安装及环境配置
date: 2015-12-14 14:39:35
tags: [AWS, DynamoDB, 环境配置, 本地安装, 亚马逊, 云服务]
---
[DynamoDB](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)是亚马逊AWS云服务提供的一个NoSQL的数据库…

在这里我必须安利一下Amazon家的服务真是业界良心：前不久，可能是因为我自己蠢，英文不好没看懂免费用一年的各种限制，也不知道写了什么奇怪的东东用自己的账号测试dynamoDB被扣了几刀，写邮件去投诉说你们不是免费吗为啥扣费，然后就得到回复解释了一下为啥扣钱，说我用超过限制了，然后表示个人账号里扣了的钱会**退退退**！（我说明了之后会用公司账号测试，请帮我关了我的个人账户）

---
本文是Linux环境下的安装和配置，windows下我还不会…
1. 安装JAVA SDK
``` 
$ sudo add-apt-repository ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get install oracle-java8-installer
$ sudo apt-get install oracle-java8-set-default
```
2. 安装dynamodb-local
 * 下载daynamodb-local：[点这里下载](http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz)
 * 解压文件
 * 进入文件目录执行以下命令：
``` 
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
``` 
3. 安装awscli，执行以下命令：
``` 
pip install awscli
``` 
4. 配置环境变量，执行以下命令：
``` 
aws configure
``` 
 * 这时会让你输入AWS_ACCESS_KEY_ID和AWS_SECRET_ACCESS_KEY，这两个值需要**成功注册AWS服务**之后在AWS的网站上会看到
 * AWS_DEFAULT_REGION，根据需要设置，也就是你的数据库打算放在AWS的那个区就设为哪个区，如果只是测试一下，懒得去看有什么区域，那么好吧，你可以设为`us-east-1`
5. 启动dynamodb，进入dynamodb目录（也就是你解压dynamodb的地方），执行以下命令：
``` 
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
``` 

参考：
[1] http://tecadmin.net/install-oracle-java-8-jdk-8-ubuntu-via-ppa/
[2] [DynamoDBLocal Downloading And Running](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html#Tools.DynamoDBLocal.DownloadingAndRunning)
[3] http://aws.amazon.com/cli/
[4] http://boto3.readthedocs.org/en/latest/guide/configuration.html