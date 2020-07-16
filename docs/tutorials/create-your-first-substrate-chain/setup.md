---
title:  搭建开发环境
---

通常，应该先了解更多有关Substrate区块链开发框架的背景知识，但是，进行Substrate开发的环境搭建需要一段不小的时间。

为了节约你的时间，我们将先帮助你搭建环境。 在下一节中（此时正在编译中），再来了解有关Substrate和我们正在构建内容的更多背景知识。


## 环境依赖

要在Substrate上进行开发，需要先安装一些依赖才能建立好开发环境。

> 环境搭建可能是本教程中最难的部分，请不要因此灰心。
>
> 译者注：我之前有过一篇专门的文章介绍在[国内环境下安装Substrate开发环境]( https://learnblockchain.cn/article/1069)， 可千万查看。

### Substrate 开发

如果你使用的是基于Unix的计算机（如Linux，MacOS），我们创建了一个简单脚本来安装所有这些依赖：

```bash
curl https://getsubstrate.io -sSf | bash -s -- --fast
```

> 如果在运行此脚本之前没有安装Rust，请确保在继续操作之前按脚本输出最后一行给出的命令重启终端。

<details>
<summary>了解脚本做了什么。</summary>

> 你可以通过在浏览器中访问 [https://getsubstrate.io](https://getsubstrate.io)来查看此脚本的源代码。

它会自动安装:

- [CMake](https://cmake.org/install/)
- [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/)
- [OpenSSL](https://www.openssl.org/)
- [Git](https://git-scm.com/downloads)
- [Rust](https://www.rust-lang.org/tools/install)

</details>



如果你使用的是Windows并且没有[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)，
这个过程会比较困难，但是 [这里](../../knowledgebase/getting-started/windows-users)有充分的说明文档。



## 编译 Substrate

安装好必备组件后，就可以为我们的项目搭建框架了。 Substrate节点模板(Substrate Node Template)是在Substrate上开发的良好起点。

1. 克隆 Substrate Node Template (版本 `v2.0.0-rc4`).

   ```bash
   	git clone -b v2.0.0-rc4 --depth 1 https://github.com/substrate-developer-hub/substrate-node-template
   ```

2. 初始化你的WebAssembly构建环境

   ```bash
   # Load settings into the current shell script if you can't use rustup command
   # If you've run this before, you don't need to run it again. But doing so is harmless.
   source ~/.cargo/env
   
   # Update Rust
   rustup update nightly
   rustup update stable
   
   # Add Wasm target
   rustup target add wasm32-unknown-unknown --toolchain nightly
   ```

3. 为你的工作创建一个分支并编译Substrate节点程序

   ```bash
   cd substrate-node-template/
   git checkout -b my-first-substrate-chain
   cargo build --release
   ```

根据你的电脑硬件性能，最终编译可能最多需要25分钟。 因此，不要等待，直接进入下一步。


## 前端依赖


为了与你的节点进行交互，需要运行[Substrate Developer Hub 前端模板](https://github.com/substrate-developer-hub/substrate-front-end-template)的本地实例，需要在计算机上安装好[Node.js](https://nodejs.org/)。 

可以使用节点编译的时间安装这些依赖项。 

