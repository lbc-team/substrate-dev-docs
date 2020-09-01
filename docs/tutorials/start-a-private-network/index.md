---
title: "启动一个私有网络"
---

在本教程中，我们将学习和练习如何基于Substrate使用自己选择的验证者/权威集合启动区块链网络。


## 安装 Node Template

你应该已经在电脑上编译了[Substrate Node Template](https://github.com/substrate-developer-hub/substrate-node-template) 的 `v2.0.0-rc4` 版本，因为它是上一个教程的[创建第一个 Substrate 链](../../tutorials/create-your-first-substrate-chain/) 的内容，如果还没有完成的话，请先完成。


> 有经验的开发人员会想跳过该教程，那你参考 readme 指引可以安装节点模板

## 你会做什么

在开始之前，让我们列出在本教程中我们将要做的事情。
我们会：

1. 根据模板项目启动Substrate区块链**网络**。 
2. 生成ed25519和sr25519密钥对，以用作网络授权。
3. 创建和编辑 chainspec json 文件.

听起来合理吗？ 好，那就开始吧！
