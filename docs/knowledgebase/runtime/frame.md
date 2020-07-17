---
title: FRAME
---

**FRAME:Framework for Runtime Aggregation of Modularized Entities** ，即运行时模块聚合框架。
FRAME 是一系列用来简化Runtime开发的模块（称为Pallet）和相关的支持库组成。
每个Pallet 是用于处理特定逻辑领域的单独模块。


FRAME 提供了一些辅助模块用于和Substrate Primitives进行交互, Substrate Primitives为核心客户端提供了接口。

## 概述

下图展示了 FRAME 总体架构和它支持库：

![frame-arch](assets/frame-arch.png)

### Pallet


当使用 FRAME 来构建时，Substrate 运行时（runtime）是由叫做 pallet 的更小的组件组成。一个 pallet 包含一组类型，存储以及为运行时定义的一组函数。


### 系统库(System Library)

[系统库](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_system/index.html) 为你的区块链提供了底层的类型、存储以及函数。所有其他的pallet都依赖于系统库作为 Substrate 运行时的基础。

系统库为 Substrate 运行时定义了所有核心数据类型，比如：

- Origin
- Block Number
- Account Id
- Hash
- Header
- Version
- etc...

还有一些系统关键的存储项, 比如：

- Account Nonce
- Block Hash
- Block Number
- Events
- etc...

最后，它还定义了一些底层的函数，用于访问你的区块链存储，验证交易的签名等等。


### Executive 模块

[FRAME Executive 模块](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_executive/index.html)充当rumtime 的调度层。 它将传入的外部调用分发到对应的pallet。


### 支持库(Support Library)

[FRAME 支持库](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_support/index.html) 一组Rust宏，类型，traits，以及用于简化 Substrate pallet 开发的函数组成。

支持宏可在编译时展开生成在运行时调用的代码，使用宏可减少（编写）pallet 中最常见组件的样板代码。


### 运行时(Runtime)

运行时库把所有这些组件和 pallet 组合在一起。它定义了在运行时中包含哪些 pallet，并把他们配置在一起来构成最终的运行时。当对运行时进行调用时，它使用Executive模块来分发这些调用到各自的 pallet 中。


### Benchmarking

用于基准测试FRAME rumtime的宏。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_benchmarking/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/benchmarking/src/lib.rs)

## 一些预编译的Pallet

有一些特别通用的 pallet ，他们可在许多区块链中复用。任何人都可以自由的编写并分享有用的 pallet。Substrate 提供了一些比较流行的 pallet，让我们来探索它们。


### Asset

Asset pallet 是一个简单安全、用于处理可替代资产模块。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_assets/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/assets/src/lib.rs)

### Atomic Swap

原子交换（Atomic Swap）是一个用于将资金原子的从来源者(origin)发送到目标者(target)的模块。使用了一个证明去允许目标者批准(approve/claim)交换(swap)。 如果未在指定的时间内批准，发送方可以取消它。


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_atomic_swap/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/atomic-swap/src/lib.rs)

### Aura

Aura pallet 通过管理线下报告（offline reporting）实现 Aura 共识。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_aura/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/aura/src/lib.rs)

### Authority Discovery

Authority Discovery pallet 在 `core/authority-discovery` 用来检索当前的权威者集合，获得它自己的权威者 ID，以及对来自其他权威者的消息进行签名和验证。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_authority_discovery/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/authority-discovery/src/lib.rs)

### Authorship

Authorship pallet 用于追踪区块当前的生产者以及最近的叔块

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_authorship/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/authorship/src/lib.rs)

### BABE

BABE pallet 实现 BABE 共识算法， BABE 通过收集从 VRF 的输出链上随机数并且管理epoch的交易。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_babe/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/babe/src/lib.rs)

### Balances

Balances pallet 提供了管理账户和余额的功能。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_balances/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/balances/src/lib.rs)

### Benchmark

一个以隔离的方式包含常见的运行时模式的pallet。 此pallet不用于生产环境，仅用于基准测试。


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_benchmark/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/benchmark/src/lib.rs)

### Collective

Collective pallet 允许一组账户 IDs 通过分发来自特定来源的调用使他们感觉像是一个集合体。


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_collective/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/collective/src/lib.rs)

### Contracts

Contracts pallet 为运行时提供了部署和执行WebAssembly智能合约的功能。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_contracts/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/contracts/src/lib.rs)

### Democracy

Democracy pallet 提供了一个可用于处理通用的有利益相关者投票的民主制度。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_democracy/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/democracy/src/lib.rs)

### Elections Phragmen

Elections Phragmen 是一个基于[sequential phragmen](https://research.web3.foundation/en/latest/polkadot/NPoS/4.%20Sequential%20Phragm%C3%A9n%E2%80%99s%20method.html)的选举模块


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_elections_phragmen/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/elections-phragmen/src/lib.rs)

### Elections

Elections pallet 是一个选举模块，基于质押权重的成员选举。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_elections/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/elections/src/lib.rs)

### EVM

EVM pallet 是Substrate上的[以太坊](https://en.wikipedia.org/wiki/Ethereum) 虚拟机 (EVM)执行模块。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_evm/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/evm/src/lib.rs)

### Example Offchain Worker

链下工作机示例：一个简单的 pallet，展示了大多数链下工作机共有的概念，API和结构。


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_example_offchain_worker/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/example-offchain-worker/src/lib.rs)

### Example

Example pallet 是一个简单的 pallet 示例，演示了大多数 pallet 常用的一些概念，API以及结构。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_example/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/example/src/lib.rs)

### Finality Tracker

 Finality Tracker pallet 跟踪块作者所感知的最后一个最终确定的块。


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_finality_tracker/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/finality-tracker/src/lib.rs)

### Generic Asset

Generic Asset pallet 提供了用于处理账号和资产余额的功能。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_generic_asset/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/generic-asset/src/lib.rs)

### GRANDPA

GRANDPA pallet 通过管理针对本地代码管理GRANDPA权威集合扩展了 GRANDPA（祖父）共识算法。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_grandpa/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/grandpa/src/lib.rs)

### Identity

A federated naming system, allowing for multiple registrars to be added from a specified origin. Registrars can set a fee to provide identity-verification service. Anyone can put forth a proposed identity for a fixed deposit and ask for review by any number of registrars (paying each of their fees). Registrar judgements are given as an enum, allowing for sophisticated, multi-tier opinions.


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_identity/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/identity/src/lib.rs)

### I'm Online

I'm Online pallet 允许验证器在每个新的会话中发送一个心跳交易以表明这个节点处于在线状态。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_im_online/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/im-online/src/lib.rs)

### Indices

Indices 会为每一个新创建的账户分配索引。一个索引就是一个地址的简短形式。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_indices/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/indices/src/lib.rs)

### Membership

The Membership pallet allows control of membership of a set of `AccountId`s, useful for managing membership of a collective.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_membership/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/membership/src/lib.rs)

### Multisig

A module for doing multi-signature dispatches.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_multisig/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/multisig/src/lib.rs)

### Nicks

Nicks is a trivial module for keeping track of account names on-chain. It makes no effort to create
a name hierarchy, be a DNS replacement or provide reverse lookups.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_nicks/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/nicks/src/lib.rs)

### Offences

The Offences pallet tracks reported offences.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_offences/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/offences/src/lib.rs)

### Proxy

A module allowing accounts to give permission to other accounts to dispatch types of calls from
their signed origin.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_proxy/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/proxy/src/lib.rs)

### Randomness Collective Flip

随机集合翻转(Randomness Collective Flip) pallet 提供了一个`random`函数，它根据前81个区块的哈希值来生成一个低干预的随机数。该pallet不适用于生产环境。


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_randomness_collective_flip/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/randomness-collective-flip/src/lib.rs)

### Recovery

The Recovery pallet is an M-of-N social recovery tool for users to gain access to their accounts if
the private key or other authentication mechanism is lost. Through this pallet, a user is able to
make calls on-behalf-of another account which they have recovered. The recovery process is protected
by trusted "friends" whom the original account owner chooses. A threshold (M) out of N friends are
needed to give another account access to the recoverable account.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_recovery/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/recovery/src/lib.rs)

### Scheduler

This module exposes capabilities for scheduling dispatches to occur at a specified block number or
at a specified period. These scheduled dispatches may be named or anonymous and may be canceled.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_scheduler/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/scheduler/src/lib.rs)

### Scored Pool

The Scored Pool pallet maintains a scored membership pool where the highest scoring entities are made members.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_scored_pool/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/scored-pool/src/lib.rs)

### Session

会话(Session) pallet 允许验证器管理他们的会话密钥，并提供了一个函数用于改变会话长度以及处理会话翻转（session rotation）。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_session/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/session/src/lib.rs)

### Society

社团（Society） module 是一种经济博弈，旨在激励用户参与并维护社团。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_society/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/society/src/lib.rs)

### Staking

质押（Staking） pallet 用于网络维护者管理质押资金。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_staking/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/staking/src/lib.rs)

### Sudo

超强权限(Sudo) pallet 单个账户 (称为"sudo key") 执行分发(dispatchable)功能或者指派一个新的账户作为 sudo 密钥来替换它们。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_sudo/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/sudo/src/lib.rs)

### Timestamp

时间戳(Timestamp) pallet 提供了获取及设置链上时间的功能。

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_timestamp/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/timestamp/src/lib.rs)

### Transaction Payment


交易支付(Transaction Payment)提供了一个计算预分派的交易费用的基本逻辑。


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_transaction_payment/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/transaction-payment/src/lib.rs)

### Treasury

金库(Treasury) pallet 提供了一个由系统中 stakeholders 来管理的存钱罐（pot），以及一些结构用于处理存钱罐使用资金的提案。


- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_treasury/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/treasury/src/lib.rs)

### Utility

A stateless module with helpers for dispatch management.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_utility/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/utility/src/lib.rs)

### Vesting

A simple module providing a means of placing a linear curve on an account's locked balance. This
module ensures that there is a lock in place preventing the balance to drop below the unvested
amount for any reason other than transaction fee payment.

- [文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_vesting/index.html)
- [源码](https://github.com/paritytech/substrate/blob/master/frame/vesting/src/lib.rs)

## 下一步

### 了解更多

- 学习 [如何开发一个自定义的 Substrate pallet](pallets).

### 示例

- 跟随教程[在你的 Substrate 运行时里添加一个pallet](../../tutorials/add-a-pallet-to-your-runtime/).

### 参考文档

- 访问[系统库](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_system/index.html) 文档。

- 访问[Executive pallet](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_executive/index.html)文档。

- 访问[FRAME support library](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_support/index.html)文档。
