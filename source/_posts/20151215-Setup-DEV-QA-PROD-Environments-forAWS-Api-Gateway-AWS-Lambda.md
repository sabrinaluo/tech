---
title: AWS API Gateway与AWS Lambda的整合及开发/测试/生产环境的设置
date: 2015-12-15 10:55:13
tags: [AWS, API Gateway, AWS Lambda, RESTful, 开发环境, 测试环境, 生产环境, 环境配置]
categories: AWS
---
本文**不是**介绍 [AWS API Gateway](https://aws.amazon.com/api-gateway/) 和 [AWS Lambda](https://aws.amazon.com/lambda/)的基本用法的…=(:з」∠)_

简单的来说，有了AWS的API Gateway和Lambda这两样东东，再加一个数据库（*最好当然是用AWS DynamoDB啦，或者AWS EC2上装mysql，不用AWS也可以，但是访问速度可能会有一定影响，毕竟如果都用AWS的话算是走内网会快一些？！*），不需要任何网络应用的框架你就能开发出非常RESTful的API了，简直是中小型公司提高开发效率的神器！

再简单的来说，API Gateway给你提供一个URL，当这个url被访问的时候，就会调用你设置的某个Lambda函数，这个函数执行完了之后就会返回你设定的数据。也就是说，以前你在服务器端收到一个请求，然后**“做一堆事”**完了之后发出响应Response的这个“做一堆事”和Response，写在一个Lambda函数里就可以了。

> 通常如果浏览器端使用ajax访问这个URL都会存在跨域的问题，API Gateway当然很贴心的提供了enable CORS选项！

AWS Lambda目前支持python，JAVA，NodeJS。这个Lambda函数呢，只是叫Lambda而已，实际写起来跟函数式编程也没有太大的关系，以前怎么写现在也还是一样的写…神奇的是，Lambda之间可以相互调用，另外除了API Gateway之外，很多别的跟API Gateway无关的事件event也可以作为trigger（*比如当DynamoDB的某个Table新增一条用户记录的时候，调用一个名称为`sendWelcomeEmailToUser()`的Lambda函数，给用户发欢迎邮件*）

那么，问题来了…~~挖掘机技术哪家强~~
如何设置AWS API Gateway和AWS Lambda来实现开发/测试/生产环境的需求呢？难道要同一个功能的API建3个、同一个功能的lambda建3个？！

---
以下所有内容都是在AWS的WEB UI中进行设置的。*（除了在UI中设置，还可以写Shell脚本去批量执行这些设置，当然啦，这个我还没学会…）*

哦，忘了说…首先你要有个…API，然后你还要有个Lambda。
假设：
* **API endpoint是 /stageTest，方法是`GET`。** *（成就GET√  =(:з」∠)_）*
* **Lambda名为stageTest。** *（endpoint的名字和lambda名字可以不同…原谅我是取名无能星人…）*

### DEV / QA / PROD 环境的设置
1. **为API Gateway创建不同的stage[^1]，假设创建了3个分别是dev，qa，prod。** *（教程是官方英文的，点引用的链接就可以看到，憋让我翻译，我懒…我知道还有pre-prod，多加一个下面的解释就得多写好多字(ಥ_ಥ)）*
> 设置了stage之后你的api endpoin看起来大概长这样：
 - <aws-apiID>.execute-api.<aws-region>.amazonaws.com/dev
 - <aws-apiID>.execute-api.<aws-region>.amazonaws.com/qa
 - <aws-apiID>.execute-api.<aws-region>.amazonaws.com/prod
2. **为每个的Stage设置stageVariables[^2]，假设为每个Stage都设置了一个名为env的变量**
 * dev这个stage中env变量的值为DEV
 * qa这个stage中env变量的值为QA
 * prod这个stage中env变量的值为PROD
3. **Lambda stageTest()函数创建不同的alias[^3][^4]，假设创建了3个分别是DEV，QA，PROD，分别指向不同的版本。**
> - 在每次deploy后，都是$LATEST版本，点action>publish new version发布不同的版本
 - 建议DEV指向$LATEST版本，QA和PROD指向其他稳定的版本
 - 为Lambda创建了alias之后，其实这个lambda访问的名称就有了以下四种：`stageTest`，`stageTest:DEV`，`stageTest:QA`，`stageTest:PROD`，其中`stageTest`永远指向$LATEST版本，其他指向之前设置的各个版本
4. **整合API /stageTest 的GET方法与Lambda stageTest()[^5]**
 - 首先在API Gateway的界面中设置每个API方法的**Integration Request**：Integration Type选择Lambda Function；Lambda Function填`stageTest:${stageVariables.env}`，**${stageVariables.env}**就是第2步中，设置的变量。
 - 设置Lambda Function名称的时候一定要记得点旁边的√保存，保存的时候，AWS会弹出一个对话框，需要给函数加上权限才能使用stageVariables变量。加的时候记得要执行三次命令，也就是在AWS给出的命令的对应的位置改成 `stageTest:DEV`，`stageTest:QA`，`stageTest:PROD` 每个执行一次。
 - 执行以上命令之前，你必须：
    - 安装AWS CLI
    - 执行命令`aws configure`，填写你的AWS ID和key，设施default region为你的lambda function所在的region

那么，问题又来了…
- 如果你已经部署了很多lambda和api却没有使用stage的话…似乎是不太可能手动去AWS界面上一个一个设置的
- 就算你已经在使用stage了，似乎也不太可能每次都手动去AWS界面上一个一个deploy最新的版本以及改变alias指向的版本的…

这个时候，你就必须研究[AWS CLI](https://aws.amazon.com/cli/)，然后写shell以及借助其他工具来进行自动化部署了…

其他参考：
* http://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html
* http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#stagevariables-template-reference
[^1]: http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-set-stage-variables-aws-console.html
[^2]: http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-set-stage-variables-aws-console.html
[^3]: http://docs.aws.amazon.com/lambda/latest/dg/versioning-aliases.html
[^4]: http://docs.aws.amazon.com/lambda/latest/dg/aliases-intro.html
[^5]: http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html