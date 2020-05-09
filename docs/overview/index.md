---
title: "Introduction"
---

Substrate 是一个带有完全通用状态转换功能([STF](../conceptual/runtime/index.md))的区块链开发框架以及用于共识，网络和配置的模块组件。


尽管它是“完全通用”的，但它同时也自带了一个标准和规范 - 特别是 Substrate 运行时模块库（又名 FRAME）- 由于底层数据结构对 STF 的支持，从而使得快速开发区块链成为可能

## 核心数据类型

有几种数据类型与底层的 Substrate 核心一起工作（因此它们是“核心”数据类型）。他们是强制性定义的，并且必须实现（其中）一个特定的接口才可以在 Substrate 框架内工作。

每一个数据类型都对应了一个 Rust 的 `trait`。它们是：
- `Hash`，对某些数据的加密摘要进行编码的一种类型，通常只有256位（bit）。
- `BlockNumber`, 对任何合法区块的祖先总数进行编码的一种类型。通知是 32-bit。
- `DigestItem`, 一种必须有能力对许多可供选择的和共识与变更追踪相关的“硬链接”中的一个以及许多和运行时内特定模块相关的“软编码”变体进行编码的类型。
- `Digest`, 基本上就是一串`DigestItem`，它编码了与轻5客服端相关的所有信息。
- `Header`, 一种表示和块相关的所有信息（加密方式或其他方面的一些信息）的一种类型。它包括了（区块的）父哈希值，存储根，extrinsics 前缀树根，（区块）摘要以及块号。
- `Extrinsic`, a type to represent a single piece of data external to the blockchain that is recognized by the blockchain. This typically involves one or more signatures, and some sort of encoded instruction (e.g. for transferring ownership of funds or calling into a smart contract).
- `Block`, essentially just a combination of `Header` and a series of `Extrinsic`s, together with a specification of the hashing algorithm to be used.

Generic reference implementations for each of these traits are provided in the [SRML](overview/glossary.md#srml-substrate-runtime-module-library). Technically these need not be used, but there are few cases where they are insufficiently generic for a use case.

>**一些专业知识**
>
> 为了更好的发挥substrate的潜能，你应该对区块链概念和基本的密码学要有一些了解。（一些）术语像（区块）头，区块，客户端，哈希，交易以及签名都应该要熟悉。目前你需要会rust编程知识，这样才有能力对substrate做任何有意义的定制/适配（尽管我们的目标并不是这个（译注：指深入学习rust））。

## Usage

Substrate is designed to be used in one of three ways:

1. **With our bundled Node**: By running the pre-designed Substrate Node (`substrate`) and configuring it with a genesis block that includes the current demonstration runtime. In this case just configure a JSON file and launch your own blockchain. This affords you the least amount of customizability, primarily allowing you to change the genesis parameters of the various included runtime modules such as balances, staking, block-period, fees and governance. For a tutorial on doing this, see [Deploying a Substrate Node chain](tutorials/start-a-private-network-with-substrate).

2. **With the SRML**: By composing modules from the [SRML](overview/glossary.md#srml-substrate-runtime-module-library) into a new runtime, perhaps adding new custom modules and possibly altering or reconfiguring the Substrate client's block authoring logic. This affords you a very large amount of freedom over your own blockchain's logic, letting you change datatypes, select from the library of modules and, crucially, add your own modules. Much can be changed without touching the block-authoring logic since it is directed through on-chain logic. If this is the case, then the existing Substrate binary can be used for block authoring and syncing. If the block authoring logic needs to be tweaked, then a new altered block-authoring binary must be built as a separate project and used by validators. This is how the Polkadot relay chain is built and should suffice for almost all circumstances in the near to mid-term. For a tutorial on this, see [creating your first Substrate chain](tutorials/creating-your-first-substrate-chain).

3. Generic: The entire [SRML](overview/glossary.md#srml-substrate-runtime-module-library) can be ignored and the entire runtime designed and implemented from scratch. If desired, this can be done in a language other than Rust, providing it can target WebAssembly. If the runtime can be made to be compatible with Substrate Node's abstract block authoring logic, then you can simply construct a new genesis block from your Wasm blob and launch your chain with the existing Rust-based Substrate client. If not, then you'll need to alter the client's block authoring logic accordingly, potentially even altering the header and block serialization formats. In terms of development effort this is by far the most arduous means to use Substrate, but also gives you the most freedom to innovate. It reflects a long-term far-reaching upgrade path for the Substrate paradigm.
