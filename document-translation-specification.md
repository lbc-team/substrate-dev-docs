
# Substrate 文档翻译规范专项说明
本份 Substrate 文档翻译规范专项说明由登链社区译者组之 Substrate 翻译小组发起。由于 Substrate 目前还是是一个比较新的框架，其本身也带来了一些新的概念或术语，且缺少相关的中文资料，故此规范主要目的是希望译者对于术语的翻译可以达成共识，也方便读者阅读。

## 主要原则

* 有公认中文译法且已比较普遍的请直接翻译
* 有公认中文译法但还不是很普遍的也需翻译，但可在其后添加括号并注明英文原文


## 编程相关的一般性术语

这部分主要是和编程语言比较相关的一些术语或概念，这部分术语基本上都有对应公认的中文翻译。这部分建议直接把其对应的中文翻译出来即可，且不需要标括号注明。

举例：

| 英文  | 中文  |
|---    |   --- |
|unsigned int | 无符号整数
|boolean    | 布尔
|tuple      | 元组
|....


## 区块链相关的术语

这部分主要是和区块链相关的一些术语或概念，以及区块链用到的一些数据结构，共识算法等。这部分的一些术语或概念也基本上是有对应公认的中文翻译，但鉴于区块链还不是普遍的技术，建议可在这部分术语或概念的中文翻译后加括号并注明英文原文。

举例：

|英文   | 中文  |
| ---   | ---   |
| transaction   | 交易（transaction）
| contract      | 合约（contract）
| Merkle trees  | 梅克尔树（Merkle tress）
| Merkle root   | 梅克尔根（Merkle tress）
| ....          |


## Substrate 专有术语

由于 Substrate 本身是一个比较新的区块链框架，根据其框架的结构，它本身也出现了一些专有的术语，对于这部分术语，若官方有对应的中文的，建议直接翻译成对应中文，可在其后添加括号的方式注明英文原文；对于官方没有对应中文的术语，建议直接写英文原文，并用括号注释上对应的中文翻译。

举例：
|英文   | 中文  |
| ---   | ---   |
| pallets   | Pallet（面板）

样例：

**英文原文：**
> The Finality Tracker pallet tracks the last finalized block, as perceived by block authors.

**中文翻译：**
> Finality Tracker pallet（面板）用于追踪区块作者能感知到的最后完成的区块。

## 各个库或模块的名称

对于一些库或模块的名称，建议不翻译成中文，直接英文原文即可；

举例：

英文原文：
> The Transaction Payment pallet provides the basic logic to compute pre-dispatch transaction fees.

中文翻译:
> Transaction Payment pallet 提供了一个计算预分派的交易费用的基本逻辑。

