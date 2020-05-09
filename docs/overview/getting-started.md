---
id: getting-started
title: 开始入门
---

# 开始入门

这一页有你开始构建 Substrate 的一切信息。

## 寻求帮助

Substrate 是一个崭新的区块链开发框架，结果就是，你可能在使用的过程中会遇到一些突发的更改或者bug。

要知道我们很高心帮助你开始构建 Substrate，若有遇到问题，可通过下面的方式联系我们：

* [在 Github 上开一个issue](https://github.com/substrate-developer-hub/substrate-developer-hub.github.io/issues/new)
* [在 Riot 上和我们交流](https://riot.im/app/#/room/!HzySYSaIhtyWrwiwEV:matrix.org)


## 预备知识
为了在 Substrate 生态中进行开发，你必须设置你的开发环境。根据你操作系统，这些指令可能略有不同。

## 快速安装

### 基于 Unix 的操作系统

Mac OS, Arch 或者基于 Debian 的操作系统，比如 Ubuntu：

```
curl https://getsubstrate.io -sSf | bash -s -- --fast
```

## 手动安装

### Debian

运行：

```
sudo apt install -y cmake pkg-config libssl-dev git gcc build-essential clang libclang-dev
```

### MacOS

先安装 Homebrew 包管理器，然后运行:

```
brew install openssl cmake llvm
```

### Windows

因为 window 的安装指令与标准的类 unix 操作系统大不相同，（所以）我们把这部分的安装指令单独列出来放在了本页的底部。

前往：[在 Window 上开始](https://substrate.dev/docs/en/overview/getting-started#getting-started-on-windows)

## Rust 开发环境

Substrate 使用 rust 编程语言（开发）。你应该使用 `rustup` 来安装 ：

```
curl https://sh.rustup.rs -sSf | sh
```

然后（运行下面的命令）确保你使用的是 rust 最新的稳定版本：

```
rustup default stable
```

### Wasm 编译

Substrate 使用 webassembly(Wasm)，并且你需要配置 rust 编译器使用 nightly 来支持这个编译目标（译注：指Wasm）。

使用下面的命令：

```
rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```

### 更新 rustup

Substrate 总是使用 rust 最新的稳定版以及 nightly 版编译。为了确保你的 rust 编译器总是最新的，你应该运行（下面的命令）：

```
rustup update
```

这甚至可能解决你在使用 Substrate 时遇到的一些编译问题。

## 前端开发环境

Substrate 使用 Yarn 来管理所有的前端开发需求。访问 [Yarn 的安装说明](https://yarnpkg.com/en/docs/install)来设置你的计算机。

确保你（安装了）最新稳定版的 Node.js(`>=10.16.3`) 以及 Yarn(`>=1.19.0`)。

## 获取源码

根据你要构建的内容，这里有一些不同的 Substrate 开发的起始点

> **注意:** 任何命令你都可以添加 `--help` 标签来查看一些额外的帮助信息。

### Substrate
Substrate 的主项目包含了所有为基于 Substrate 的链提供动力的核心库，（包括）一个运行 Substrate 测试网络的预编译节点，一个用于生成密钥的被叫做 Subkey 的工具。

如果你计划给 Substrate 项目做贡献或者如果你想要运行 Substrate 测试网络或 Subkey的话，从这里开始是比较合理的。

使用下面的命令获取项目（源码）：

```
git clone https://github.com/paritytech/substrate
```

使用下面的命令编译项目（源码）：

```
cargo build --release
```

使用下面的命令测试项目：

```
cargo test --all
```

使用下面的命令启动 Substrate 的节点：

```
./target/release/substrate
```

### 在本地安装 Substrate 的节点

你可以在本地安装 Substrate 节点的二进制程序，以便简单的运行一个节点。

在 Substrate 项目的目录下，运行下面的命令：

```
cargo install --force --path ./bin/node/cli/
```

然后你就可以运行（刚才）生成的这个二进制程序了：

```
substrate
```

### 在本地安装 Subkey

你可以在本地安装 Subkey 二进制程序，以便简单的使用这个工具。

在 Substrate 项目的目录下，运行下面的命令：

```
cargo install --force --path ./bin/utils/subkey subkey
```

然后你就可以运行（刚才）生成的这个二进制程序了：

```
subkey
```

## 与 Substrate 的交互

与任何本地或公共的 Substrate 网络进行交互的最快的方式就是访问 Polkadot-JS Apps:

https://polkadot.js.org/apps/

你可以在（下面链接中）找到 Polkadot-JS 生态的相关文档：

https://polkadot.js.org/

## Substrate 节点模板

我们提供了一个最小可用的 Substrate 节点，旨在用于新的 Substrate 区块链开发。

获取这个项目：

```
https://github.com/substrate-developer-hub/substrate-node-template
```

使用下面的命令编译这个项目：

```
cargo build --release
```

使用下面的命令清除所有存在的开发者节点状态：

```
# 系统会提示你按 `y` 来确定要删除数据库
./target/release/node-template purge-chain --dev
```

使用下面的命令启动一个开发者节点：

```
./target/release/node-template --dev
```

## Substrate 前端模板

我们使用 RectJs 以及 Polkadot-JS API 提供了一个最小可用的 Substrate 前端。此项目旨在简单，快速的开发一个自定义的用户页面。

获取这个项目：

```
https://github.com/substrate-developer-hub/substrate-front-end-template
```

使用下面的命令安装节点依赖：

```
yarn install
```

使用下面的命令运行这个前端：

```
yarn start
```

在 `localhost:8000` 中连接前端。

>**注意:** 你需要本地运行一个 Substrate 节点来与这个UI交互。

## 在 window 上开始

若你尝试在 window 计算机上构建 Substrate，按下面的步骤：
1. 下载并安装 "Build Tools for Visual Studio":

    * 从这个链接获取它: https://aka.ms/buildtools
    * 运行安装文件：vs_buildtools.exe
    * 当安装 Visual C++ Build Tools 的时候，确保 “Window 10 SDK” 组件被选中
    * 重启你的计算机

2. 安装 Rust：

    * 详细的指令在 [Rust书](https://doc.rust-lang.org/book/ch01-01-installation.html#installing-rustup-on-windows)中有提供。
        * 下载：https://www.rust-lang.org/tools/install
        * 运行安装文件：rustup-init.exe.

            > **注意:** 因为你在第一步中已经安装了 vs_buildtools，所以它**不**应该提示你去安装 vs_buildtools。

        * 选择 “默认安装”
        * 首先，你需要在 PATH 环境变量中添加 cargo 的 bin 目录（%USERPROFILE%\.cargo\bin）。未来应用程序将会自动设置环境变量，但你可能需要重启你当前的shell。

3. 在命令提示窗中运行下面的命令来设置你的 wasm 编译环境：

    ```
    rustup update nightly
    rustup update stable
    rustup target add wasm32-unknown-unknown --toolchain nightly
    ```

4. 安装 wasm-gc，它可用于减少 wasm 文件的大小：

```
cargo install --git https://github.com/alexcrichton/wasm-gc --force
```

5. 安装 LLVM：https://releases.llvm.org/download.html

6. 使用 vcpkg 安装 OpenSSL：

    ```
    mkdir C:\Tools
    cd C:\Tools
    git clone https://github.com/Microsoft/vcpkg.git
    cd vcpkg
    .\bootstrap-vcpkg.bat
    .\vcpkg.exe install openssl:x64-windows-static
    ```

7. 使用 PowerShell 添加 OpenSSL 到你的系统环境中：

    ```
    $env:OPENSSL_DIR = 'C:\Tools\vcpkg\installed\x64-windows-static'
    $env:OPENSSL_STATIC = 'Yes'
    [System.Environment]::SetEnvironmentVariable('OPENSSL_DIR', $env:OPENSSL_DIR, [System.EnvironmentVariableTarget]::User)
    [System.Environment]::SetEnvironmentVariable('OPENSSL_STATIC', $env:OPENSSL_STATIC, [System.EnvironmentVariableTarget]::User)
    ```

8. 最后，安装 cmake：https://cmake.org/download/

现在你可以跳转到[获取源码](https://substrate.dev/docs/en/overview/getting-started#get-the-source)那节去学习如何下载以及编译 Substrate!
