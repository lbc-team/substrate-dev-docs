---
title: 环境安装
---

## 快速安装

使用单个命令安装所有的依赖（需要一点耐心，这需要大概 30 分钟）

```bash
curl https://getsubstrate.io -sSf | bash -s -- --fast
```

## 手动安装

### Debian

运行：

```bash
sudo apt install -y cmake pkg-config libssl-dev git gcc build-essential clang libclang-dev
```

### MacOS

先安装 [Homebrew 包管理器](https://brew.sh/)，然后运行:

```bash
brew install openssl cmake llvm
```

## Rust 开发环境

Substrate 使用 rust 编程语言开发。你应该使用 `rustup` 来[安装Rust](https://www.rust-lang.org/tools/install) ：


```
curl https://sh.rustup.rs -sSf | sh
```

然后确保默认使用的是 rust 最新的稳定版本，使用下面的命令：


```
rustup default stable
```

### Wasm 编译

Substrate 使用 WebAssembly(Wasm)，你需要配置 rust 编译器使用 `nightly` 来支持这个编译Wasm目标。

使用下面的命令：

```bash
rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```

### Rustup 更新

Substrate 总是使用 rust 最新的稳定版（stable）以及 nightly 版编译。为了确保你的 rust 编译器总是最新的，你应该运行下面的命令：



```
rustup update
```

这甚至可能解决你在使用 Substrate 时遇到的一些编译问题。
