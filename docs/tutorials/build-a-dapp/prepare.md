---
title: 构建 DApp 的准备
---

## 安装 Node Template

<<<<<<< HEAD


在[创建第一个 Substrate 区块链](../create-your-first-substrate-chain) 里，你应该已经完成了[Substrate Node Template](https://github.com/substrate-developer-hub/substrate-node-template)的` v2.0.0-rc4`版本的编译。


如果你还没有做，请完成该教程。

> 有经验的开发人员会想跳过该教程，你可以根据  readme 指引来安装 node template 。

##  安装前端模板(Front End Template)

本教程还使用了ReactJS 前端模板，我们将对其进行修改以便于自定义Substrate区块链进行交互。 你将来可以使用相同的模板为自己的项目创建前端。

要使用前端模板，你需要安装[Yarn](https://yarnpkg.com)，其本身依赖[Node.js](https://nodejs.org/)。 如果你还没有安装这些工具，则可以从下面指引中安装它们：


- [安装 Node.js ](https://nodejs.org/en/download/)
- [安装 Yarn](https://yarnpkg.com/lang/en/docs/install/)

现在，你可以使用这些命令来设置前端模板。

```bash
# 从github克隆代码
git clone -b v2.0.0-rc4 https://github.com/substrate-developer-hub/substrate-front-end-template

# 安装依赖项
cd substrate-front-end-template
yarn install
```
=======
You should already have version `v2.0.0` of the
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)
compiled on your computer from when you completed the
[Create Your First Substrate Chain Tutorial](../create-your-first-substrate-chain). If you do not,
please complete that tutorial.

> Experienced developers who truly prefer to skip that tutorial may install the Node Template
> according to
> [the instructions in its readme](https://github.com/substrate-developer-hub/substrate-node-template#local-development).

## Install the Front-End Template

The Create Your First Substrate Chain Tutorial used the front-end template, so there is no
additional set-up required if you have already completed that tutorial.

> Refer directly to the
> [front-end setup instructions](../create-your-first-substrate-chain/setup#install-the-front-end-template)
> for the Create Your First Chain Tutorial if necessary.
>>>>>>> source

## 关于存在性证明（存证）

我们将构建的dApp是存在性证明服务（或简称存证服务），参考来自[Wikipedia](https://en.wikipedia.org/wiki/Proof_of_Existence)的定义：

> 存在性证明是一项在线服务，可通过带有时间戳的交易在比特币区块链中验证在特定时间里计算机文件的存在。

用户无需将整个文件上传到区块链以“证明其存在”，而是提交[文件的哈希](https://en.wikipedia.org/wiki/File_verification)，即文件摘要或校验和。 这些哈希值非常强大，用较小的哈希值就可以唯一表示一个巨大的文件，这对于在区块链上存储非常高效。 任何拥有原始文件的用户都可以通过简单地重新计算文件的哈希值并将其与链上存储的哈希值进行比较来证明该文件是否与区块链上的文件匹配。



![文件 hash](assets/tutorials/build-a-dapp/file-hash.png)



除此之外，区块链还提供了强大的身份系统。 因此，当文件摘要存储在区块链上时，我们还可以记录哪个用户上传了该摘要。 这使的该用户可以
在之后证明他们就是该文件的所有者。


<<<<<<< HEAD
=======
The dApp we will build is a Proof of Existence (PoE) service. From
[Wikipedia](https://en.wikipedia.org/wiki/Proof_of_Existence):
>>>>>>> source

我们的存在性证明pallet，将公开两个可调用的函数：

- `create_claim` - 允许用户通过上传文件摘要来声明文件的存在。
- `revoke_claim` - 允许声明的用户撤销其所有权。



<<<<<<< HEAD
我们只需要存储被声明的证明信息以及声明人。
=======
## Interface and Design

Our PoE API will expose two callable functions:
>>>>>>> source


<<<<<<< HEAD
=======
In order to implement this, we will only need to store information about the proofs that have been
claimed, and who made those claims.
>>>>>>> source

听起来很简单？ 太好了，让我们开始编码。