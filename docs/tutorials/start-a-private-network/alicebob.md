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
  --ws-port 9944 \
  --rpc-port 9933 \
  --telemetry-url 'ws://telemetry.polkadot.io:1024 0' \
  --validator
```

让我们详细看看这些命令标签的含义：


| <div style="min-width:110pt"> 命令标签 </div> | 描述                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--base-path`     | 指定 Substrate 存储与该链有关的所有数据的目录。 如果目录不存在，则会创建该目录。 如果其他区块链数据已经存在，将得到一个错误。 请清除目录或选择其他目录。 如果未指定此值，将使用默认路径。 |
| `--chain local`   | 指定要使用的链规范。 有一些预打包的选项，包括`local`, `development`, 和 `staging`，但通常一个选项指定其自己的 chainspec 文件。 我们将在以后的步骤中指定我们自己的文件。|
| `--alice`         | 将预定义的Alice密钥（用于块生产和最终确定性）放入节点的密钥库中。 通常，应该生成自己的密钥，并通过RPC调用将其插入。 我们将在以后的步骤中生成自己的密钥。 此命令标签同时让Alice成为验证者。|
| `--port 30333`    | 指定节点在哪一个端口监听p2p流量。 30333是默认设置，如果您对默认设置满意，可以省略此命令标签。 如果Bob的节点将在同一物理系统上运行，则需要为其明确指定其他端口。  |
| `--ws-port 9944`  | 指定节点用于监听其上传入的Web套接字流量的端口。默认设置是`9944`，因此也可以省略。                                                                                      |
| `--rpc-port 9933` | 指定节点用户监听传入的RPC通信的端口。 默认值为`9933`，因此也可以省略。|
| `--telemetry-url` | 告诉节点将遥测数据发送到特定服务器。 我们在这里选择的服务器由Parity托管，任何人都可以使用。 你也可以托管自己的地址（超出本文的范围）或完全省略此标志。     |
| `--validator`     | 意味着我们要参与区块生产和最终确定性，而不仅仅是同步网络。|

当节点启动时，你应该会看到类似的输出。

```
2020-06-26 11:16:13 Substrate Node
2020-06-26 11:16:13 ✌️  version 2.0.0-rc4-29f29b9-x86_64-linux-gnu
2020-06-26 11:16:13 ❤️  by Substrate DevHub <https://github.com/substrate-developer-hub>, 2017-2020
2020-06-26 11:16:13 📋 Chain specification: Local Testnet
2020-06-26 11:16:13 🏷  Node name: Alice
2020-06-26 11:16:13 👤 Role: AUTHORITY
2020-06-26 11:16:13 💾 Database: RocksDb at /tmp/alice/chains/local_testnet/db
2020-06-26 11:16:13 ⛓  Native runtime: node-template-1 (node-template-1.tx1.au1)
2020-06-26 11:16:13 🔨 Initializing Genesis block/state (state: 0xa244…0444, header-hash: 0x1814…8aac)
2020-06-26 11:16:13 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
2020-06-26 11:16:13 ⏱  Loaded block-time = 6000 milliseconds from genesis on first-launch
2020-06-26 11:16:13 📦 Highest known block at #0
2020-06-26 11:16:13 Using default protocol ID "sup" because none is configured in the chain specs
2020-06-26 11:16:13 🏷  Local node identity is: 12D3KooWQsb4rFifmkZDsTCbjHdZ4GYca1PwDhETKiJnALSSbyEs (legacy representation: QmZoJwxoMLw6mLpYRy6ErXmZdPf62HuLFBFw6yKXwVqaPq)
2020-06-26 11:16:13 〽️ Prometheus server started at 127.0.0.1:9615
2020-06-26 11:16:18 💤 Idle (0 peers), best: #0 (0x1814…8aac), finalized #0 (0x1814…8aac), ⬇ 0 ⬆ 0
2020-06-26 11:16:23 💤 Idle (0 peers), best: #0 (0x1814…8aac), finalized #0 (0x1814…8aac), ⬇ 0 ⬆ 0
...
```

> **注意**
>
> - `🔨 Initializing Genesis block/state (state: 0xa244…0444, header-hash: 0x1814…8aac)` 告诉节点正在使用哪个创世纪块。 启动下一个节点时，请验证这些值是否相等。
> - `🏷  Local node identity is: 12D3KooWQsb4rFifmkZDsTCbjHdZ4GYca1PwDhETKiJnALSSbyEs...` 显示从Alice节点对等ID， 引导启动Bob时需要使用到对等ID。

你会注意到当前尚未生成任何块。 它需要等到另一个节点加入网络时才开始产生。


通过运行以下帮助命令可以获得所有这些标签的更多详细信息


`./target/release/node-template --help`.

## Attach a UI

You can tell a lot about your node by watching the output it produces in your terminal. There is
also a nice graphical user interface known as the Polkadot-JS Apps, or just "Apps" for short.

In your web browser, navigate to
[https://polkadot.js.org/apps/#/settings?rpc=ws://127.0.0.1:9944](https://polkadot.js.org/apps/#/settings?rpc=ws://127.0.0.1:9944).

> Some browsers, notably Firefox, will not connect to a local node from an https website. An easy
> work around is to try another browser, like Chromium. Another option is to
> [host this interface locally](https://github.com/polkadot-js/apps#development).

The link provided above includes the `rpc` URL parameter, which instructs the Apps UI to connect to
the URL that was provided as its value (in this case, your local node). To manually configure Apps
UI to connect to another node:

- Click on the top left network icon

  ![Top Left Network Icon](assets/tutorials/private-network/private-network-top-left-network-icon.png)

- A popup dropdown appears. Choose the last entry, which is a local node using default port 9944

  ![Select Network](assets/tutorials/private-network/private-network-select-network.png)

- To connect to a custom node and port, you just need to specify the endpoint by choosing
  `custom endpoint` and type in your own endpoint. In this way you can use a single instance of Apps
  UI to connect to various nodes.

  ![Custom Endpoint](assets/tutorials/private-network/private-network-custom-endpoint.png)

You should now see something like this.

![No blocks in polkadot-js-apps](assets/tutorials/private-network/private-network-no-blocks.png)

> **Notes**
>
> If you do not want to run your hosted version of Polkadot-JS Apps UI while connecting to Substrate
> node you have deployed remotely, you can configure ssh local port forwarding to forward local
> request to the `ws-port` listened by the remote host. This is beyond the scope of this tutorial
> but is referenced at the bottom.

## Bob Joins

Now that Alice's node is up and running, Bob can join the network by bootstrapping from her node.
His command will look very similar.

```bash
./target/release/node-template purge-chain --base-path /tmp/bob --chain local
```

```bash
./target/release/node-template \
  --base-path /tmp/bob \
  --chain local \
  --bob \
  --port 30334 \
  --ws-port 9945 \
  --rpc-port 9934 \
  --telemetry-url 'ws://telemetry.polkadot.io:1024 0' \
  --validator \
  --bootnodes /ip4/<Alices IP Address>/tcp/<Alices Port>/p2p/<Alices Peer ID>
```

Most of these options are already explained above, but there are a few points worth mentioning.

- Because these two nodes are running on the same physical machine, Bob must specify a different
  `--base-path`, `--port`, `--ws-port`, and `--rpc-port`.
- Bob has added the `--bootnodes` flag and specified a single boot node, namely Alice's. He must
  correctly specify these three pieces of information which Alice can supply for him.
  - Alice's IP Address, probably `127.0.0.1`
  - Alice's Port, probably `30333`
  - Alice's Peer ID, copied from her log output.
    (`12D3KooWQsb4rFifmkZDsTCbjHdZ4GYca1PwDhETKiJnALSSbyEs` in the example output above.)

If all is going well, after a few seconds, the nodes should peer together and start producing
blocks. You should see some lines like the following in the console that started Alice node.

```
...
2020-06-26 11:21:53 💤 Idle (0 peers), best: #0 (0x1814…8aac), finalized #0 (0x1814…8aac), ⬇ 0 ⬆ 0
2020-06-26 11:21:58 💤 Idle (0 peers), best: #0 (0x1814…8aac), finalized #0 (0x1814…8aac), ⬇ 0.3kiB/s ⬆ 0.3kiB/s
2020-06-26 11:22:00 🙌 Starting consensus session on top of parent 0x181414064fbb501d8497a184bbf9b25eb547d7e15159473ffa8d97a3bd418aac
2020-06-26 11:22:00 🎁 Prepared block for proposing at 1 [hash: 0x95f61d28ce82a37dbb93277f4f474d70569dac67f67af893060ff8e74668df96; parent_hash: 0x1814…8aac; extrinsics (1): [0xf690…93c4]]
2020-06-26 11:22:00 🔖 Pre-sealed block for proposal at 1. Hash now 0xd9ce7aecb68c25871ba90a41ea513bb59c0078d2c6da2cd022a04675c8bafb3e, previously 0x95f61d28ce82a37dbb93277f4f474d70569dac67f67af893060ff8e74668df96.
2020-06-26 11:22:00 ✨ Imported #1 (0xd9ce…fb3e)
2020-06-26 11:22:03 💤 Idle (1 peers), best: #1 (0xd9ce…fb3e), finalized #0 (0x1814…8aac), ⬇ 1.2kiB/s ⬆ 1.3kiB/s
2020-06-26 11:22:06 ✨ Imported #2 (0x030f…378b)
2020-06-26 11:22:08 💤 Idle (1 peers), best: #2 (0x030f…378b), finalized #0 (0x1814…8aac), ⬇ 0.8kiB/s ⬆ 0.7kiB/s
2020-06-26 11:22:12 🙌 Starting consensus session on top of parent 0x030feb47935fe8a63af3c68f5feffda40ee0cee70a6351e50a427655139c378b
2020-06-26 11:22:12 🎁 Prepared block for proposing at 3 [hash: 0x826d95cd41722003e60063675fabc82d006ea11b5e27bbeb907b4d53ce517dee; parent_hash: 0x030f…378b; extrinsics (1): [0x3e22…88e0]]
2020-06-26 11:22:12 🔖 Pre-sealed block for proposal at 3. Hash now 0x052c6308075656f42890277a133dfd7ee0a6349705f494d864afe8ffb46149d7, previously 0x826d95cd41722003e60063675fabc82d006ea11b5e27bbeb907b4d53ce517dee.
2020-06-26 11:22:12 ✨ Imported #3 (0x052c…49d7)
2020-06-26 11:22:13 💤 Idle (1 peers), best: #3 (0x052c…49d7), finalized #1 (0xd9ce…fb3e), ⬇ 0.7kiB/s ⬆ 0.8kiB/s
...
```

These lines shows that Bob has peered with Alice (**`1 peers`**), they have produced some blocks
(**`best: #3 (0x052c…49d7)`**), and blocks are being finalized (**`finalized #1 (0xd9ce…fb3e)`**).

Looking at the console that started Bob's node, you should see something similar.

Once you've verified that both nodes are running as expected, you can shut them down. The next
section of this tutorial will include commands to restart the nodes when necessary.

## References

- [Configure ssh local port forwarding](https://www.booleanworld.com/guide-ssh-port-forwarding-tunnelling/)
