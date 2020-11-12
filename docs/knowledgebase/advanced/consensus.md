---
title: 共识
---

区块链节点使用共识引擎来达成区块链状态一致性。本文涉及区块链系统的共识基础知识，共识如何与substrate framework中的runtime进行交互，以及共识引擎是如何在framework中存在的。


## 状态机


区块链 runtime 是一个[状态机](https://en.wikipedia.org/wiki/Finite-state_machine)。它有一些内部状态和状态转换功能允许它从现有状态转换到未来状态。在大多数runtime中，状态可以合法地转换到多个将来状态，但仅有一个状态转换必须被选择。

区块链必须具有以下共识：

- 一些初始状态，称为“创世纪区块（genesis）”，
- 一系列状态转换，称为“区块”，以及
- 一个最终（目前）状态。


为了转换后的结果状态达成一致。所有的区块链[状态转换](../runtime/index)必须是确定的。


## 解决冲突

在中心化系统中，中心机构通过记录状态转换的顺序在相互排斥的备选方案中进行选择，当冲突产生时选择第一个竞争方案

在去中心化系统中，节点会以不同的顺序记录交易，并且因此他们必须使用更精心设计的方案来排除交易。更为麻烦的是，区块链网络力求容错，这意味着即使有些参与者不遵守规则，它们也应该继续提供一致的数据。

区块链会把多笔交易打包进一个区块并且（需要）有方法选择哪个参与者有权提交区块。例如，在一个工作量证明的链中，首先找到合法的工作量证明的节点有权把区块提交到链中。

Substrate提供一些区块构建算法，同时也允许你定制自己的：

- Aura (轮训))
- BABE (基于插槽(slot))
- 工作量证明

## 分叉选择规则

一个区块包含了区块头和一系列的[外部交易(extrinsics)](../node/extrinsics)。区块头必须包含一个指向它父区块的引用，使得能够追溯到链的创世纪块。当两个区块指向同一个父区块分叉就发生了。必须解决分叉使得只存在唯一的候选链。

一个分叉选择规则是一种选择“最佳”链的算法，并且选择的链可以被延伸。Substrate通过[`SelectChain` Trait](https://substrate.dev/rustdocs/v2.0.0/sp_consensus/trait.SelectChain.html)来展示这个概念。 

Substrate允许你定制自己的分叉选择规则，或开箱即用当前实现的。
例如：


### 最长链规则


最长链规则很简单，它定义了最佳链就是最长的链。Substrate通过[`LongestChain` 结构体](https://substrate.dev/rustdocs/v2.0.0/sc_client/struct.LongestChain.html)提供了链选择规则。GRANDPA使用最长链规则来投票。

![最长链规则](assets/consensus-longest-chain.png)


### 幽灵(GHOST)规则

根据贪心最重观察子树(GHOST: Greedy Heaviest Observed SubTree)规则： 从创世块开始，依据最多区块的分支的方式来选择每个分叉，并依此递归。


![GHOST rule](assets/consensus-ghost.png)

##  区块生成

区块链网络中的某些节点能够生成新的区块，这一过程称为授权(authoring)。准确来说，哪个节点能够授权生成区块取决于你使用了什么样的共识引擎。在一个中心化的网络中，一个单一节点能够授权生成所有的区块，然而在一个完全无权限（premissionless）的网络中，一个算法必须为每个高度选择区块生产者。


### 工作量证明（POW）

在一个工作量证明的系统中例如比特币，任何节点都可能在任何时间产生区块，只要它能解决一个高计算量的问题。解决问题需要CPU时间，并且因此矿工只能通过消耗它们的计算资源成比例的产生区块。Substrate提供了一个工作量证明的区块生成引擎。


### 插槽(slot)


基于插槽(slot)的共识算法必须有一组已知的验证人，这些验证人可以生成块。时间被分配到不同的插槽中，并且在每个插槽时间内只有一些验证者能够产生区块。每个验证者能够在插槽时间内授权产生区块的细节根据引擎的不同而不同。Substrate提供Aura和Babe，两者都是基于插槽的区块生成引擎。


## 最终确定性（Finality）


用户在任何系统中都想知道他们的交易什么时候最终确定，区块链上也是如此。在一些传统的系统中，当一个收据被移交或者文件被签署代表着最终确定性


使用区块生成模式以及当前描述的分叉选择规则，交易是不会完全确定的。永远可能会有一个更长的（或权重更重的）链来回滚（revert）你的交易。然而当更多的区块基于某个特定区块上产生时，被回滚的可能性就更小。这样的话，使用着合适的分叉选择规则是可以提供概率性的确定性。


当需要最终的确定性，一个最终确定性小工具（gadget）可被添加到区块链逻辑上。
一个固定授权集合的成员可进行确定性投票，当足够的投票被投到一个特定的区块时候，这个区块被认为是最终确定的。在大多数系统中，这个阙值是2/3。没有外部调整例如硬分叉的话，被完成的区块将是最终确定的，即不能回滚。


> 一些共识系统把区块生成和最终确定耦合起来了，就像，最终确定是区块生成的一部分，新区块`N+1`不能被生成直到区块`N`最终确定。
> 然而Substrate把两个过程分开并且允许你使用任何区块生成引擎，其本身就具有概率性确定性，或者加上一个最终确定性的小工具（gadget）


在使用最终确定性小工具的系统中，分叉选择规则必须被修改为考虑终确定性的结果。例如，一个节点可能选择有最新的具有确定性区块的最长链而不是（单纯的）最长的链。


## Substrate中的共识

Substrate框架集成了一些共识引擎，用于提供区块生成或确定性。本文提供了Substrate包含引擎的简明概要。欢迎开发者提供自己的定制共识算法。


### Aura

[Aura](https://substrate.dev/rustdocs/v2.0.0/sc_consensus_aura/index.html) 是一个基于插槽的区块生成机制。

在Aura中一个已知的验证者集合轮流生成区块。


### BABE


[BABE](https://substrate.dev/rustdocs/v2.0.0/sc_consensus_babe/index.html)同样是基于插槽的、由一个已知的验证者集合来生成区块。
这些方式和Aura相似。不像Aura，BABE 插槽分配建立可验证随机函数（VRF）上。每一个验证者在一个周期（epoch）分配了一个权重(weight)。
这个周期（epoch）被分成多个插槽，验证者在每个周期（epoch）验证的VRF。对于验证者VRF输出低于权重（weight）的插槽，被允许生成一个区块。 

> 译者注：BABE共识引擎要做到下一个块生产者需要是随机挑选出来。在BABE中，时间被分为插槽(slot)，每个slot只能生产一个区块。多个slot为一个epoch。


因为多个验证者可以在相同的插槽下产生区块，比起Aura来BABE更容易产生分叉，并且甚至在好的网络环境下也很常见。


当在给定的插槽内没有区块的生产者时，Substrate 的 BABE 实现也有一个后备机制。这些次要("secondary")插槽分配允许 BABE 获得恒定的区块时间。




### 工作量证明

[工作量证明](https://substrate.dev/rustdocs/v2.0.0/sc_consensus_pow/index.html) 区块生成即不是基于插槽也不是通过已知的验证人集合。
在工作量证明中，任何人可以在任何时间产生区块，只要他们能解决一个计算挑战问题（典型的是一个哈希查找）。这个问题的难度可以通过提供目标出块时间来调整。


### GRANDPA

[GRANDPA](https://substrate.dev/rustdocs/v2.0.0/sc_finality_grandpa/index.html) 提供区块最终确定性。

它具有BABE类似的加权验证集合。 但是，GRANDPA不生成区块; 它只是监听区块生成引擎（如上述三个引擎）产生的块。 GRANDPA验证者对_chains（而不是_blocks）投票，即他们在认为“最佳”的区块上投票，并且其投票可应用于所有之前的区块。

一旦超过 2/3 的GRANDPA验证者对一个特定的区块投票，就认为具有最终的确定性。


### 与Runtime协作

就目前我们描述的，最简单的静态共识算法完全在Runtime之外运行。 但是，通过与Runtime协作的功能，许多共识变得更加强大。 例如包括工作证明中的可调难度，权威证明（POA）中的权限轮换以及权益证明网络（proof-of-stake）中基于权益（stake）的权重。

为了适应这些共识特征，Substrate有一个[`DigestItem`](https://substrate.dev/rustdocs/v2.0.0/sp_runtime/enum.DigestItem.html)的概念，这是一条从节点外部（共识所在之处）传递到Runtime的消息，反之亦然。


## 更多

由于BABE和GRANDPA都将在Polkadot网络中使用，因此Web3 Foundation提供了研究级别的算法报告。


- [BABE Research](https://research.web3.foundation/en/latest/polkadot/block-production/Babe.html)
- [GRANDPA Research](https://research.web3.foundation/en/latest/polkadot/finality.html)


所有具有最终确定性的算法（包括GRANDPA）都至少需要 `2f + 1` 个无故障节点，其中f是有故障或恶意节点的数量。
在这篇[在存在故障下达成协议](https://lamport.azurewebsites.net/pubs/reaching.pdf)论文或在[Wiki：拜占庭错误](https://en.wikipedia.org/wiki/Byzantine_fault)可以了解到有关这个阈值如何得来以及为什么的更多信息。

并非所有共识协议都定义单个权威链。 当具有相同父对象的两个块的状态转换没有冲突时，某些协议会验证[有向无环图](https://en.wikipedia.org/wiki/Directed_acyclic_graph) （DAG）。
