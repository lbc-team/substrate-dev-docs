---
title: Alice 和 Bob 启动区块链网络
---

在我们生成自己的密钥并启动一个真正独特的Substrate网络之前，让我们从一个名为 `local` 的预定义网络规范开始，学习带有两个称为Alice和Bob的预定义（绝对不是私有！）密钥的基础知识。 。

> 本教程的这一部分应在使用Substrate二进制文件在单个工作站上运行。
> 如果你已经按照前面的教程进行了操作，则说明设置正确。

## Alice 先开始

Alice （或扮演她的人）应该从节点模板代码库根目录运行这些命令。

> 在这里，我们明确使用了 `purge-chain` 命令。 将来，我们将忽略此操作。无论何时尝试启动新网络，都应清除旧的链数据。

```bash
# 按提示输入  `y` 清楚先前的旧链数据

./target/release/node-template purge-chain --base-path /tmp/alice --chain local
```

```bash
# 启动 Alice 的节点
./target/release/node-template \
  --base-path /tmp/alice \
  --chain local \
  --alice \
  --port 30333 \
  --ws-port 9945 \
  --rpc-port 9933 \
  --node-key 0000000000000000000000000000000000000000000000000000000000000001 \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --validator
```

让我们详细看看这些命令标签的含义：


| <div style="min-width:110pt"> 命令标签 </div> | 描述                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--base-path`     | 指定 Substrate 存储与该链有关的所有数据的目录。 如果目录不存在，则会创建该目录。 如果其他区块链数据已经存在，将得到一个错误。 请清除目录或选择其他目录。 如果未指定此值，将使用默认路径。 |
| `--chain local`   | 指定要使用的链规范。 有一些预打包的选项，包括`local`, `development`, 和 `staging`，但通常一个选项指定其自己的 chainspec 文件。 我们将在以后的步骤中指定我们自己的文件。|
| `--alice`         | 将预定义的Alice密钥（用于块生产和最终确定性）放入节点的密钥库中。 通常，应该生成自己的密钥，并通过RPC调用将其插入。 我们将在以后的步骤中生成自己的密钥。 此命令标签同时让Alice成为验证者。|
| `--port 30333`    | 指定节点在哪一个端口监听p2p流量。 30333是默认设置，如果您对默认设置满意，可以省略此命令标签。 如果Bob的节点将在同一物理系统上运行，则需要为其明确指定其他端口。  |
| `--ws-port 9945`  | 指定节点用于监听其上传入的Web套接字流量的端口。默认设置是`9944`，因此也可以省略。                                                                                      |
| `--rpc-port 9933` | 指定节点用户监听传入的RPC通信的端口。 默认值为`9933`，因此也可以省略。|
| `--node-key <key>`| The Ed25519 secret key to use for `libp2p` networking. The value is parsed as a hex-encoded Ed25519 32 byte secret key, i.e. 64 hex characters. WARNING: Secrets provided as command-line arguments are easily exposed. Use of this option should be limited to development and testing.                                                   |
| `--telemetry-url` | 告诉节点将遥测数据发送到特定服务器。 我们在这里选择的服务器由Parity托管，任何人都可以使用。 你也可以托管自己的地址（超出本文的范围）或完全省略此标志。     |
| `--validator`     | 意味着我们要参与区块生产和最终确定性，而不仅仅是同步网络。|

当节点启动时，你应该会看到类似的输出。

```
Sep 24 12:53:30.728  INFO Substrate Node
Sep 24 12:53:30.728  INFO ✌️  version 2.0.0-24da767-x86_64-linux-gnu
Sep 24 12:53:30.729  INFO ❤️  by Substrate DevHub <https://github.com/substrate-developer-hub>, 2017-2020
Sep 24 12:53:30.729  INFO 📋 Chain specification: Local Testnet
Sep 24 12:53:30.729  INFO 🏷  Node name: Alice
Sep 24 12:53:30.729  INFO 👤 Role: AUTHORITY
Sep 24 12:53:30.729  INFO 💾 Database: RocksDb at /tmp/alice/chains/local_testnet/db
Sep 24 12:53:30.729  INFO ⛓  Native runtime: node-template-1 (node-template-1.tx1.au1)
Sep 24 12:53:32.312  INFO 🔨 Initializing Genesis block/state (state: 0x0118…493b, header-hash: 0x2533…1d36)
Sep 24 12:53:32.315  INFO 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
Sep 24 12:53:32.474  INFO ⏱  Loaded block-time = 6000 milliseconds from genesis on first-launch
Sep 24 12:53:32.475  WARN Using default protocol ID "sup" because none is configured in the chain specs
Sep 24 12:53:32.475  INFO 🏷  Local node identity is: 12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp (legacy representation: 12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp)
Sep 24 12:53:32.704  INFO 📦 Highest known block at #0
Sep 24 12:53:32.705  INFO 〽️ Prometheus server started at 127.0.0.1:9615
Sep 24 12:53:32.730  INFO Listening for new connections on 127.0.0.1:9945.
Sep 24 12:53:37.733  INFO 💤 Idle (0 peers), best: #0 (0x2533…1d36), finalized #0 (0x2533…1d36), ⬇ 0 ⬆ 0
Sep 24 12:53:42.734  INFO 💤 Idle (0 peers), best: #0 (0x2533…1d36), finalized #0 (0x2533…1d36), ⬇ 0 ⬆ 0
...
```

> **注意**
>
> - `🔨 Initializing Genesis block/state (state: 0xa244…0444, header-hash: 0x1814…8aac)` 告诉节点正在使用哪个创世纪块。 启动下一个节点时，请验证这些值是否相等。
> - `🏷  Local node identity is: 12D3KooWQsb4rFifmkZDsTCbjHdZ4GYca1PwDhETKiJnALSSbyEs...` 显示节点对等ID， 引导启动Bob时需要使用到AliceID。该值由 `--node-key` 决定，用来启动Alice节点时使用。

你会注意到当前尚未生成任何块。 它需要等到另一个节点加入网络时才开始产生。


通过运行以下帮助命令可以获得所有这些标签的更多详细信息


`./target/release/node-template --help`.

## 关联 UI

通过查看终端中产生的输出，你可以了解很多有关节点的信息。 这里还有一个称为Polkadot-JS Apps很好的图形用户界面，简称为“Apps”。

在浏览器打开地址：
[https://polkadot.js.org/apps/#/settings?rpc=ws://127.0.0.1:9945](https://polkadot.js.org/apps/#/settings?rpc=ws://127.0.0.1:9945).

> 某些浏览器（尤其是Firefox）无法从https网站连接到本地节点。 一个简单的解决方法是尝试使用其他浏览器，例如Chromium。 另一个选项是[在本地启动polkadot-js](https://github.com/polkadot-js/apps#development)。

上面提供的链接包含 `rpc` URL参数，该参数用来告诉Apps UI连接到哪一个节点URL（在本例中为本地节点）。 可以手动配置应用UI连接到另一个节点：


- 点解左上角的网络图标

  ![Top Left Network Icon](assets/tutorials/private-network/private-network-top-left-network-icon.png)

- 在弹出的对话框中，扩展“DEVELOPMENT”并确保自定义端点（endpoint）设置为：  `ws://127.0.0.1:9945`.

  ![Select Network](assets/tutorials/private-network/private-network-select-network.png)

- 要连接到自定义节点和端口，你只需选择 `custom endpoint`  并输入自己的节点 URL。 通过这个方式，单个Apps UI 就可以连接到各个不同的节点。如果需要，点击**切换**图标， 切换到新的端点。

  ![Custom Endpoint](assets/tutorials/private-network/private-network-custom-endpoint.png)

现在，你可以从**Network** 和 **Explorer** 看到类似如下的界面

![No blocks in polkadot-js-apps](assets/tutorials/private-network/private-network-no-blocks.png)

> **注意**
> 如果在连接到已远程部署的Substrate节点时不想运行托管版本的Polkadot-JS Apps UI，则可以配置ssh本地端口转发以将本地请求转发到远程主机监听的 `ws-port` 端口。 这超出了本教程的范围，但是可以参考本节最后给出的参考应用。


## Bob 加入

既然Alice的节点已经建立并且正在运行，Bob可以通过从其节点进行引导来加入网络。
他的命令看起来和Alice的非常相似。


```bash
./target/release/node-template purge-chain --base-path /tmp/bob --chain local
```

```bash
./target/release/node-template \
  --base-path /tmp/bob \
  --chain local \
  --bob \
  --port 30334 \
  --ws-port 9946 \
  --rpc-port 9934 \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --validator \
  --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
```

这些选项中的大多数已经在上面进行了解释，但是有几点值得一提。


- Because these two nodes are running on the same physical machine, Bob must specify different
  `--base-path`, `--port`, `--ws-port`, and `--rpc-port` values.
- Bob has added the `--bootnodes` flag and specified a single boot node, namely Alice's. He must
  correctly specify these three pieces of information which Alice can supply for him.
  - Alice's IP Address, probably `127.0.0.1`
  - Alice's Port, she specified `30333`
  - Alice's Peer ID, copied from her log output.

If all is going well, after a few seconds, the nodes should peer together and start producing
blocks. You should see some lines like the following in the console that started Alice node.

```
...
Sep 24 12:55:12.755  INFO 💤 Idle (0 peers), best: #0 (0x2533…1d36), finalized #0 (0x2533…1d36), ⬇ 0 ⬆ 0
Sep 24 12:55:17.755  INFO 💤 Idle (0 peers), best: #0 (0x2533…1d36), finalized #0 (0x2533…1d36), ⬇ 0 ⬆ 0
Sep 24 12:55:21.937  INFO 🔍 Discovered new external address for our node: /ip4/192.168.0.117/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
Sep 24 12:55:21.981  INFO 🔍 Discovered new external address for our node: /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
Sep 24 12:55:22.756  INFO 💤 Idle (1 peers), best: #0 (0x2533…1d36), finalized #0 (0x2533…1d36), ⬇ 1.2kiB/s ⬆ 1.2kiB/s
Sep 24 12:55:24.153  INFO 🙌 Starting consensus session on top of parent 0x2533ac58ba9931d1ed7e1c8779a51d0413c77c4f258691c2819411c457aa1d36
Sep 24 12:55:24.302  INFO 🎁 Prepared block for proposing at 1 [hash: 0x380c14f5773d8eaf326e9a29f73f992bea1d8c1258dd1ac669073c3aac798036; parent_hash: 0x2533…1d36; extrinsics (1): [0x4ade…ab32]]
Sep 24 12:55:24.382  INFO 🔖 Pre-sealed block for proposal at 1. Hash now 0xd7dfb9b8bf8f36d10a22fcdad0b9753a54c38fed326e837e9639d39eb2895e0c, previously 0x380c14f5773d8eaf326e9a29f73f992bea1d8c1258dd1ac669073c3aac798036.
Sep 24 12:55:24.385  INFO ✨ Imported #1 (0xd7df…5e0c)
Sep 24 12:55:27.757  INFO 💤 Idle (1 peers), best: #1 (0xd7df…5e0c), finalized #0 (0x2533…1d36), ⬇ 0.6kiB/s ⬆ 0.7kiB/s
Sep 24 12:55:30.344  INFO ✨ Imported #2 (0xa1cb…562d)
Sep 24 12:55:32.759  INFO 💤 Idle (1 peers), best: #2 (0xa1cb…562d), finalized #0 (0x2533…1d36), ⬇ 0.7kiB/s ⬆ 0.6kiB/s
Sep 24 12:55:36.120  INFO 🙌 Starting consensus session on top of parent 0xa1cb3ff2f34833ab3bbb0791e8ab894b59dae6cbd83e9aceec49d05b3254562d
Sep 24 12:55:36.176  INFO 🎁 Prepared block for proposing at 3 [hash: 0xb1e91198d861dfa7fb71489a89871551bef8b92cf0a5a305315fa3221039abaa; parent_hash: 0xa1cb…562d; extrinsics (1): [0x2ac1…af5e]]
Sep 24 12:55:36.258  INFO 🔖 Pre-sealed block for proposal at 3. Hash now 0x632d162c6765b4ad31d7174a7e959ce108c3a4d9e8e1b2dd8c7b84664eb5a43f, previously 0xb1e91198d861dfa7fb71489a89871551bef8b92cf0a5a305315fa3221039abaa.
Sep 24 12:55:36.260  INFO ✨ Imported #3 (0x632d…a43f)
Sep 24 12:55:37.761  INFO 💤 Idle (1 peers), best: #3 (0x632d…a43f), finalized #1 (0xd7df…5e0c), ⬇ 0.8kiB/s ⬆ 0.9kiB/s
...
```

These lines shows that Bob has peered with Alice (**`1 peers`**), they have produced some blocks
(**`best: #3 (0x632d…a43f)`**), and blocks are being finalized (**`finalized #1 (0xd7df…5e0c)`**).

Looking at the console that started Bob's node, you should see something similar.

Once you've verified that both nodes are running as expected, you can shut them down. The next
section of this tutorial will include commands to restart the nodes when necessary.

## References

- [Configure ssh local port forwarding](https://www.booleanworld.com/guide-ssh-port-forwarding-tunnelling/)
