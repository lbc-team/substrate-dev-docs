---
title: 与节点交互
---

现在，Substrate模板节点应该已完成编译，让我们向你展示一切是如何工作的。



## 启动节点

运行以下命令以启动节点：



```bash
# purge-chain 用来清除之前 dev 模式运行的老数据（如果有）
# 根据提示输入 y 
./target/release/node-template purge-chain --dev

# 在“开发”模式下启动实际的节点
./target/release/node-template --dev
```

如果你的节点运行成功，你应该看到类似以下内容的信息：

```
$ ./target/release/node-template --dev

2020-06-26 10:10:00 Running in --dev mode, RPC CORS has been disabled.
2020-06-26 10:10:00 Substrate Node
2020-06-26 10:10:00 ✌️  version 2.0.0-rc4-a704d36-x86_64-linux-gnu
2020-06-26 10:10:00 ❤️  by Substrate DevHub <https://github.com/substrate-developer-hub>, 2017-2020
2020-06-26 10:10:00 📋 Chain specification: Development
2020-06-26 10:10:00 🏷  Node name: bright-selection-0878
2020-06-26 10:10:00 👤 Role: AUTHORITY
2020-06-26 10:10:00 💾 Database: RocksDb at /home/dan/.local/share/node-template/chains/dev/db
2020-06-26 10:10:00 ⛓  Native runtime: node-template-1 (node-template-1.tx1.au1)
2020-06-26 10:10:00 🔨 Initializing Genesis block/state (state: 0xc478…295b, header-hash: 0x15b6…47b5)
2020-06-26 10:10:00 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
2020-06-26 10:10:00 ⏱  Loaded block-time = 6000 milliseconds from genesis on first-launch
2020-06-26 10:10:00 📦 Highest known block at #0
2020-06-26 10:10:00 Using default protocol ID "sup" because none is configured in the chain specs
2020-06-26 10:10:00 🏷  Local node identity is: 12D3KooWMaPpCv7hp7wArmG6cAuyz8HXqD88zKNvVQ34CoCJsXmX (legacy representation: QmfHEbdmVZHCBwKJFvczRt5owAzEbtF7Ao7oPQLvBq645c)
2020-06-26 10:10:00 〽️ Prometheus server started at 127.0.0.1:9615
2020-06-26 10:10:05 💤 Idle (0 peers), best: #0 (0x15b6…47b5), finalized #0 (0x15b6…47b5), ⬇ 0 ⬆ 0
2020-06-26 10:10:06 🙌 Starting consensus session on top of parent 0x15b647de5cf3ec3b4e15159edf28345346fc29d3c646c509e6b8337b6c9b47b5
2020-06-26 10:10:06 🎁 Prepared block for proposing at 1 [hash: 0xf9b9cd1226bcbce4ef3f8802f9af1746d0243c471600bf2bec38e1c436ac9cd8; parent_hash: 0x15b6…47b5; extrinsics (1): [0xe7b0…f430]]
2020-06-26 10:10:06 🔖 Pre-sealed block for proposal at 1. Hash now 0x9a3af41c7e2d693c24245926d85dac96e09a1bef56d2faf254bc06d6b7d1192f, previously 0xf9b9cd1226bcbce4ef3f8802f9af1746d0243c471600bf2bec38e1c436ac9cd8.
2020-06-26 10:10:06 ✨ Imported #1 (0x9a3a…192f)
2020-06-26 10:10:10 💤 Idle (0 peers), best: #1 (0x9a3a…192f), finalized #0 (0x15b6…47b5), ⬇ 0 ⬆ 0
2020-06-26 10:10:12 🙌 Starting consensus session on top of parent 0x9a3af41c7e2d693c24245926d85dac96e09a1bef56d2faf254bc06d6b7d1192f
2020-06-26 10:10:12 🎁 Prepared block for proposing at 2 [hash: 0xac145cc0decaa0a574fd9e821a4d762e87491cff113659820f51af0f307870df; parent_hash: 0x9a3a…192f; extrinsics (1): [0x297c…9092]]
2020-06-26 10:10:12 🔖 Pre-sealed block for proposal at 2. Hash now 0x618c767c01a4e2fff92c04f8b581da5652595330a479e927bf1ee68c1295d0d7, previously 0xac145cc0decaa0a574fd9e821a4d762e87491cff113659820f51af0f307870df.
2020-06-26 10:10:12 ✨ Imported #2 (0x618c…d0d7)
2020-06-26 10:10:15 💤 Idle (0 peers), best: #2 (0x618c…d0d7), finalized #0 (0x15b6…47b5), ⬇ 0 ⬆ 0
2020-06-26 10:10:18 🙌 Starting consensus session on top of parent 0x618c767c01a4e2fff92c04f8b581da5652595330a479e927bf1ee68c1295d0d7
2020-06-26 10:10:18 🎁 Prepared block for proposing at 3 [hash: 0x5b21914d18523cbba295002b913e352ee7abb4e3cf670c202a701b83aa35b435; parent_hash: 0x618c…d0d7; extrinsics (1): [0x4c52…ea51]]
2020-06-26 10:10:18 🔖 Pre-sealed block for proposal at 3. Hash now 0xf6471c2e33e6d456d1ae2bd3feeb7de813dddecb8927d5b0c753cb38f2225c2d, previously 0x5b21914d18523cbba295002b913e352ee7abb4e3cf670c202a701b83aa35b435.
2020-06-26 10:10:18 ✨ Imported #3 (0xf647…5c2d)
2020-06-26 10:10:20 💤 Idle (0 peers), best: #3 (0xf647…5c2d), finalized #1 (0x9a3a…192f), ⬇ 0 ⬆ 0
```

如果`finalized：`之后的数字在增加，则你的区块链正在产生新的区块并且状态达成了共识！



## 启动前端

为了与本地节点进行交互，我们将使用[Substrate Developer Hub前端模板](https://github.com/substrate-developer-hub/substrate-front-end-template)，这是一套UI组件，这些组件在设计时考虑了常见的交互场景。

要使用前端模板，需要先克隆库代码并[按照指引步骤在本地运行](https://github.com/substrate-developer-hub/substrate-front-end-template#using-the-template)。



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

 是Runtime 的可调用函数；如果你已经熟悉区块链概念，可以将其视作为交易。 Pallet Interactor 允许你提交 [无签名(unsigned)](../../knowledgebase/learn-substrate/extrinsics#unsigned-transactions) 或 [具签名(signed)](../../knowledgebase/learn-substrate/extrinsics#signed-transactions) d的交易并且提供了一个按钮通过[超级权限（sudo）](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_sudo/enum.Call.html#variant.sudo)来触发交易。



你可以选择Query(查询)来读取[Runtime存储中保存的值](../../knowledgebase/runtime/storage)。 RPC和Constant选项则是与Runtime交互提供的其他机制。



像许多区块链一样，Substrate链使用[事件](../../knowledgebase/runtime/events)来报告异步操作的结果。 如果你已经使用前端模板执行转账，则应该在Pallet Interactor旁边的“事件（Event）”组件中可以看到Tranfer事件。



## 接下来

到这里，使用Substrate启动第一个区块链就完成了。



你已经启动了可工作的基于Substrate的区块链，并且用户界面连接到该链了，用户之间进行Token转移。 希望你继续学习Substrate。

下一步，你也许想：

- 启用更多的节点搭建去中心化网络，可参考 [启动一个私有网络](../start-a-private-network/) 教程.
- 添加自定义的功能，可参考 [构建一个 DApp](../build-a-dapp/) 教程.



如果你在本教程中遇到任何问题或想提供反馈，请随时[提交GitHub issue](https://github.com/substrate-developer-hub/tutorials/issues/new)或在 [Riot](https://riot.im/app/#/room/!HzySYSaIhtyWrwiwEV:matrix.org)上联系我们。