---
title: 共识
---

区块链节点使用共识引擎来达成区块链状态一致性的共识。本文涉及区块链系统的共识基础，共识如何在substrate的framework中和runtime进行交互，并且共识引擎是如何以framework的形式存在的。

## 状态机和冲突

区块链runtime是一个[状态机](https://en.wikipedia.org/wiki/Finite-state_machine)。它有一些内部状态，并且状态转换功能允许它从现有状态转到未来状态。在大多数runtime中有状态可以合法地转换到多个将来状态，但一个单独转换必须被选择。

区块链必须达成以下共识：

- 一些初始状态，称为“创始（genesis）”，
- 一系列状态转换，一些称为“区块”，以及
- 一个最终（目前）状态。

为了转换后的结果状态，所有的区块链[状态转换功能](../runtime/index.md)必须是确定的。

## 冲突排除

在中心化系统中，中心化权利中心在互斥方案中选择通过以见到他们的顺序来记录状态转换，当冲突产生时选择第一个竞争方案。在去中心化系统中，节点会以不同的顺序见到交易，并且因此他们必须使用更多的精心制作的方案来排除交易。作为将来的麻烦，区块链网络挣扎着具备容错性，意味着可以提供持续的数据尽管一些参与方不遵循规则。
区块链会把批量交易打包进区块并且有一些方法选择哪个参与者提交了区块。例如，在一个工作量证明的链中，首先找到合法的工作量证明的节点有权把区块提交到链中。
Substrate提供一些区块构建算法 并且允许你创建你自己的：

- Aura (轮训)
- BABE (插槽为基础)
- 工作量证明



## 分叉选择规则

作为原始，一个区块包含了区块头和一系列的[外来的东西](../node/extrinsics.md)。区块头必须包含一个指向它父区块的索引，使得能够追溯到链的创始块。当两个区块指向同一个父区块分叉就发生了。分叉必须解决使得只存在唯一正规的链。
一个分叉选择规则是一种选择“最佳”链的算法，并且因此选择的链应该被延伸。Substrate通过[`SelectChain`
特性](https://substrate.dev/rustdocs/master/sp_consensus/trait.SelectChain.html)来展示这个概念。
Substrate允许你写入一个定制的的分叉选择规则，或使用使用开箱即用的。
例如：

### 最长链规则

最长链规则简单定义了最佳链是最长链。Substrate通过[`最长链` 结构](https://substrate.dev/rustdocs/master/sc_client/struct.LongestChain.html)提供了链选择规则。GRANDPA使用最长链规则来投票。
![最长链规则](assets/consensus-longest-chain.png)

### 幽灵规则

贪心的最重观察子树规则意味着，从最新快开始，每个分叉通过递归选择拥有最多区块的的分支的方式被决定。
![幽灵规则](assets/consensus-ghost.png)

## 区块产生

一些区块链网络中的节点能够产生新区块，也就是一个授权的过程。准确说哪个节点能够授权区块取决于你使用了哪个共识引擎。在一个中心化的网络中，一个单一节点能够授权所有的区块，然而在一个完全无权限的网络中，一个算法必须选择每个高度下的区块授权者。

### 工作量证明

在一个工作量证明的系统中例如比特币，任何节点都可能在任何时间产生区块，只要它能解决一个高计算量的问题。解决问题需要CPU时间，并且因此矿工只能通过消耗它们的计算资源成比例的产生区块。Substrate提供了一个工作量证明的区块产生引擎。

### 插槽

以插槽为基础的共识算法必须有一系列的验证者被允许产生区块。时间被分割为离散的插槽，并且在每个插槽时间内只有一些验证者能够产生区块。每个验证者能够在每个插槽时间内授权产生区块的细节根据引擎的不同而不同。Substrate提供Aura和Babe，两者都是插槽为基础的区块授权引擎。


## 终结

用户在任何系统中都想知道他们的交易什么时候结束，并且区块链也是这样。在一些传统的系统中，当一个收据被提交或者文件被签署定局被发生了。

使用区块授权模式以及到此为止描述的分叉选择规则，交易从来不会整体完成。永远会有一个更长的（或权重更重的）链到来并且混滚掉你的交易。然而更多的区块建立在一个特定区块的基础上产生，更少可能性是它从来不会被回滚。这样的话，伴随着合理的分叉选择规则的区块授权提供了概率性的终结。

当一个确定的终结被需要的时候，一个终结小工具能被添加到区块链的逻辑上。
一个固定的授权集合的成员计算最终性投票，当足够的投票被给到一个特定的区块时候，这个区块被认为是完成了。在大多数系统中，这个阙值是2/3。没有外部调整例如硬分叉的话，被这个小工具完成的区块不能回滚。

> 一些共识系统把区块产生和完成耦合起来，就像，完成
> 是区块产生过程的部分并且一个新区块`N+1`不能被授权直到区块`N`完成了。
> 然而Substrate把两个过程分隔开并且允许你使用任何区块产生引擎
> 它本身就具有概率性完成或者把终结小工具和确定的完成耦合起来

在使用终结小工具的系统中，分叉选择规则必须被修改成考虑完成游戏结果。例如，一个节点可能选择有最新的完成区块的最长链而不是最长的链。

## Substrate中的共识

Substrate框架装载有一些共识引擎提供区块授权，或者完成。本文提供了一个简明的包含在Substrate中的产品概要。总是欢迎开发者提供他们自己定制的共识算法。

### Aura

[Aura](https://substrate.dev/rustdocs/master/sc_consensus_aura/index.html)提供了一个插槽为基础的区块授权机制。在Aura中一个已知的授权集合轮流产生区块。

### BABE

[BABE](https://substrate.dev/rustdocs/master/sc_consensus_babe/index.html)也通过已知的验证者集合提供了插槽为基础的区块授权。这些方式和Aura相似。不像Aura，插槽分配建立可验证随机功能的评估上。每一个验证者在一个时间点上分配了一个权重。这个时间点被打碎成插槽并且验证者在每个时间点评估它的VRF。对于每个验证者的VRF输出在它的权重之下的插槽，被允许授权产生一个区块。

因为多个验证者可以在相同的插槽下产生区块，比起Aura来BABE更容易产生分叉，并且甚至在好的网络环境下也很常见。

对于在一个给定的插槽条件下没有权力中心被选择的情况下，Substrate的BABE实现有一个回滚机制。


### 工作量证明

[工作量证明](https://substrate.dev/rustdocs/master/sc_consensus_pow/index.html) 区块授权不是插槽为基础的并且不需要一个已知的授权集合。在工作量证明中，任何人可以在任何时间产生区块，主要他们能解决一个计算挑战问题（典型的为一个哈希前象搜索）。这个问题的难度可以被调整提供一个数据目标块时间。

### GRANDPA

[GRANDPA](https://substrate.dev/rustdocs/master/sc_finality_grandpa/index.html)提供区块完成机制。它有一个已知的权重授权集合例如BABE。However, GRANDPA does not author
blocks; it just listens to gossip about blocks that have been produced by some authoring engine like
the three discussed above. GRANDPA validators vote on _chains,_ not _blocks,_ i.e. they vote on a
block that they consider "best" and their votes are applied transitively to all previous blocks.
Once more than 2/3 of the GRANDPA authorities have voted for a particular block, it is considered
final.

### Coordination with the Runtime

The simplest static consensus algorithms work entirely outside of the runtime as we've described so
far. However many consensus games are made much more powerful by adding features that require
coordination with the runtime. Examples include adjustable difficulty in proof of work, authority
rotation in proof of authority, and stake-based weighting in proof-of-stake networks.

To accommodate these consensus features, Substrate has the concept of a
[`DigestItem`](https://substrate.dev/rustdocs/master/sp_runtime/enum.DigestItem.html), a message
passed from the outer part of the node, where consensus lives, to the runtime, or vice versa.

## Learn More

Because both BABE and GRANDPA will be used in the Polkadot network, Web3 Foundation provides
research-level presentations of the algorithms.

* [BABE Research](https://research.web3.foundation/en/latest/polkadot/BABE/Babe.html)
* [GRANDPA Research](https://research.web3.foundation/en/latest/polkadot/GRANDPA.html)

All deterministic finality algorithms, including GRANDPA, require at least `2f + 1` non-faulty
nodes, where `f` is the number of faulty or malicious nodes. Learn more about where this threshold
comes from and why it is ideal in the seminal paper
[Reaching Agreement in the Presence of Faults](https://lamport.azurewebsites.net/pubs/reaching.pdf)
or on [Wikipedia: Byzantine Fault](https://en.wikipedia.org/wiki/Byzantine_fault).

Not all consensus protocols define a single, canonical chain. Some protocols validate
[directed acyclic graphs](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG) when two
blocks with the same parent do not have conflicting state changes.
