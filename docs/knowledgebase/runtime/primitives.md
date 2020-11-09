---
title: Runtime 基本类型
---

Substrate runtime由Substrate框架中runtime之外的部分需要的一组基本类型组成。

## 核心基本类型

Substrate框架对runtime必须提供给Substrate的其他层的内容做了最小的限定。 它们是必须被定义的，并且必须实现特定的接口才能在Substrate框架内运行。

他们是:

- `Hash`: 一种编码某些数据的加密摘要的类型，通常只有256位。

- `DigestItem`: 一种能编码“硬连线”的替代方案，硬连线包括共识、变更跟踪以及runtime中与任意“软编码”变量相关的特定模块。

- `Digest`: 一系列摘要函数类型，负责对与轻客户端相关的所有信息进行编码。

- `Extrinsic`: 表示可被区块链识别的单个外部数据类型。 通常包含一个或多个签名，以及某种编码指令（例如，用于转移资金所有权或调用智能合约）。

- `Header`: 代表（以密码或其他方式）所有与区块相关信息的类型。 它包括父哈希，存储根和外部树根，摘要和块高。

- `Block`: 其实是“区块头”和一系列“外部”的组合，以及要使用的哈希算法。

- `BlockNumber`: 一种编码任何有效块具有的祖先总数的类型，通常为32位。

## FRAME 基本类型

使用Substrate FRAME构建的runtime，还假定了其他一组基本类型。

- `Call`: 可以通过外部调用的调用类型。

- `Origin`: 表示调用来自何处，比如来自签名消息（一笔交易），未签名消息（固有外部消息）或runtime本身的调用（根调用)。

- `Index`: 帐户索引（也称为随机数）类型, 它存储与发送方帐户关联的先前交易数。

- `Hashing`: runtime使用的哈希系统（算法）(例如Blake2)。

- `AccountId`: runtime中帐户类型。

- `Event`: runtime中发出的事件类型。

- `Version`: runtime版本号类型.

## 下一步

### 进一步阅读

- Learn about the [Substrate FRAME](frame).

### 示例

- See how these generic types are implemented
  [in the Substrate node](https://github.com/paritytech/substrate/blob/master/bin/node/runtime/src/lib.rs).

### 参考

- View the
  [primitive types defined in `node-primitives`](https://substrate.dev/rustdocs/v2.0.0-rc4/node_primitives/index.html).

- View the
  [`traits` defined in `sp-runtime`](https://substrate.dev/rustdocs/v2.0.0-rc4/sp_runtime/traits/index.html)
