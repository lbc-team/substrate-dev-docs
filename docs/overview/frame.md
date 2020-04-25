---
id: frame
title: 模块化实体的运行时聚合的框架
---

# FRAME

模块化实体的运行时聚合框架（FRAME）是一组模块（称为面板）的集合以及用于简化运行时开发的库。面板就是框架中用于领域特定逻辑的单个模块。

FRAME提供了一些辅助模块用于和提供了核心客户端接口的 Substrate 原语进行交互。

## 概述

下图展示了 FRAME 的总体架构以及它支持的库：
![](https://substrate.dev/docs/assets/frame-arch.png)

### 面板

当使用 FRAME 来构建时，Substrate 运行时是由叫做 面板 的更小的组件组成。一个面板包含一组类型，存储项和函数，他们一起为运行时定义了一组特性和功能。

### 系统库


系统库为你的区块链提供了底层的类型，存储以及函数。所有其他的面板都依赖于系统库作为 Substrate 运行时的基础。

系统库为 Substrate 运行时定义了所有核心类型，比如：

* 源点（Origin）
* 块编号（Block Number）
* 账户号（Account Id）
* 哈希（Hash)
* 头（Header）
* 版本（Version）
* ...

它还有一些系统关键的存储项，比如：

* 特定账户（Account Nonce，译注：Nonce在区块链中表示对区块求哈希时用到的一个变量）
* 区块哈希（Block Hash）
* 区块编号（Block Number）
* 事件（Events）
* ...

最后，它还定义了一些底层的函数，用于访问你的区块链存储（交易），验证外来（区块）的起源等等。

### 可执行面板

可执行面板充当运行时的编排成。它在运行的时候分发传入的调用到各自的面板。

### 支持库

FRAME 支持库是一组 Rust 宏，类型，traits，以及用于简化 Substrate面板开发的函数组成。

支持宏可在编译时展开生成在运行时调用的代码并可减少（编写）面板 中最常见组件的的样板代码。

### 运行时

运行时库把所有这些组件和面板组合在一起。它定义了你运行时中包含哪些面板，并把他们配置在一起来构成你最终的运行时。当对你的运行时进行调用时，它使用可执行面板来分发这些调用到各自的面板中。

## 预编译面板

一些面板特别的通用，可在许多区块链中复用。任何人都可以编写并分享有用的面板。Substrate 提供了一些比较流行的面板，让我们来了解一些它们：

### 资产

资产面板是一个简单，安全模块，用于处理可替代资产。
* [文档](https://substrate.dev/rustdocs/master/pallet_assets/index.html)
* [源码](https://github.com/paritytech/substrate/blob/master/frame/assets/src/lib.rs)

### Aura（译注：一种共识算法）

Aura 面板通过管理离线报告扩展了 Aura 共识。
* [文档](https://substrate.dev/rustdocs/master/pallet_aura/index.html)
* [源码](https://github.com/paritytech/substrate/blob/master/frame/aura/src/lib.rs)

### Authority Discovery

Authority Discovery 面板在 core/authority-discovery 中用来检索当前的的权限集，获得它自己的权限 ID，以及对来自其他权限的消息进行签名和验证。
 * [文档](https://substrate.dev/rustdocs/master/pallet_authority_discovery/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/authority-discovery/src/lib.rs)

### Autorship

Authorship 面板用于追踪区块当前的所有者以及最近的叔（区块）
 * [文档](https://substrate.dev/rustdocs/master/pallet_authorship/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/authorship/src/lib.rs)

### BABE（译注：一种共识算法）

BABE 面板通过从 VRF 的输出中随机收集链上数据扩展了 BABE 共识算法，以及时代过度管理。
 * [文档](https://substrate.dev/rustdocs/master/pallet_babe/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/babe/src/lib.rs)

### Balances

Balances 面板提供了管理账户和余额的功能。
 * [文档](https://substrate.dev/rustdocs/master/pallet_balances/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/balances/src/lib.rs)

### Collective

Collective 面板允许一组账户 IDs 通过分发来自特定源的调用使他们感觉像是一个集合体。
 * [文档](https://substrate.dev/rustdocs/master/pallet_collective/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/collective/src/lib.rs)

### 合约

合约面板为运行时提供了部署和运行 WebAssembly 智能合约的功能。
 * [文档](https://substrate.dev/rustdocs/master/pallet_contracts/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/contracts/src/lib.rs)

### 民主

民主面板提供了一个可用于处理通用的有利益相关者投票的民主系统。
 * [文档](https://substrate.dev/rustdocs/master/pallet_democracy/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/democracy/src/lib.rs)

### 选举 Phragmen

Phragmen 选举面板是一个基于顺序 phragmen 的选举模块。
 * [文档](https://substrate.dev/rustdocs/master/pallet_elections_phragmen/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/elections-phragmen/src/lib.rs)

### 选举

选举面板是一个选举模块，用于集体中股份加权的成员选举。
 * [文档](https://substrate.dev/rustdocs/master/pallet_elections/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/elections/src/lib.rs)

### EVM（以太坊虚拟机）

EVM 是一个用于 Substrate 的以太坊虚拟机执行模块。
 * [文档](https://substrate.dev/rustdocs/master/pallet_evm/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/evm/src/lib.rs)


### Example

样例面板是一个简单的面板示例，演示了大多数面板常用的一些概念，api以及结构。
 * [文档](https://substrate.dev/rustdocs/master/pallet_example/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/example/src/lib.rs)

### Finality Tracker

Finality Tracker 面板用于追踪区块作者能感知到的最后的区块。
 * [文档](https://substrate.dev/rustdocs/master/pallet_finality_tracker/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/finality-tracker/src/lib.rs)

### 通用资产

通用资产面板提供了用于处理账号和资产余额的功能。
 * [文档](https://substrate.dev/rustdocs/master/pallet_generic_asset/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/generic-asset/src/lib.rs)

### 祖父

祖父面板通过管理针对本地代码设置的权威扩展了祖父共识算法。
 * [文档](https://substrate.dev/rustdocs/master/pallet_grandpa/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/grandpa/src/lib.rs)

### I'm Online

I'm Online 面板允许验证器在每个新的会话中闲话一个心跳事务以表明这个节点处于在线状态。
 * [文档](https://substrate.dev/rustdocs/master/pallet_im_online/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/im-online/src/lib.rs)

### 索引

索引面板会为每一个新创建的账户分配索引。一个索引就是一个地址的简短形式。
 * [文档](https://substrate.dev/rustdocs/master/pallet_indices/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/indices/src/lib.rs)

### 会员

会员面板允许控制一组账户的成员，这对于管理一组集合的会员比较有用。
 * [文档](https://substrate.dev/rustdocs/master/pallet_membership/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/membership/src/lib.rs)

### Offences

违规面板用于追踪报告违规（行为）。
 * [文档](https://substrate.dev/rustdocs/master/pallet_offences/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/offences/src/lib.rs)

### Randomness Collective Flip

随机集合翻转面板提供了一个随机函数，它根据前81个区块的哈希值来生成一个低影响的随机数。
 * [文档](https://substrate.dev/rustdocs/master/pallet_randomness_collective_flip/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/randomness-collective-flip/src/lib.rs)

### Scored Pool

得分池面板维护一个得分的成员资格池，（由）其中得分最高的实体制作会员。
 * [文档](https://substrate.dev/rustdocs/master/pallet_scored_pool/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/scored-pool/src/lib.rs)

### 会话

会话面板允许验证器管理他们的会话钥匙，并提供了一个函数用于改变会话长度以及处理会话旋转。
 * [文档](https://substrate.dev/rustdocs/master/pallet_session/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/session/src/lib.rs)

### Staking

Staking 面板通过网络维护者在危机关头来管理资金。
 * [文档](https://substrate.dev/rustdocs/master/pallet_staking/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/staking/src/lib.rs)

### Sudo

Sudo 面板允许单个账户（叫做“sudo密钥”）执行需要一个 Root 源的分发功能或者指派一个新的账户作为 sudo 密钥来替换它们。
 * [文档](https://substrate.dev/rustdocs/master/pallet_sudo/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/sudo/src/lib.rs)

### 时间戳

时间戳面板提供了获取或设置链上时间的功能。
 * [文档](https://substrate.dev/rustdocs/master/pallet_timestamp/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/timestamp/src/lib.rs)

### 交易支付

交易支付面板提供了一个计算预分派的交易费用的基本逻辑。
 * [文档](https://substrate.dev/rustdocs/master/pallet_transaction_payment/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/transaction-payment/src/lib.rs)

### 金库

金库面板提供了一个由系统中有利益相关的人来管理的资金“锅"，以及从这个“锅”中提供开支建议的结构。
 * [文档](https://substrate.dev/rustdocs/master/pallet_treasury/index.html)
 * [源码](https://github.com/paritytech/substrate/blob/master/frame/treasury/src/lib.rs)


## 下一步

### 了解更多
* 学习[如何开发一个自定义的 Substrate 面板](https://substrate.dev/docs/en/development/module/)。

### 样例
* 跟着教程[在你的 Substrate 运行时里添加一个面板](https://substrate.dev/docs/en/tutorials/adding-a-module-to-your-runtime)。


### 参考文献
* 访问[系统库](https://substrate.dev/rustdocs/master/frame_system/index.html)的参考文档
* 访问[可执行面板](https://substrate.dev/rustdocs/master/frame_executive/index.html)的参考文档
* 访问 [FRAME 支持库](https://substrate.dev/rustdocs/master/frame_support/index.html)的参考文档
