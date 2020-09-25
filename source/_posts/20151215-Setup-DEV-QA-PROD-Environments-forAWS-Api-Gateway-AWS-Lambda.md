---
title: AWS API Gateway与AWS Lambda的整合及开发/测试/生产环境的设置
date: 2015-12-15 10:55:13
tags:
  [
    AWS,
    API Gateway,
    AWS Lambda,
    RESTful,
    开发环境,
    测试环境,
    生产环境,
    环境配置,
  ]
category: AWS
---

本文**不是**介绍 [AWS API Gateway](https://aws.amazon.com/api-gateway/) 和 [AWS Lambda](https://aws.amazon.com/lambda/)的基本用法的…=(:з」∠)\_

简单的来说，有了 AWS 的 API Gateway 和 Lambda 这两样东东，再加一个数据库（_最好当然是用 AWS DynamoDB 啦，或者 AWS EC2 上装 mysql，不用 AWS 也可以，但是访问速度可能会有一定影响，毕竟如果都用 AWS 的话算是走内网会快一些？！_），不需要任何网络应用的框架你就能开发出非常 RESTful 的 API 了，简直是中小型公司提高开发效率的神器！

再简单的来说，API Gateway 给你提供一个 URL，当这个 url 被访问的时候，就会调用你设置的某个 Lambda 函数，这个函数执行完了之后就会返回你设定的数据。也就是说，以前你在服务器端收到一个请求，然后**“做一堆事”**完了之后发出响应 Response 的这个“做一堆事”和 Response，写在一个 Lambda 函数里就可以了。

> 通常如果浏览器端使用 ajax 访问这个 URL 都会存在跨域的问题，API Gateway 当然很贴心的提供了 enable CORS 选项！

AWS Lambda 目前支持 python，JAVA，NodeJS。这个 Lambda 函数呢，只是叫 Lambda 而已，实际写起来跟函数式编程也没有太大的关系，以前怎么写现在也还是一样的写…神奇的是，Lambda 之间可以相互调用，另外除了 API Gateway 之外，很多别的跟 API Gateway 无关的事件 event 也可以作为 trigger（_比如当 DynamoDB 的某个 Table 新增一条用户记录的时候，调用一个名称为`sendWelcomeEmailToUser()`的 Lambda 函数，给用户发欢迎邮件_）

那么，问题来了…~~挖掘机技术哪家强~~
如何设置 AWS API Gateway 和 AWS Lambda 来实现开发/测试/生产环境的需求呢？难道要同一个功能的 API 建 3 个、同一个功能的 lambda 建 3 个？！

---

以下所有内容都是在 AWS 的 WEB UI 中进行设置的。_（除了在 UI 中设置，还可以写 Shell 脚本去批量执行这些设置，当然啦，这个我还没学会…）_

哦，忘了说…首先你要有个…API，然后你还要有个 Lambda。
假设：

- **API endpoint 是 /stageTest，方法是`GET`。** _（成就 GET√ =(:з」∠)\_）_
- **Lambda 名为 stageTest。** _（endpoint 的名字和 lambda 名字可以不同…原谅我是取名无能星人…）_

### DEV / QA / PROD 环境的设置

1. **为 API Gateway 创建不同的 stage[^1]，假设创建了 3 个分别是 dev，qa，prod。** _（教程是官方英文的，点引用的链接就可以看到，憋让我翻译，我懒…我知道还有 pre-prod，多加一个下面的解释就得多写好多字(ಥ_ಥ)）_
   > 设置了 stage 之后你的 api endpoin 看起来大概长这样：

- <aws-apiID>.execute-api.<aws-region>.amazonaws.com/dev
- <aws-apiID>.execute-api.<aws-region>.amazonaws.com/qa
- <aws-apiID>.execute-api.<aws-region>.amazonaws.com/prod

2. **为每个的 Stage 设置 stageVariables[^2]，假设为每个 Stage 都设置了一个名为 env 的变量**

- dev 这个 stage 中 env 变量的值为 DEV
- qa 这个 stage 中 env 变量的值为 QA
- prod 这个 stage 中 env 变量的值为 PROD

3. **Lambda stageTest()函数创建不同的 alias[^3][^4]，假设创建了 3 个分别是 DEV，QA，PROD，分别指向不同的版本。**
   > - 在每次 deploy 后，都是\$LATEST 版本，点 action>publish new version 发布不同的版本

- 建议 DEV 指向\$LATEST 版本，QA 和 PROD 指向其他稳定的版本
- 为 Lambda 创建了 alias 之后，其实这个 lambda 访问的名称就有了以下四种：`stageTest`，`stageTest:DEV`，`stageTest:QA`，`stageTest:PROD`，其中`stageTest`永远指向\$LATEST 版本，其他指向之前设置的各个版本

4. **整合 API /stageTest 的 GET 方法与 Lambda stageTest()[^5]**

- 首先在 API Gateway 的界面中设置每个 API 方法的**Integration Request**：Integration Type 选择 Lambda Function；Lambda Function 填`stageTest:${stageVariables.env}`，**\${stageVariables.env}**就是第 2 步中，设置的变量。
- 设置 Lambda Function 名称的时候一定要记得点旁边的 √ 保存，保存的时候，AWS 会弹出一个对话框，需要给函数加上权限才能使用 stageVariables 变量。加的时候记得要执行三次命令，也就是在 AWS 给出的命令的对应的位置改成 `stageTest:DEV`，`stageTest:QA`，`stageTest:PROD` 每个执行一次。
- 执行以上命令之前，你必须：
  - 安装 AWS CLI
  - 执行命令`aws configure`，填写你的 AWS ID 和 key，设施 default region 为你的 lambda function 所在的 region

那么，问题又来了…

- 如果你已经部署了很多 lambda 和 api 却没有使用 stage 的话…似乎是不太可能手动去 AWS 界面上一个一个设置的
- 就算你已经在使用 stage 了，似乎也不太可能每次都手动去 AWS 界面上一个一个 deploy 最新的版本以及改变 alias 指向的版本的…

这个时候，你就必须研究[AWS CLI](https://aws.amazon.com/cli/)，然后写 shell 以及借助其他工具来进行自动化部署了…

其他参考：

- http://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html
- http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#stagevariables-template-reference
  [^1]: http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-set-stage-variables-aws-console.html
  [^2]: http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-set-stage-variables-aws-console.html
  [^3]: http://docs.aws.amazon.com/lambda/latest/dg/versioning-aliases.html
  [^4]: http://docs.aws.amazon.com/lambda/latest/dg/aliases-intro.html
  [^5]: http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html
