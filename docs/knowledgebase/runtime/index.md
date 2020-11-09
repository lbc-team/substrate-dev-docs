---
title: 概览
---

## Substrate Runtime
Runtime包含区块链上的业务逻辑，也就是其状态转换函数。 Runtime定义可用户可以调度的存储项目和功能。

Substrate提供了一组可以自由组合和配置的模块，并称之为“托盘”(pallets)，除此之外Substrate还提供了支持托盘和客户端交互的一些列库。 每个托盘包含特定专业领域相关的逻辑和存储，在runtime级别，可以使用标准托盘界面添加自己的托盘，并且能访问其他托盘的提供的公共方法和特性。

整个托盘和支持库集称为_FRAME。_FRAME通过实现_primitives._中的特性(traints)与客户进行交互。

![Runtime 组成](assets/runtime.png)

例如，如果要向区块链添加智能合约功能，则只需添加[合约]（https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_contracts/index.html）托盘。
添加这个托盘会暴露显示智能合约的接口，使用户可以部署在Wasm中执行的智能合约。

由于Substrate可以在本地和Wasm中执行runtime，因此无需硬分叉就可以升级在FRAME中编写的任何内容。

### Learn More

- Follow a
  [tutorial to develop your first Substrate chain](../../tutorials/create-your-first-substrate-chain/).
- Follow a
  [tutorial to add a pallet to your Substrate runtime](../../tutorials/add-a-pallet-to-your-runtime/).
