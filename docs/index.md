---
title: 概述
---

Welcome to the wonderful world of blockchain development with Substrate! This is the Substrate Knowledge Base, the
official documentation hub for Substrate developers. The purpose of this resource is to help readers understand the
multi-disciplinary field of blockchain development with Substrate. This guide is broken down into several sections that
explain the principles and design decisions that Substrate is built on as well as the specific skills needed to to be an
effective Substrate blockchain developer.


> **一些专业知识是需要的**
> 为了充分利用Substrate，您应该对计算机科学、区块链概念和基本密码学有很好的了解。 例如：区块头，区块，客户端，哈希，交易和签名等术语应该很熟悉。
> Substrate is built on the Rust programming language, which makes use of novel design patterns to enable development of code that is
> safe and fast. Although you don't need to know Rust to get started with Substrate, a good understanding of Rust will
> allow you to be a better Substrate developer. Check out [the excellent resources](https://www.rust-lang.org/learn)
> provided by the Rust community to build your Rust development skills.

Substrate takes a modular approach to blockchain development and defines a rich set of primitives that allows developers
to make use of powerful, familiar programming idioms.



## Architecture

![Substrate Client Architecture](assets/substrate-arch.png)

The Substrate client is an application that runs a Substrate-based blockchain node - it consists of several components
that include, but are not limited to, the following:

- **Storage** is used to persist the evolving state of the decentralized system represented by a blockchain. The
  blockchain network allows participants to reach trustless [consensus](knowledgebase/advanced/consensus) about the
  state of storage. Substrate ships with a simple and highly efficient
  [key-value storage mechanism](knowledgebase/advanced/storage).
- **Runtime** logic defines how blocks are processed, including state transition logic. In Substrate, runtime code is
  compiled to [Wasm](knowledgebase/getting-started/glossary#webassembly-wasm) and becomes part of the blockchain's
  storage state - this enables one of the defining features of a Substrate-based blockchain:
  [forkless runtime upgrades](knowledgebase/advanced/executor#forkless-runtime-upgrades). Substrate clients may also
  include a "native runtime" that is compiled for the same platform as the client itself (as opposed to Wasm). The
  component of the client that dispatches calls to the runtime is known as the
  [executor](knowledgebase/advanced/executor) and it selects between the native code and interpreted Wasm. Although the
  native runtime may offer a performance advantage, the executor will select to interpret the Wasm runtime if it
  implements a newer [version](knowledgebase/advanced/executor#runtime-versioning).
- **Peer-to-peer network** capabilities allow the client to communicate with other network participants. Substrate uses
  [the `libp2p` network stack](https://libp2p.io/).
- **Consensus** engines provide logic that allows network participants to agree on the state of the blockchain.
  Substrate makes it possible to supply custom consensus engines and also ships with several consensus mechanisms that
  have been built on top of [Web3 Foundation research](https://w3f-research.readthedocs.io/en/latest/index.html).
- **RPC** (remote procedure call) capabilities allow blockchain users to interact with the network. Substrate provides
  HTTP and WebSocket RPC servers.
- **Telemetry** metrics are exposed by way of an embedded [Prometheus](https://prometheus.io/) server.



## 用法

![技术自由与开发便利](assets/technical-freedom.png)


Substrate 被设计可通过以下三种方式之一使用：


1. **使用 Substrate 节点**: 您可以运行预先设计好的[Substrate节点](https://github.com/paritytech/substrate/tree/master/bin/node)并[配置](https://github.com/paritytech/substrate/blob/master/bin/node/cli/src/chain_spec.rs)创世块。 在这种情况下，您只需要配置JSON文件就可以启动一个自己链。 此时拥有的很少的可定制性，仅仅允许你更改运行时模块的初始参数，比如：余额，质押（staking），出块周期，费用，治理。关于这部分的教程，请参考[创建第一条Substrate链](tutorials/create-your-first-substrate-chain)和[用 Substrate启动一个私有网络](tutorials/start-a-private-network/index.md)


2. **使用 Substrate FRAME**: 您可以使用 [FRAME](knowledgebase/runtime/frame.md) (包含多个模块化的运行时组合框架)轻松创建自己的自定义运行时(Runtime)。 你有极大自由度来编写自己的区块链逻辑，你可以更改数据类型，从模块库(称为“pallets”)中进行选择或添加自己的自定义pallet。[Substrate 开发者节点模板](https://github.com/substrate-developer-hub/substrate-node-template) 非常适合开始类似的项目，你可以查看教程[构建一个 dApp](tutorials/build-a-dapp) 和 [添加一个 Pallet](tutorials/add-a-pallet)


3. **使用 Substrate Core**: 你可以忽略所有的[FRAME](knowledgebase/runtime/frame.md)，从零开始设计和实现运行时。可以使用任何能生成 [WebAssembly](https://webassembly.org/)的语言来完成。 如果运行时可以与Substrate节点的抽象区块生成逻辑兼容，那么您可以简单地从Wasm Blob构建一个新的创世纪块，并使用现有的基于Rust的Substrate客户端启动链。
如果没有，那么您将需要更改客户端的区块生成逻辑，甚至可能会更改区块头和块序列化格式。就开发工作而言，这是迄今为止使用Substrate最为困难的方法，同时也为您提供了最大的创新自由。

## 下一步

### 学习更多

- 阅读开发文档：[使用 FRAME 进行模块开发](knowledgebase/runtime/frame.md).
- Refer to the developer documentation for the [FRAME system for runtime development](knowledgebase/runtime).
- Learn how to create rich client applications for any Substrate-based chain by using the
  [Polkadot-JS](knowledgebase/integrate/polkadot-js) family of libraries.
- Dive deep into advanced topics, like Substrate's [SCALE encoding](knowledgebase/advanced/codec),
  [consensus mechanisms](knowledgebase/advanced/consensus), [cryptography](knowledgebase/advanced/cryptography), and
  [storage implementation](knowledgebase/advanced/storage).



### 示例

- 跟随 [教程](../../tutorials) to learn about building and running blockchains with Substrate and FRAME.
- Refer to the [Substrate Recipes](https://substrate.dev/recipes/) to find complete working examples that demonstrate
  solutions to common problems.


### 阅读手册

- 前往 [Rust 手册](https://substrate.dev/rustdocs) that ships with the Substrate code base.

