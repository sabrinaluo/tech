---
title: AWS API Gateway Mapping Template 获取IP, header等
date: 2016-03-07 14:33:03
tags: [AWS, API Gateway, lambda, mapping templates, header]
category: AWS
---

API Gateway 暂时没有详细的中文文档，翻译无能的我实在不知道 Mapping Template 应该翻译成什么比较好。

### 适用场景

在配合 API Gateway 和 Lambda 来搭建 RESTful API 时，Lambda 获取的 payload 并非通常服务器端获取的一个 request 对象，lambda 获取到的 payload 并**不包含 request header**的内容，而只有**request body**的内容。

header 中的部分内容可以通过 API Gateway 提供的变量从 mapping template 中获取。可以获取的内容包括 IP, http 方法，路由参数，query 等，具体可以看文档[^1]

### 设置方法

按照理论来说，AWS 设置可以通过界面设置的都可以通过脚本来设置。下面只介绍在界面中的设置：

1. 在 API Gateway 界面中选中具体的 api 方法，点击右侧的**Intergration Request**
2. 在底部点击**Mapping Templates**
3. 点击**Add Mapping Template**，输入`application/json`，点击 √ 进行确认
4. 在右侧新出现的区域，点击编辑按钮（铅笔图标），输入需要的变量即可，例如要获取 ip：

```
{
  "body": $input.json('$'),
  "source_ip" : "$context.identity.sourceIp",
}
```

其中`$input.json('$')`是请求时客户端发来的 body

### response header 和 cookie

在配合使用 lambda 和 API gateway 的时候，header 和 cookie 是非常令人头疼的问题…
lambda 返回的内容，只是 response body，因此设置 header 要在 api gateway 中进行，并且也是有一些限制的：

1. 在 API Gateway 界面中选中具体的 api 方法，点击右侧的**Method Response**
2. 展开 HTTP Status，点击**Add Header**，添加一个 header。
   > **注意**：可以添加多个 Header，但这些 header 不能同名，这也就意味着，只能有一个`Set-Cookie`，只能添加一个 cookie
3. 完成以上步骤后，返回第一步所在的页面，点击**Integration Response**，点击三角展开，会看到**Header Mappings**
4. 在对应的位置编辑**mapping value**

- 如果想使用 lambda 返回的数据，设置为`integration.response.body.KEY`
- 如果不是使用 lambda（即把 gateway 用作代理），而是使用实际服务器返回的 header，设置为`integration.response.header.KEY`

### 参考

[^1]: http://docs.aws.amazon.com/zh_cn/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html

- http://docs.aws.amazon.com/zh_cn/apigateway/latest/developerguide/how-to-method-settings-execution-console.html
- http://docs.aws.amazon.com/zh_cn/apigateway/latest/developerguide/request-response-data-mappings.html
