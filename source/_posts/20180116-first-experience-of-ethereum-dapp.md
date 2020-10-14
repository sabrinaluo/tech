---
title: 以太坊智能合约应用初体验
date: 2018-01-16 22:57:42 +8
tags: [Ethereum, Smart Contract, DApp, Blockchain]
category: Blockchain
---

我刚来香港那年（2012 年）上了 Pf.Lau 的 enterpreneur 课知道了比特币，那个时候好像才 CNY700 多块钱一枚，13 年的炒的最火的时候大概涨到了 6000，如今五年多过去，比特币最高已经十几万人民币一枚了，反正我是没挣到钱:( ， 14 年找工作的时候还差点去了一家比特币平台公司，这应该就是我跟区块链最初的良缘了。

最近半年也不知道为啥区块链特别火，到处的人们都在谈论区块链，感觉泡沫又快崩溃了。我个人是不看好比特币的货币属性的，但是对于区块链的去中心化以及智能合约应用却是很看好的。而且以太坊(Ethereum，缩写为 ETH)最火的开发平台(truffle)又是我最喜欢的 js，所以就看了看 demo 学了 ETH 界的 hello world (pet shop)

总的来说感觉配置环境还是有一点点麻烦，需要安装 nodejs, npm, truffle(开发平台), ganache(本地区块链), MetaMask(chrome 插件)

官方给的 demo 不错，缺点是很多文件解释的不太清楚。
大概流程如下：

1. 解压官方 demo `truffle unbox pet-shop`
2. 编写合约 Adoption.sol, 编译(compoile)合约 (目前还不知道编译是干什么用的)
3. 运行本地区块链
4. 编写迁移配置文件(`/migrates/*`)，迁移(migrate)应用到本地区块链
5. 测试合约
6. 编写前端 (web3.js)
7. 应用完成，可于网页中收养宠物

合约部分是用`solidity`，这是开发 ETH 应用所使用的语言，是静态类型语言，需要声明变量的类型，函数入参的类型及返回值的类型。用分号分隔每一句代码。

官方的例子是前后端全都在一个项目里，不知道是否可以前后端放在不同的项目里分开开发，前端负责界面、业务逻辑、web3 整合，后端负责合约的编写。不知道这样是否可行。

----- 分割线 ------
又看了两眼，感觉过程是这样的：

- 编译的时候生成了`/build/`文件夹下的与合约相关的 json 文件
- migrate 的时候极有可能是把对应的 json 放到区块链上去
- 前端通过 `App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');` 服务器获取合约相关的内容，由 web3 将获取的内容包装成一个实例
- 前端通过 web3 生成的实例进行相应操作

如果是按照以上的流程来走的话，前后端就是完全可以分开开发的了。初来乍到，如有猜的不对的地方还请各位大佬多多指教。:)

---

**Reference:**
http://truffleframework.com/tutorials/pet-shop
