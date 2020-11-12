---
title: 与节点交互
---

现在，Substrate模板节点应该已完成编译，让我们向你展示一切是如何工作的。

## 启动节点

运行以下命令以启动节点：


```bash
# 在开发模式下运行临时节点
./target/release/node-template --dev --tmp
```

如果你的节点运行成功，你应该看到类似以下内容的信息：

```
Sep 23 15:23:21.759  WARN Running in --dev mode, RPC CORS has been disabled.
Sep 23 15:23:21.759  INFO Substrate Node
Sep 23 15:23:21.759  INFO ✌️  version 2.0.0-24da767-x86_64-linux-gnu
Sep 23 15:23:21.759  INFO ❤️  by Substrate DevHub <https://github.com/substrate-developer-hub>, 2017-2020
Sep 23 15:23:21.759  INFO 📋 Chain specification: Development
Sep 23 15:23:21.759  INFO 🏷  Node name: unbiased-dress-7993
Sep 23 15:23:21.759  INFO 👤 Role: AUTHORITY
Sep 23 15:23:21.759  INFO 💾 Database: RocksDb at /tmp/substrate9CaTUC/chains/dev/db
Sep 23 15:23:21.759  INFO ⛓  Native runtime: node-template-1 (node-template-1.tx1.au1)
Sep 23 15:23:22.549  INFO 🔨 Initializing Genesis block/state (state: 0x0971…6ec2, header-hash: 0x22e7…7290)
Sep 23 15:23:22.552  INFO 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
Sep 23 15:23:22.708  INFO ⏱  Loaded block-time = 6000 milliseconds from genesis on first-launch
Sep 23 15:23:22.709  WARN Using default protocol ID "sup" because none is configured in the chain specs
Sep 23 15:23:22.709  INFO 🏷  Local node identity is: 12D3KooWB4SfTtXEEYbPHEdZPndkq1oTxExwx6ku1esPq3Pq9nwF (legacy representation: 12D3KooWB4SfTtXEEYbPHEdZPndkq1oTxExwx6ku1esPq3Pq9nwF)
Sep 23 15:23:22.935  INFO 📦 Highest known block at #0
Sep 23 15:23:22.937  INFO 〽️ Prometheus server started at 127.0.0.1:9615
Sep 23 15:23:22.940  INFO Listening for new connections on 127.0.0.1:9944.
Sep 23 15:23:24.178  INFO 🙌 Starting consensus session on top of parent 0x22e7a22d9745b5af63c11626498c08726e45b40b95abcd2092117b3337ff7290
Sep 23 15:23:24.281  INFO 🎁 Prepared block for proposing at 1 [hash: 0x515b6280f0d4536ee225a93f4ea56071b86d3bca8020487b2666060b0b739c41; parent_hash: 0x22e7…7290; extrinsics (1): [0x1783…fefe]]
Sep 23 15:23:24.384  INFO 🔖 Pre-sealed block for proposal at 1. Hash now 0x2aa4fb6eeba88eead4f2ea975d6827f3bbf5973e6be01077bd9c920a006d0098, previously 0x515b6280f0d4536ee225a93f4ea56071b86d3bca8020487b2666060b0b739c41.
Sep 23 15:23:24.386  INFO ✨ Imported #1 (0x2aa4…0098)
Sep 23 15:23:27.942  INFO 💤 Idle (0 peers), best: #1 (0x2aa4…0098), finalized #0 (0x22e7…7290), ⬇ 0 ⬆ 0
Sep 23 15:23:30.115  INFO 🙌 Starting consensus session on top of parent 0x2aa4fb6eeba88eead4f2ea975d6827f3bbf5973e6be01077bd9c920a006d0098
Sep 23 15:23:30.122  INFO 🎁 Prepared block for proposing at 2 [hash: 0x1692ea3bed6539b7268b14b35d4be319a32aac79aa709cc71d304722ca7766f4; parent_hash: 0x2aa4…0098; extrinsics (1): [0x0d1a…78da]]
Sep 23 15:23:30.203  INFO 🔖 Pre-sealed block for proposal at 2. Hash now 0x919fab4399075fb75e24005a4a63448e09174199fc073b4f3cd9d72782c46b8c, previously 0x1692ea3bed6539b7268b14b35d4be319a32aac79aa709cc71d304722ca7766f4.
Sep 23 15:23:30.205  INFO ✨ Imported #2 (0x919f…6b8c)
Sep 23 15:23:32.942  INFO 💤 Idle (0 peers), best: #2 (0x919f…6b8c), finalized #0 (0x22e7…7290), ⬇ 0 ⬆ 0
Sep 23 15:23:36.087  INFO 🙌 Starting consensus session on top of parent 0x919fab4399075fb75e24005a4a63448e09174199fc073b4f3cd9d72782c46b8c
Sep 23 15:23:36.094  INFO 🎁 Prepared block for proposing at 3 [hash: 0x0df26c2b2559bfb11c6d1be63005b0f4408468de3dfef7957df86b95cfb68473; parent_hash: 0x919f…6b8c; extrinsics (1): [0x1079…1874]]
Sep 23 15:23:36.178  INFO 🔖 Pre-sealed block for proposal at 3. Hash now 0xb6dca495b5530ca8c97d1d3de8eb71fc945e5b367e219c26164d94e77954b583, previously 0x0df26c2b2559bfb11c6d1be63005b0f4408468de3dfef7957df86b95cfb68473.
Sep 23 15:23:36.180  INFO ✨ Imported #3 (0xb6dc…b583)
Sep 23 15:23:37.942  INFO 💤 Idle (0 peers), best: #3 (0xb6dc…b583), finalized #1 (0x2aa4…0098), ⬇ 0 ⬆ 0
```

如果`finalized：`之后的数字在增加，则你的区块链正在产生新的区块并且状态达成了共识！



## 启动前端

为了与本地节点进行交互，我们将使用[Substrate 开发者前端模板](https://github.com/substrate-developer-hub/substrate-front-end-template)，这是一套UI组件，这些组件在设计时考虑了常见的交互场景。

你已经安装了前端模板； 通过在前端模板的根目录中执行以下命令来启动它：


```bash
# 在Front-End 模板根目录运行
yarn start
```


## 交互

在运行前端模板并将其加载到浏览器中的 [http://localhost:8000/](http://localhost:8000/)后，请花点时间探索下这个前端组件。 在顶部，你将找到许多所连接链的相关信息，以及一个帐户选择列表，在这里可以选择用于执行链上操作的帐户。



![链状态及帐户选择列表](assets/tutorials/first-chain/chain-data.png)

这里也列出了可以使用的[已知的测试账号](../../knowledgebase/integrate/subkey#well-known-keys)，诸如 Alice 和 Bob 账号都是已经带有资金。

![账号列表](assets/tutorials/first-chain/accts-prefunded.png)



账户表下方有一个转账组件，你可以使用该组件将资金从一个账户转移到另一个账户。 记下前端模板描述精度的信息框； 你应该至少转移`1000000000000`以方便观察到余额的变化。

![转账](assets/tutorials/first-chain/apps-transfer.png)

请注意，帐户表是动态的，并且在处理转帐后会立即更新帐户余额。



### Runtime元数据(Metadata)

> 译者注：元数据（Metadata）， 是一种描述数据的数据（data about data）。



前端模板提供了许多有用的功能，在连接到本地开发节点时应该探索下所有这些功能。 一种入门好方法是点击模板页面顶部的“Show Metadata(显示元数据)”按钮并查看[运行时发布的元数据](../../knowledgebase/runtime/metadata)

![元数据 JSON](assets/tutorials/first-chain/metadata.png)

### Pallet Interactor及事件

你可以使用Runtime元数据探索运行时的功能。 前端模板提供了一个有用的Pallet Interactor组件，该组件提供了几种与Substrate Runtime进行交互的机制。



![Pallet Interactor & Events](assets/tutorials/first-chain/interactor-events.png)

 [Extrinsics](../../knowledgebase/learn-substrate/extrinsics) 是Runtime 的可调用函数；如果你已经熟悉区块链概念，可以将其视作为交易。 Pallet Interactor 允许你提交 [无签名(unsigned)](../../knowledgebase/learn-substrate/extrinsics#unsigned-transactions) 或 [具签名(signed)](../../knowledgebase/learn-substrate/extrinsics#signed-transactions) d的交易并且提供了一个按钮通过[超级权限（sudo）](https://substrate.dev/rustdocs/v2.0.0/pallet_sudo/enum.Call.html#variant.sudo)来触发交易。

在第三个教程[添加 Pallet](../add-a-pallet)教程中，你将学习有关使用 "SUDO"按钮调用特权 extrinsics 的更多信息。


你可以选择Query(查询)来读取[Runtime存储中保存的值](../../knowledgebase/runtime/storage)。 RPC和Constant选项则是与Runtime交互提供的其他机制。



像许多区块链一样，Substrate链使用[事件](../../knowledgebase/runtime/events)来报告异步操作的结果。 如果你已经使用前端模板执行转账，则应该在Pallet Interactor旁边的“事件（Event）”组件中可以看到Tranfer事件。



## 接下来

到这里，使用Substrate启动第一个区块链就完成了。



你已经启动了可工作的基于Substrate的区块链，并且用户界面连接到该链了，用户之间进行Token转移。 希望你继续学习Substrate。

下一步，你也许想：

- 通过[添加 Pallet](../add-a-pallet) 教程扩展节点模板的功能特性
- 了解无需分叉的升级，可以参考 [升级链](../upgrade-a-chain) 教程.
- 启用更多的节点搭建去中心化网络，可参考 [启动一个私有网络](../start-a-private-network/) 教程.
- 添加自定义的功能，可参考 [构建一个 DApp](../build-a-dapp/) 教程.



如果你在本教程中遇到任何问题或想提供反馈，请随时可以来[Stack Overflow提问](https://stackoverflow.com/questions/tagged/substrate) 
